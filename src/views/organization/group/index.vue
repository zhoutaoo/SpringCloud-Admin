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
        <el-tree class="filter-tree"
                 node-key="id"
                 highlight-current
                 lazy
                 :load="loadNode"
                 :data="treeData"
                 :props="defaultProps"
                 :filter-node-method="filterNode"
                 @node-click="getNodeData">
        </el-tree>
      </el-col>

      <el-col :span="14" style='margin-top:15px;'>
        <el-card class="box-card">
          <el-form :label-position="labelPosition" label-width="100px" :model="form" ref="form">
            <el-form-item label="节点编号" prop="id">
              <el-input v-model="form.id" :disabled="formRead" placeholder="节点编号"></el-input>
            </el-form-item>
            <el-form-item label="父级节点" prop="parentId">
              <el-input v-model="form.parentId" :disabled="formRead" placeholder="请选择父级节点"></el-input>
            </el-form-item>
            <el-form-item label="组名称" prop="name">
              <el-input v-model="form.name" :disabled="formRead" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="description">
              <el-input v-model="form.description" :disabled="formRead"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="description">
              <el-input v-model="form.createdTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="创建人" prop="description">
              <el-input v-model="form.createdBy" disabled></el-input>
            </el-form-item>
            <el-form-item label="修改时间" prop="description">
              <el-input v-model="form.updatedTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="修改人" prop="description">
              <el-input v-model="form.updatedBy" disabled></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="saveGroup">保存</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import { fetchGroupByParentId, getGroup } from '@/api/organization/group'

  export default {
    name: 'groupManagement',
    data() {
      return {
        total: 0,
        listLoading: true,
        // 当前选中的节点id
        currentId: '',
        formEdit: false,
        formRead: !this.formEdit,
        formStatus: '',
        // 树数据
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        labelPosition: 'right',
        form: {
          parentId: undefined,
          id: undefined,
          name: '',
          description: '',
          createdTime: '',
          createdBy: '',
          updatedTime: '',
          updatedBy: ''
        }
      }
    },
    filters: {},
    created() {
      this.fetchGroupByParentId('-1')
    },
    methods: {
      /**
       * 根据父节点id，查询子节点
       * @param parentId 父节点id
       */
      fetchGroupByParentId(parentId) {
        fetchGroupByParentId(parentId).then(response => {
          this.treeData = response.data
        })
      },
      /**
       * 保存组
       */
      saveGroup(){

      },
      handlerAdd() {
        this.formEdit = true
      },
      handlerUpdate() {
        this.formEdit = true
        this.formRead = false
      },
      handlerDelete() {
      },
      onCancel(){
      },
      /**
       * 加载树数据
       * @param node 树节点
       * @param resolve
       *
       */
      loadNode(node, resolve){
        fetchGroupByParentId(node.data.id).then(response => {
          resolve(response.data)
        })
      },
      /**
       * 获取节点数据
       * @param data
       */
      getNodeData(data) {
        if (!this.formEdit) {
          this.formStatus = 'update'
        }
        getGroup(data.id).then(response => {
          this.form = response.data
        })
        this.currentId = data.id
      },
      /**
       * 搜索node节点
       */
      filterNode() {
      }
    }
  }
</script>
