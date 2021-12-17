<template>
  <el-dialog :title="showTitle" :visible="showDialog" @close="cancel">
    <el-form ref="permForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="formData.code" style="width:80%" />
      </el-form-item>
      <el-form-item label="权限描述">
        <el-input v-model="formData.description" style="width:80%" />
      </el-form-item>
      <el-form-item label="权限开关">
        <el-switch v-model="formData.enVisible" active-value="1" inactive-value="0" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addPermission, getPermissionDetail, updatePermission } from '@/api/permission'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '',
        enVisible: '0'
      },
      rules: {
        name: [{ required: true, trigger: 'blur', message: '请填写名称' }],
        code: [{ required: true, trigger: 'blur', message: '请填写标识' }]
      }
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑权限点' : '添加权限点'
    }
  },
  methods: {
    // 提交
    async submit() {
      try {
        await this.$refs.permForm.validate()
        if (this.formData.id) {
          await updatePermission(this.formData)
        } else {
          await addPermission(this.formData)
        }
        this.$message.success('添加成功')
        this.$parent.getPermission()
        this.$emit('update:showDialog', false)
      } catch (error) {
        console.log(error)
      }
    },
    // 取消
    cancel() {
      this.formData = {
        name: '',
        code: '',
        description: '',
        type: '',
        pid: '',
        enVisible: '0'
      }
      this.$refs.permForm.resetFields()
      this.$emit('update:showDialog', false)
    },
    async getPermissionDetail(id) {
      this.formData = await getPermissionDetail(id)
    }
  }
}
</script>

<style>

</style>
