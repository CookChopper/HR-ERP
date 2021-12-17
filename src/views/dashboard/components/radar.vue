<template>
  <div ref="MyRadar" class="myRadar" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  // 页面渲染完毕执行
  mounted() {
    const radar = echarts.init(this.$refs.MyRadar)
    radar.setOption({
      title: {
        text: 'Basic Radar Chart'
      },
      tooltip: {
        trigger: 'item',
        axisPointer: {
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['张三', '李四']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '考勤', max: 100 },
          { name: '效率', max: 100 },
          { name: '学习', max: 100 },
          { name: '积极性', max: 100 },
          { name: '团队意识', max: 100 }
        ]
      },
      series: [
        {
          name: '雷达图',
          type: 'radar',
          data: [
            {
              value: [80, 90, 90, 90, 90],
              name: '张三'
            },
            {
              value: [90, 80, 70, 50, 100],
              name: '李四'
            }
          ]
        }
      ]
    })
  }
}
</script>

<style scoped>
  .myRadar{
    width: 500px;
    height: 500px;
  }
</style>
