<template>
  <el-dialog title="分配角色" :visible="showDialog" @close="cancel">
    <el-tree
      ref="permRef"
      :data="permList"
      :props="defaultProps"
      node-key="id"
      :default-expand-all="true"
      show-checkbox
      :default-checked-keys="selectKey"
      :check-strictly="true"
    />
    <el-row slot="footer" type="flex" justify="center">
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getPermission } from '@/api/permission'
import { getRoleDetail, assignPerm } from '@/api/setting'
import { arrayToTree } from '@/utils/validate'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      permList: [],
      defaultProps: {
        label: 'name'
      },
      selectKey: [],
      userId: null
    }
  },
  created() {
    this.getPermission()
  },
  methods: {
    async getPermission() {
      this.permList = arrayToTree(await getPermission(), '0')
    },
    async getRoleDetail(id) {
      const { permIds } = await getRoleDetail(id)
      this.userId = id
      this.selectKey = permIds
    },
    async submit() {
      const data = [...this.$refs.permRef.getHalfCheckedKeys(), ...this.$refs.permRef.getCheckedKeys()]
      await assignPerm({ id: this.userId, permIds: data })
      this.$message.success('分配成功')
      this.$emit('update:showDialog', false)
    },
    cancel() {
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style>

</style>
