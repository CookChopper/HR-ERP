<template>
  <el-row type="flex" justify="space-between" style="width:100%">
    <el-col>{{ treeNode.name }}</el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartment } from '@/api/departments'
export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(type) {
      // alert(type)
      if (type === 'add') {
        // 添加部门
        this.$emit('addDepts', this.treeNode)
      } else if (type === 'edit') {
        // 修改部门
        this.$emit('editDepts', this.treeNode)
      } else {
        // 删除部门
        this.$confirm('确定要删除该组织').then(async() => {
          return await delDepartment(this.treeNode.id)
        }
        ).then(() => {
          this.$emit('delDepts')
          this.$message.success('删除成功')
        }
        )
      }
    }
  }
}
</script>

<style>
  .el-row{
    font-size: 14px!important;

  }
</style>
