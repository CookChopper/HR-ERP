<template>
  <el-dialog :visible="showDialog" title="添加员工" @close="btnCancel">
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
          <el-option v-for="item in EmployeeEnum.hireType" :key="item.id" :value="item.id" :label="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-cascader
          v-model="formData.departmentName"
          :options="depts"
          :props="defaultProps"
          :clearable="true"
          placeholder="请选择"
          style="width:50%"
          @visible-change="handleChange"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>

    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-button @click="btnCancel">取消</el-button>
      <el-button type="primary" @click="btnOK">确定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import EmployeeEnum from '@/api/constant/employees'
import { getDepartment } from '@/api/departments'
import { addUser } from '@/api/employees'
import { arrayToTree } from '@/utils/validate'
export default {
  name: 'AddEmployees',
  props: {
    showDialog: {
      type: Boolean,
      defualt: false
    }
  },
  data() {
    return {
      EmployeeEnum,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      depts: null,
      defaultProps: {
        value: 'name',
        label: 'name',
        checkStrictly: true,
        // checkStrictly: true
        emitPath: false
      }
    }
  },
  methods: {
    async handleChange(type) {
      // console.log(type)
      if (type) {
        const { depts } = await getDepartment()
        // console.log(depts)
        this.depts = arrayToTree(depts, '')
      }
      // console.log(arguments)
    },
    async btnOK() {
      try {
        await this.$refs.formRef.validate()
        await addUser(this.formData)
        this.$emit('update:showDialog', false)
        this.$parent.getUserList()
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.formRef.resetFields()
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style>

</style>
