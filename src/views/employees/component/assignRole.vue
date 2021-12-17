<template>
  <el-dialog title="分配角色" :visible="showDialog" @close="cancel">
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in RoleList" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-button type="primary" @click="submit">确认</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      RoleList: [], // 角色列表
      checkList: [] // 选中角色列表
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 99 })
      this.RoleList = rows
    },
    // 获取员工分配的角色
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.checkList = roleIds
    },
    // 提交
    async submit() {
      await assignRoles({ roleIds: this.checkList, id: this.userId })
      this.$message.success('分配角色成功')
      this.$emit('update:showDialog', false)
    },
    // 取消
    cancel() {
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style>

</style>
