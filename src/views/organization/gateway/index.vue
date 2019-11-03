<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                v-model="listQuery.code" placeholder="路由id">
      </el-input>

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>

      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                 @click="handleCreate">
        新增
      </el-button>
      <el-button v-waves class="filter-item" type="primary" :loading="downloadLoading" icon="el-icon-refresh"
                 @click="refreshGateway">
        刷新路由
      </el-button>
    </div>

    <el-table v-loading.body="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50" align="center" label="序列"></el-table-column>
      <el-table-column width="180px" align="left" label="路由id">
        <template slot-scope="scope">
          <span>{{ scope.row.routeId }}</span>
        </template>
      </el-table-column>

      <el-table-column width="250px" align="left" label="uri路径">
        <template slot-scope="scope">
          <span>{{ scope.row.uri }}</span>
        </template>
      </el-table-column>

      <el-table-column width="220px" align="left" label="predicates">
        <template slot-scope="scope">
          <span>
            <li v-for="(predicates, index) in scope.row.predicates" :key="index">
              {{ predicates.name }}
              <ul>
                <li v-for="(args, index) in predicates.args" :key="index">
                  {{ args }}
                </li>
              </ul>
            </li>
          </span>
        </template>
      </el-table-column>

      <el-table-column width="130px" align="left" label="filters">
        <template slot-scope="scope">
          <span>
            <li v-for="(filters,index) in scope.row.filters" :key="index">
              {{ filters.name }}
              <ul>
                <li v-for="(args,index) in filters.args" :key="index">
                  {{ args }}
                </li>
              </ul>
            </li>
          </span>
        </template>
      </el-table-column>

      <el-table-column width="50" align="center" label="排序">
        <template slot-scope="scope">
          <span>{{ scope.row.orders }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column width="50" align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160px" align="center" label="修改时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updatedTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="85" align="center" label="修改人">
        <template slot-scope="scope">
          <span>{{ scope.row.updatedBy }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="85" align="center" label="创建人">
        <template slot-scope="scope">
          <span>{{ scope.row.createdBy }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">
            修改
          </el-button>
          <el-button type="danger" size="mini" @click="deleteRole(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--翻页工具条-->
    <div class="pagination-container">
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="listQuery.current"
                     :page-sizes="[10, 20, 30, 50]"
                     :page-size="listQuery.size"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--添加或编辑对话框-->
    <el-dialog title="新增/修改" :visible.sync="dialogFormVisible" width="65%">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="120px" status-icon
               style="width: 80%; margin-left:30px;">
        <el-form-item label="路由id" prop="routeId">
          <el-input v-model="temp.routeId" placeholder="请输入路由id"></el-input>
        </el-form-item>

        <el-form-item label="uri路径" prop="uri">
          <el-input v-model="temp.uri" placeholder="请输入uri路径,如:lb://或http://"></el-input>
        </el-form-item>
        <!--predicates输入框-->
        <el-form-item v-for="(predicates, index) in temp.predicates" :key="0+index" :label="'predicate' + (index+1)"
                      :rules="{ required: true, message: 'predicates不能为空', trigger: 'blur'}">

          <el-input v-model="predicates.name" :prop="'predicates.' + index + '.name'" style="width: 40%"
                    placeholder="请输入名称，如Path">
          </el-input>
          <el-input v-model="predicates.args.pattern" :prop="'predicates.' + index + '.args.pattern'"
                    style="width: 40%" placeholder="请输入路由表达式">
          </el-input>
          <el-button type="danger" icon="el-icon-minus" circle size="mini" @click="removePredicate(index)"></el-button>
          <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="addPredicate"></el-button>
        </el-form-item>
        <!--filters-->
        <el-form-item v-for="(filters, index) in temp.filters" :key="1+index" :label="'filter' + (index+1)">
          <el-input v-model="filters.name" :prop="'filters.' + index + '.name'" style="width: 40%"
                    placeholder="请输入名称，如StripPrefix">
          </el-input>
          <el-input v-model="filters.args.parts" :prop="'filters.' + index + '.args.parts'" style="width: 40%"
                    placeholder="请输入路由表达式">
          </el-input>
          <el-button type="danger" icon="el-icon-minus" circle size="mini" @click="removeFilter(index)"></el-button>
          <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="addFilter"></el-button>
        </el-form-item>

        <el-form-item label="排序" prop="order">
          <el-input v-model="temp.orders" type="number" placeholder="请输入优先级"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input v-model="temp.description" type="textarea" :rows="3" placeholder="请输入描述内容"></el-input>
        </el-form-item>
      </el-form>
      <!--对话框动作按钮-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cleanUpTemp">清空</el-button>
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">创建</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import waves from '@/directive/waves'
  import { queryGateway, addGateway, deleteGateway, updateGateway, refreshGateway } from '@/api/organization/gateway'

  export default {
    name: 'Index',
    directives: {
      waves
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          deleted: 'info',
          ok: 'success'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          status: 'ok',
          current: 1,
          size: 10
        },
        dialogStatus: 'create',
        dialogFormVisible: false,
        rules: {
          routeId: [{ required: true, message: '路由id必填', trigger: 'blur' }],
          uri: [{ required: true, message: 'uri路径必填', trigger: 'blur' }]
        },
        temp: {
          routeId: '',
          uri: '',
          orders: '',
          description: '',
          predicates: [{
            name: '',
            args: {
              pattern: ''
            }
          }],
          filters: [{
            name: '',
            args: {
              parts: ''
            }
          }]
        },
        gatewayType: [{
          value: 'Y',
          label: 'Y'
        }, {
          value: 'N',
          label: 'N'
        }],
        defaultGateway: 'Y',
        downloadLoading: false
      }
    },
    created() {
      this.queryGateway()
    },
    methods: {
      removePredicate(index) {
        this.temp.predicates.splice(index, 1)
      },
      addPredicate() {
        this.temp.predicates.push({
          name: '',
          args: {
            pattern: ''
          }
        })
      },
      removeFilter(index) {
        this.temp.filters.splice(index, 1)
      },
      addFilter() {
        this.temp.filters.push({
          name: '',
          args: {
            parts: ''
          }
        })
      },
      /**
       * 查询路由列表
       */
      queryGateway() {
        this.listLoading = true
        queryGateway(this.listQuery).then(res => {
          this.list = res.data
          this.total = res.data.length
          this.listLoading = false
        })
      },

      refreshGateway() {
        refreshGateway().then(() => {
          this.$notify({
            title: '刷新成功',
            message: '刷新成功',
            type: 'success',
            duration: 2000
          })
        })
      },

      handleFilter() {
        this.listQuery.current = 1
        this.queryGateway()
      },
      /**
       * 修改每页显示条数
       */
      handleSizeChange(val) {
        this.listQuery.size = val
        this.queryGateway()
      },
      /**
       * 跳转到指定页
       */
      handleCurrentChange(val) {
        this.listQuery.current = val
        this.queryGateway()
      },

      /**
       * 弹出新增路由对话框
       */
      handleCreate() {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      cleanUpTemp() {
        this.temp.routeId = ''
        this.temp.order = ''
        this.temp.status = ''
        this.temp.description = ''
        this.temp.uri = ''
        for (let i = 0; i < this.temp.predicates.length; i++) {
          this.temp.predicates[i].name = ''
          this.temp.predicates[i].args.pattern = ''
        }
        for (let j = 0; j < this.temp.filters.length; j++) {
          this.temp.filters[j].name = ''
          this.temp.filters[j].args.parts = ''
        }
        this.queryGateway()
      },
      /**
       * 新增路由
       */
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.status = this.defaultGateway
            addGateway(this.temp).then(() => {
              this.dialogFormVisible = false
              this.$notify({
                title: '创建成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.queryGateway()
            })
          }
        })
      },

      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.defaultGateway = this.temp.status
        this.dialogStatus = 'edit'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      /**
       * 更新路由
       */
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            updateGateway(this.temp).then(() => {
              this.dialogFormVisible = false
              this.$notify({
                title: '编辑成功',
                message: '编辑成功',
                type: 'success',
                duration: 2000
              })
              this.queryGateway()
            })
          }
        })
      },
      /**
       * 删除路由
       * @param id
       */
      deleteRole(id) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteGateway(id).then(() => {
            this.$notify({
              title: '删除成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.queryGateway()
          })
        })
      },

      handleDownload() {
        console.log('download')
      }
    }
  }
</script>

<style scoped>

</style>
