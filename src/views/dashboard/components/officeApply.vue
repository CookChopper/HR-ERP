<template>
  <el-dialog title="加班离职申请" :visible="showDialog" @close="cancel">
    <el-form ref="formRef" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="申请类型">
        <el-select v-model="formData.processKey" @change="changeRules">
          <el-option label="加班" value="process_overtime" />
          <el-option value="process_dimission" label="离职" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="formData.processKey==='process_overtime'" label="加班开始时间" prop="start_time">
        <el-date-picker
          v-model="formData.start_time"
          type="datetime"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item v-if="formData.processKey==='process_overtime'" label="加班结束时间" prop="end_time">
        <el-date-picker
          v-model="formData.end_time"
          type="datetime"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item v-if="formData.processKey==='process_dimission'" label="期望离职时间" prop="exceptTime">
        <el-date-picker
          v-model="formData.exceptTime"
          type="datetime"
          placeholder="选择日期时间"
        />
      </el-form-item>
      <el-form-item v-if="formData.processKey==='process_overtime'" label="补偿方式">调休</el-form-item>
      <el-form-item label="原因" prop="reason">
        <el-input v-model="formData.reason" type="textarea" :rows="3" style="width:300px" />
      </el-form-item>

    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-button @click="submit">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { startProcess } from '@/api/approvals'
import { mapGetters } from 'vuex'
export default {
  props: {
    showDialog: {
      type: Boolean,
      defaul: false
    }
  },
  data() {
    return {
      formData: {
        processKey: 'process_overtime',
        processName: '',
        reason: '',
        start_time: '',
        end_time: '',
        exceptTime: ''
      },
      rules: {
        start_time: [{ required: true, trigger: 'change', message: '请填写时间' }],
        reason: [{ required: true, trigger: 'blur', message: '请填写原因' }],
        end_time: [{ required: true, trigger: 'change', message: '请填写时间' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name', 'userId'
    ])
  },
  methods: {
    async submit() {
      try {
        await this.$refs.formRef.validate()
        if (this.formData.processKey === 'process_overtime') {
          const data = {
            processKey: this.formData.processKey,
            processName: '加班',
            start_time: this.formData.start_time,
            end_time: this.formData.end_time,
            reason: this.formData.reason,
            userId: this.userId,
            username: this.name
          }
          await startProcess(data)
        } else {
          const data = {
            processKey: this.formData.processKey,
            processName: '离职',
            exceptTime: this.formData.exceptTime,
            reason: this.formData.reason,
            userId: this.userId,
            username: this.name
          }
          await startProcess(data)
        }
        this.$message.success('申请成功')
        this.$emit('update:showDialog', false)
      } catch (error) {
        console.log(error)
      }
    },
    cancel() {
      this.formData = {
        processKey: 'process_overtime',
        processName: '',
        reason: '',
        start_time: '',
        end_time: '',
        exceptTime: ''
      }
      this.$refs.formRef.resetFields()
      this.$emit('update:showDialog', false)
    },
    changeRules() {
      if (this.formData.processKey === 'process_overtime') {
        this.rules = {
          start_time: [{ required: true, trigger: 'change', message: '请填写时间' }],
          reason: [{ required: true, trigger: 'blur', message: '请填写原因' }],
          end_time: [{ required: true, trigger: 'change', message: '请填写时间' }]
        }
      } else {
        this.rules = {
          exceptTime: [{ required: true, trigger: 'change', message: '请填写时间' }],
          reason: [{ required: true, trigger: 'blur', message: '请填写原因' }]
        }
      }
    }
  }
}
</script>

<style>

</style>
