<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template slot="after">
          <el-button type="primary" size="small" @click="addPerm(1,'0')">添加权限</el-button>
        </template>
      </page-tools>
      <el-card>
        <el-table :data="powerList" row-key="id" :tree-props="defaultProps">
          <el-table-column label="菜单名称" prop="name" />
          <el-table-column label="权限标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template v-slot="{row}">
              <el-button v-if="row.type === 1" type="text" @click="addPerm(2,row.id)">添加</el-button>
              <el-button type="text" @click="editPerm(row.id)">编辑</el-button>
              <el-button type="text" @click="delPerm(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 添加编辑组件 -->
      <edit-perm ref="editPrem" :show-dialog.sync="showPermDialog" />
    </div>
  </div>
</template>

<script>
import { getPermission, delPermission } from '@/api/permission'
import { arrayToTree } from '@/utils/validate'
import EditPerm from './components/editPerm.vue'
export default {
  name: 'Permission',
  components: { EditPerm },
  data() {
    return {
      powerList: [], // 权限点列表
      defaultProps: {
        children: 'children'
      }, // 树形表格配置对象
      showPermDialog: false // 控制新增编辑弹层
    }
  },
  created() {
    this.getPermission()
  },
  methods: {
    // 获取权限点列表
    async getPermission() {
      this.powerList = arrayToTree(await getPermission(), '0')
    },
    // 删除权限点
    delPerm(id) {
      this.$confirm('确定删除该权限点吗？').then(async() => {
        return await delPermission(id)
      }).then(() => {
        this.$message.success('删除成功')
        this.getPermission()
      }).catch(err => {
        console.log(err)
        this.$message.warning('取消删除')
      })
    },
    // 添加权限点
    addPerm(type, pid) {
      this.$refs.editPrem.formData.type = type
      this.$refs.editPrem.formData.pid = pid
      this.showPermDialog = true
    },
    // 编辑权限点
    async editPerm(id) {
      await this.$refs.editPrem.getPermissionDetail(id)
      this.showPermDialog = true
    }
  }
}
</script>

<style scoped>

</style>
