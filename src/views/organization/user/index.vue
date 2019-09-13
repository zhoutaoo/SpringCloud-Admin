<template>
  <div class="app-container">
    <div class="filter-container">

      <!--查询条件-->
      <el-input @keyup.enter.native="handleFilter"
                style="width: 200px;"
                class="filter-item"
                placeholder="用户名"
                v-model="listQuery.username">
      </el-input>
      <el-input @keyup.enter.native="handleFilter"
                style="width: 200px;"
                class="filter-item"
                placeholder="手机号"
                v-model="listQuery.mobile">
      </el-input>
      <el-select clearable
                 style="width: 90px"
                 class="filter-item"
                 v-model="listQuery.status"
                 placeholder="用户状态">
        <el-option v-for="item in userStatus"
                   :key="item"
                   :label="item"
                   :value="item">
        </el-option>
      </el-select>

      <!--动作按钮-->
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-download" :loading="downloadLoading"
                 @click="handleDownload">
        导出
      </el-button>
    </div>

    <!--列表-->
    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50" align="center" label="ID"/>
      <el-table-column width="180px" align="center" label="用户号">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{scope.row.username}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="用户姓名">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>

      <!--<el-table-column class-name="status-col" label="$t('table.status')" width="80">-->
      <!--<template slot-scope="scope">-->
      <!--<el-tag :type="scope.row.status | statusFilter">{{$t('user.status.'+scope.row.status)}}</el-tag>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column width="160px" align="center" label="修改时间">
        <template slot-scope="scope">
          <span>{{scope.row.updatedTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="修改人">
        <template slot-scope="scope">
          <span>{{scope.row.updatedBy}}</span>
        </template>
      </el-table-column>

      <el-table-column width="160px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{scope.row.createdTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="创建人">
        <template slot-scope="scope">
          <span>{{scope.row.createdBy}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row.id)">
            修改
          </el-button>
          <el-button type="danger" size="mini" @click="deleteData(scope.row.id)">
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
    <el-dialog title="新增/修改" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="right"
               label-width="120px" status-icon
               style='width: 80%; margin-left:60px;'>
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="temp.name" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="temp.mobile" placeholder="请输入用户手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <!--:disabled="dialogStatus=='edit'"-->
          <el-input
            v-model="temp.password" placeholder="请输入用户密码"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-select v-model="temp.roleIds" multiple clearable
                     style="width: 100%;" placeholder="请选择"
                     @visible-change="getRoles">
            <el-option v-for="item in roleList"
                       :key="item.code"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户详情" prop="description">
          <el-input :rows="5"
                    type="textarea"
                    v-model="temp.description"
                    placeholder="请输入用户简介">
          </el-input>
        </el-form-item>
      </el-form>
      <!--对话框动作按钮-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">创建</el-button>
        <el-button v-if="dialogStatus=='edit'" type="primary" @click="updateData">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { queryUser, getUser, createUser, updateUser, deleteUser } from '@/api/organization/user'
  import { getRoles } from '@/api/organization/role'

  import waves from '@/directive/waves'

  export default {
    name: 'userManagement',
    // 水波文效果
    directives: {
      waves
    },
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
        downloadLoading: false,
        // 查询参数
        listQuery: {
          status: 'ok',
          current: 1,
          size: 10
        },
        // 用户状态
        userStatus: ['lock', 'deleted', 'ok'],
        roleList: [],
        dialogStatus: 'create',
        dialogFormVisible: false,
        // 表单校验规则
        rules: {
          username: [
            { required: true, message: '用户名必填', trigger: 'blur' },
            { min: 3, max: 20, message: '用户名长度在3到20个字符', trigger: 'blur' }
          ],
          mobile: [{ required: true, message: '用户手机号不能为空', trigger: 'blur' }],
          password: [
            { required: true, message: '用户密码为必填', trigger: 'blur' },
            { min: 5, max: 20, message: '用户密码长度在5到20个字符', trigger: 'blur' }
          ]
        },
        // 创建或修改用户临时对象
        temp: {}
      }
    },
    filters: {
      // 用户状态标签样式
      statusFilter(status) {
        const statusMap = {
          lock: 'danger',
          deleted: 'info',
          ok: 'success'
        }
        return statusMap[status]
      }
    },
    // 页面加载完成后显示列表页
    created() {
      this.queryUser()
      this.resetForm()
    },
    methods: {
      /**
       * 用户列表
       */
      queryUser() {
        this.listLoading = true
        queryUser(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      /**
       * 角色列表
       */
      getRoles(isShow) {
        if (isShow) {
          getRoles().then(response => {
            this.roleList = response.data
          })
        }
      },
      // 查询过滤器
      handleFilter() {
        this.listQuery.current = 1
        this.queryUser()
      },
      /**
       * 修改每页显示条数
       */
      handleSizeChange(val) {
        this.listQuery.size = val
        this.queryUser()
      },
      /**
       * 跳转到指定页
       */
      handleCurrentChange(val) {
        this.listQuery.current = val
        this.queryUser()
      },
      /**
       * 重置添加表单
       */
      resetForm() {
        this.temp = {
          username: '',
          name: '',
          password: '',
          roleIds: [],
          description: '',
          mobile: ''
        }
      },
      /**
       * 弹出创建用户表单
       */
      handleCreate() {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.resetForm()
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      /**
       * 创建用户
       */
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            createUser(this.temp).then(() => {
              this.dialogFormVisible = false
              this.$notify({
                title: '创建成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.temp.roleIds = []
              this.queryUser()
            })
          }
        })
      },
      /**
       * 弹出修改用户表单
       */
      handleUpdate(id) {
        this.listLoading = true
        getUser(id).then(response => {
          this.temp = response.data
          this.listLoading = false
          this.dialogStatus = 'edit'
          this.dialogFormVisible = true
        })
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      /**
       * 修改用户信息
       */
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            updateUser(this.temp).then(() => {
              this.dialogFormVisible = false
              this.$notify({
                title: '编辑成功',
                message: '编辑成功',
                type: 'success',
                duration: 2000
              })
              this.temp.roleIds = []
              this.queryUser()
            })
          }
        })
      },
      /**
       * 删除用户
       */
      deleteData(id) {
        this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true,
          type: 'warning'
        }).then(() => {
          deleteUser(id).then(() => {
            this.$notify({
              title: '删除成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.queryUser()
          })
        })
      },
      /**
       * 重置用户密码
       */
      resetPass(id) {

      },
      /**
       * 导出列表
       */
      handleDownload() {
        console.log('download')
      }
    }
  }
</script>

