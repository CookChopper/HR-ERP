<template>
  <el-dialog title="添加部门" :visible="showDialog" @close="isCancel">
    <el-form ref="formRef" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入部门名称" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="请输入部门编码" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" placeholder="请选择部门负责人" @focus="getUserSimple">
          <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" type="textarea" :rows="2" placeholder="请输入部门介绍" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-button size="small" @click="isCancel">取消</el-button>
      <el-button type="primary" size="small" @click="isOk">确定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getUserSimple } from '@/api/employees'
import { getDepartment, addDepartment, getDepartmentDetail, editDepartmentDetail } from '@/api/departments'
export default {

  name: 'AddDepts',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    var checkNameRepeat = async(rules, value, callback) => {
      let isRepeat = false
      const { depts } = await getDepartment()
      if (this.formData.id) {
        // 编辑
        isRepeat = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.formData.id).some(item => item.name === value)
      } else {
        // console.log(depts.filter(item => item.pid === this.treeNode.id))
        // 添加
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }
      // console.log(isRepeat)
      isRepeat ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
    }
    var checkCodeRepeat = async(rules, value, callback) => {
      let isRepeat = false
      const { depts } = await getDepartment()
      // console.log(depts)
      if (this.formData.id) {
        isRepeat = depts.some(item => item.id !== this.treeNode.id && item.code === value && value)
      } else {
        isRepeat = depts.some(item => item.code === value && value)
      }
      isRepeat ? callback(new Error(`组织架构已经有${value}的编码`)) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      managerList: null,
      rules: {
        name: [
          { required: true, trigger: 'blur', message: '部门名称不能为空' },
          { min: 1, max: 50, trigger: 'blur', message: '请输入1-50位字符' },
          { validator: checkNameRepeat, trigger: 'blur' }
        ],
        code: [
          { required: true, trigger: 'blur', message: '部门编码不能为空' },
          { min: 1, max: 50, trigger: 'blur', message: '请输入1-50位字符' },
          { validator: checkCodeRepeat, trigger: 'blur' }
        ],
        manager: [
          { required: true, trigger: 'blur', message: '部门负责人不能为空' }
          // { min: 1, max: 50, trigger: 'blur', message: '请输入1-50位字符' }
        ],
        introduce: [
          { required: true, trigger: 'blur', message: '部门介绍不能为空' },
          { min: 1, max: 300, trigger: 'blur', message: '请输入1-300位字符' }
        ]
      }
    }
  },
  methods: {
    async getUserSimple() {
      const result = await getUserSimple()
      this.managerList = result
      // console.log(result)
    },
    async getDepartmentDetail(id) {
      this.formData = await getDepartmentDetail(id)
    },
    isOk() {
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          if (this.formData.id) {
            // 修改模式
            await editDepartmentDetail(this.formData)
          } else {
            // 添加模式
            await addDepartment({ ...this.formData, pid: this.treeNode.id })
          }
          this.$emit('addDepts')
          this.$emit('update:showDialog', false)
        } else {
          return false
        }
      })
    },
    isCancel() {
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$refs.formRef.resetFields()
      this.$emit('update:showDialog', false)
    }
  }

}
</script>

<style>

</style>
