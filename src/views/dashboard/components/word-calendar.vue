<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" style="width:120px" @change="changeDate">
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width:120px;margin-left:10px" @change="changeDate">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>

    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{date,data}">
        <span>{{ data.day | getDay }}</span>
        <span v-if="date.getDay() === 0 || date.getDay() ===6" class="isweek">休</span>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getDay(time) {
      return time.split('-')[2]
    }
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      currentYear: null,
      currentMonth: null,
      currentDate: null,
      yearList: []
    }
  },
  created() {
    this.currentYear = this.startDate.getFullYear()
    this.currentMonth = this.startDate.getMonth() + 1
    this.yearList = Array.from(Array(11), (value, index) => index + this.currentYear - 5)
  },
  methods: {
    changeDate() {
      this.currentDate = `${this.currentYear}-${this.currentMonth}-${this.startDate.getDate()}`
    }
  }
}
</script>

<style>
  .el-calendar__header{
    display: none;
  }
  .el-calendar-table .el-calendar-day{
    height: 40px;
    line-height: 40px;
    text-align: center;
    vertical-align: middle;
    /* border: 0;
     */
    padding: 0;
  }
  .el-calendar-table td{
    border: 0;
  }
  .el-calendar-table tr td:first-child{
    border-left:0
  }
  .el-calendar-table td.is-today{
    color: #fff;
    background: #409EFF;
    border-radius: 50%;
  }
  .el-calendar-table td.is-today:hover{
    color: #409EFF;
  }
  .isweek{
    margin-left:5px;
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    font-size: 14px;
    color: #fff;
    background: #fa7c4d;
  }
  .el-calendar-table thead th{
    font-weight: 500;
  }
  .el-calendar-table thead th:nth-child(n+6){
    color: #fa7c4d;
  }
</style>
