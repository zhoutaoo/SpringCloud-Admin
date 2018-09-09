<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="handlerAdd">添加</el-button>
        <el-button type="primary" icon="edit" @click="handlerUpdate">编辑</el-button>
        <el-button type="primary" icon="delete" @click="handlerDelete">删除</el-button>
      </el-button-group>
    </div>

    <el-row>
      <el-col :span="8" style='margin-top:15px;'>
        <el-tree class="filter-tree" node-key="id" highlight-current default-expand-all
                 :data="treeData"
                 :props="defaultProps"
                 :filter-node-method="filterNode"
                 @node-click="getNodeData">
        </el-tree>
      </el-col>
      <el-col :span="16" style='margin-top:15px;'>
        <el-card class="box-card">
          <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form">
            <el-form-item label="父级节点" prop="parentId">
              <el-input v-model="form.parentId" :disabled="formEdit" placeholder="请输入父级节点"></el-input>
            </el-form-item>
            <el-form-item label="节点编号" prop="parentId" v-if="formEdit">
              <el-input v-model="form.deptId" :disabled="formEdit" placeholder="节点编号"></el-input>
            </el-form-item>
            <el-form-item label="组名称" prop="name">
              <el-input v-model="form.name" :disabled="formEdit"  placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="orderNum">
              <el-input v-model="form.orderNum" :disabled="formEdit" placeholder="请输入排序"></el-input>
            </el-form-item>
            <el-form-item v-if="formStatus == 'update'">
              <el-button type="primary" @click="update">更新</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
            <el-form-item v-if="formStatus == 'create'">
              <el-button type="primary" @click="create">保存</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { getGroup } from '@/api/organization/group'

export default {
  name: 'groupList',
  data() {
    return {
      total: 0,
      listLoading: true,
      currentId: '',
      formEdit: true,
      formStatus: '',
      formAdd: true,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      labelPosition: 'right',
      form: {
        name: undefined,
        orderNum: undefined,
        parentId: undefined,
        deptId: undefined
      }
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
      getGroup('-1').then(response => {
        this.treeData = response.data.data
        this.listLoading = false
      })
    },

    handlerAdd() {

    },
    handlerUpdate() {

    },
    handlerDelete() {

    },
    getNodeData(data) {
      if (!this.formEdit) {
        this.formStatus = 'update'
      }
      getGroup(data.id).then(response => {
        this.form = response.data.data
      })
      this.currentId = data.id
    },
    filterNode() {
    }
  }
}
</script>
