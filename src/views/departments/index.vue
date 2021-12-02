<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <el-card>
        <tree-tools :tree-node="company" :is-root="true" class="title-tree-tools" @addDepts="addDepartment" />
        <el-tree :data="data" :default-expand-all="true" :props="defaultProps">
          <tree-tools slot-scope="{data}" :tree-node="data" @delDepts="getDepartment" @addDepts="addDepartment" @editDepts="editDepartment" />
        </el-tree>
      </el-card>
      <add-depts ref="deptsRef" :show-dialog.sync="showDialog" :tree-node="treeNode" @addDepts="getDepartment" />
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDepts from './components/add-depts.vue'
import { getDepartment } from '@/api/departments'
import { arrayToTree } from '@/utils/validate'
export default {
  name: 'Departments',
  components: {
    TreeTools, AddDepts
  },
  data() {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人', id: '' },
      data: [],
      defaultProps: {
        label: 'label',
        children: 'children'
      },
      showDialog: false,
      treeNode: null,
      loading: false
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      this.loading = true
      const result = await getDepartment()
      this.data = arrayToTree(result.depts, '')
      this.loading = false
    },
    addDepartment(node) {
      this.showDialog = true
      this.treeNode = node
    },
    editDepartment(node) {
      this.showDialog = true
      this.treeNode = node
      this.$refs.deptsRef.getDepartmentDetail(node.id)
    }
  }
}
</script>

<style scoped>
  .el-card{
    padding: 20px 100px;
  }
  .el-tree{
    width: 100%;
    font-size: 14px;
  }
  .title-tree-tools{
    height: 30px;
    line-height: 30px;
    margin-bottom: 5px;
    border-bottom: #eee 1px solid;
  }
</style>
