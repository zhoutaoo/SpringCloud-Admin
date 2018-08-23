<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                :placeholder="$t('role.code')" v-model="listQuery.code">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                :placeholder="$t('role.name')" v-model="listQuery.name">
      </el-input>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.status" :placeholder="$t('table.status')">
        <el-option v-for="item in roleStatus" :key="item" :label="$t('role.status.'+item)" :value="item"></el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        {{$t('table.search')}}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary"
                 icon="el-icon-edit">
        {{$t('search.add')}}
      </el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download"
                 @click="handleDownload">
        {{$t('search.export')}}
      </el-button>
    </div>

    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="80" align="center" :label="$t('role.code')">
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" :label="$t('role.name')">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('role.description')">
        <template slot-scope="scope">
          <span>{{scope.row.description}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" :label="$t('table.status')" width="80">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{$t('role.status.'+scope.row.status)}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="160px" align="center" :label="$t('table.updatedTime')">
        <template slot-scope="scope">
          <span>{{scope.row.updatedTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="90" align="center" :label="$t('table.updatedBy')">
        <template slot-scope="scope">
          <span>{{scope.row.updatedBy}}</span>
        </template>
      </el-table-column>

      <el-table-column width="160px" align="center" :label="$t('table.createdTime')">
        <template slot-scope="scope">
          <span>{{scope.row.createdTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="90" align="center" :label="$t('table.createdBy')">
        <template slot-scope="scope">
          <span>{{scope.row.createdBy}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.action')" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">
            {{$t('table.edit')}}
          </el-button>
          <el-button type="danger"  size="mini" @click="deleteRole(scope.row.id)">
            {{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--翻页工具条-->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--添加或编辑对话框-->
    <el-dialog :title="$t('table.' + dialogStatus)" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 80%; margin-left:30px;'>
        <el-form-item :label="$t('role.code')" prop="code">
          <el-input v-model="temp.code" placeholder="Please input a code"></el-input>
        </el-form-item>
        <el-form-item :label="$t('role.name')" prop="name">
          <el-input v-model="temp.name" placeholder="Please input name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('role.description')" prop="description">
          <el-input v-model="temp.description" type="textarea" :rows="2" placeholder="请输入描述内容"></el-input>
        </el-form-item>
      </el-form>
      <!--对话框动作按钮-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getList, createRole, updateRole, deleteRole } from '@/api/organization/role'
  import waves from '@/directive/waves' // 水波纹指令

  export default {
    name: 'roleManagement',
    directives: {
      waves
    },
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          status: 'ok',
          page: 1,
          limit: 10
        },
        roleStatus: ['deleted', 'ok'],
        dialogStatus: 'create',
        dialogFormVisible: false,
        rules: {
          code: [{ required: true, message: 'code is required', trigger: 'blur' }],
          name: [{ required: true, message: 'name is required', trigger: 'blur' }],
          description: [{ required: false, message: 'description', trigger: 'blur' }]
        },
        temp: {
          code: '',
          name: '',
          description: ''
        },
        downloadLoading: false
      }
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
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },

      handleCreate() {
        this.temp = {}
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            createRole(this.temp).then(() => {
              this.dialogFormVisible = false
              this.$notify({
                title: '创建成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          }
        })
      },

      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = 'edit'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            updateRole(this.temp).then(() => {
              this.dialogFormVisible = false
              this.$notify({
                title: '编辑成功',
                message: '编辑成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          }
        })
      },
      deleteRole(id) {
        deleteRole(id).then(() => {
          this.$notify({
            title: '删除成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      },

      handleDownload() {
        console.log('download')
      }
    }
  }
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }

  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
