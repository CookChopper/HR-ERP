<template>
  <div class="import">
    <upload-excel :on-success="onSuccess" />
  </div>
</template>

<script>

import { importEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
export default {
  data() {
    return {
      type: this.$route.query.type
    }
  },
  methods: {
    async onSuccess({ header, results }) {
      // 员工导入
      if (this.type === 'employees') {
        const userRelations = {
          '手机号': 'mobile',
          '姓名': 'username',
          '入职日期': 'timeOfEntry',
          '转正日期': 'correctionTime',
          '工号': 'workNumber',
          '部门': 'departmentName',
          '聘用形式': 'formOfEmployment'
        }
        var arr = []
        results.forEach(item => {
          const userInfo = {}
          Object.keys(item).forEach(key => {
            if (userRelations[key] === 'correctionTime' || userRelations[key] === 'timeOfEntry') {
              userInfo[userRelations[key]] = new Date(formatDate(item[key], '/'))
              return
            } else if (userRelations[key] === 'formOfEmployment') {
              const obj = EmployeeEnum.hireType.find(obj => obj.value === item[key])
              userInfo[userRelations[key]] = obj ? obj.id : ''
              return
            }
            userInfo[userRelations[key]] = item[key]
          })
          arr.push(userInfo)
        })
        await importEmployee(arr)
        this.$message.success('添加成功')
      }
      this.$router.back()
    }

  }
}
function formatDate(numb, format) {
  const old = numb - 1
  const t = Math.round((old - Math.floor(old)) * 24 * 60 * 60)
  const time = new Date(1900, 0, old, 0, 0, t)
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const date = time.getDate()
  return year + format + (month < 10 ? '0' + month : month) + format + (date < 10 ? '0' + date : date)
}
</script>

<style>
  .import{
    /* padding: 50px; */
    position: absolute;
    left: 50%;
    /* top: 20%; */
    transform: translate(-50%,100%);
    width: 802px;
  }
</style>
