<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                :placeholder="$t('role.code')" v-model="listQuery.code">
      </el-input>

      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                :placeholder="$t('role.name')" v-model="listQuery.name">
      </el-input>

      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.status"
                 :placeholder="$t('table.status')">
        <el-option v-for="item in roleStatus" :key="item" :label="$t('role.status.'+item)" :value="item">
        </el-option>
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

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <router-link :to="'/role/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">Edit</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { getList } from '@/api/organization/role'

  export default {
    name: 'roleList',
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
        roleStatus: ['deleted', 'ok']
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
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
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
