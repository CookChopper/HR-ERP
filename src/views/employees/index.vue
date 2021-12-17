<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共{{ pageInfo.total }}条记录</span>
        <template v-slot:after>
          <el-button size="small" type="success" @click="$router.push('/import/?type=employees')">excel导入</el-button>
          <el-button size="small" type="danger" @click="exportTable">excel导出</el-button>
          <el-button v-if="checkPermission('POINT-USER-ADD')" size="small" type="primary" @click="showDialog = true">新增员工</el-button>
          <!-- 手动导出excel表格 -->
          <excel-export ref="excelExport" book-type="xlsx" filename="员工资料表" :sheet="sheet" />
        </template>
      </page-tools>
      <el-card>
        <el-table v-loading="loading" :data="list">
          <el-table-column label="序号" sortable="" type="index" width="50" align="center" />
          <el-table-column label="姓名" prop="username" sortable="" align="center" />
          <el-table-column label="头像" align="center">
            <template v-slot="{row}">
              <img v-imagerror="require('@/assets/common/bigUserHeader.png')" :src="row.staffPhoto" alt="" style="width:100px;height:100px;border-radius:50%;" @click="showQrcode(row.staffPhoto)">
            </template>
          </el-table-column>
          <el-table-column label="工号" prop="workNumber" sortable="" align="center" />
          <el-table-column :formatter="formatterHireType" label="聘用形式" prop="formOfEmployment" sortable="" align="center" />
          <el-table-column label="部门" prop="departmentName" sortable="" align="center" />
          <el-table-column label="入职时间" sortable="" align="center">
            <template slot-scope="{row}">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" prop="enableState" sortable="" align="center">
            <template slot-scope="{row}">
              <el-switch
                :value="row.enableState"
                :active-value="1"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{row}">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="editRole(row.id)">角色</el-button>
              <el-button v-if="checkPermission('point-user-delete')" type="text" size="small" @click="delUser(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center">
          <el-pagination
            :current-page.sync="pageInfo.page"
            :page-size="pageInfo.size"
            layout=" prev, pager, next"
            :total="pageInfo.total"
            @current-change="handleCurrentChange"
          />
        </el-row>
        <!-- 添加员工组件 -->
        <add-employees :show-dialog.sync="showDialog" />
        <!-- 头像生成二维码组件 -->
        <el-dialog title="生成二维码" :visible.sync="showQrcodeDialog">
          <el-row type="flex" justify="center" align="middle">
            <canvas ref="MyCanvas" />
          </el-row>
        </el-dialog>
        <!-- 分配角色组件 -->
        <assign-role ref="assignRole" :show-dialog.sync="showRoleDialog" :user-id="userId" />
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserList, deleteUser } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployees from './component/addEmployees.vue'
import AssignRole from './component/assignRole.vue'
import { ExcelExport } from 'pikaz-excel-js'
import { formatDate } from '@/filters/index'
import qrcode from 'qrcode'
export default {
  name: 'Employees',
  components: {
    AddEmployees, ExcelExport, AssignRole
  },
  data() {
    return {
      pageInfo: {
        page: 1,
        size: 10,
        total: 0
      },
      list: [], // 员工列表数据
      loading: false, // 加载
      length: 0, // 员工列表数据长度
      showDialog: false, // 添加弹出框
      sheet: [], // excel导出表格配置参数
      showQrcodeDialog: false, // 控制二维码弹层
      showRoleDialog: false, // 控制分配角色弹层
      userId: null // 角色ID
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      this.loading = true
      const { rows, total } = await getUserList(this.pageInfo)
      this.length = rows.length
      this.list = rows
      this.pageInfo.total = total
      this.loading = false
    },
    // 枚举聘用形式
    formatterHireType(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    // 切换分野
    handleCurrentChange(newPage) {
      this.pageInfo.page = newPage
      this.getUserList()
    },
    // 删除角色
    async delUser(id) {
      try {
        await this.$confirm('确定删除该员工吗？')
        await deleteUser(id)
        // 解决 删除当前页最后一条数据自动跳转到上一页
        if (this.length === 1) {
          this.pageInfo.page = this.pageInfo.page - 1
        }
        this.getUserList()
      } catch (error) {
        this.$message.info('取消操作！')
        console.log(error)
      }
    },
    // 手动导出excel
    async exportTable() {
      const { rows } = await getUserList({ page: 1, size: this.pageInfo.total })
      // console.log(rows)
      rows.forEach(item => {
        Object.keys(item).forEach(key => {
          // 转化聘用形式
          if (key === 'formOfEmployment') {
            const obj = EmployeeEnum.hireType.find(obj => obj.id === item[key])
            item[key] = obj ? obj.value : '未知'
          } else if (key === 'correctionTime' || key === 'timeOfEntry') {
            // 转化时间
            item[key] = formatDate(item[key])
          }
        })
      })
      this.sheet = [
        {
          multiHeader: [['姓名', '手机号', '入职日期', '转正时间', '聘用形式', '工号', '部门']],
          tHeader: ['姓名', '主要信息', '', '', '', '', '部门'],
          table: rows,
          keys: ['username', 'mobile', 'timeOfEntry', 'correctionTime', 'formOfEmployment', 'workNumber', 'departmentName'],
          sheetName: '员工资料表',
          merges: ['A1:A2', 'B1:F1', 'G1:G2']
        }
      ]
      this.$refs.excelExport.pikaExportExcel()
    },
    // 生成二维码
    showQrcode(url) {
      if (url) {
        this.showQrcodeDialog = true
        this.$nextTick(() => {
          qrcode.toCanvas(this.$refs.MyCanvas, url)
        })
      } else {
        this.$message.warning('请先上传员工头像')
      }
    },
    // 分配角色
    async editRole(id) {
      this.userId = id
      // 获取当前员工的角色
      await this.$refs.assignRole.getUserDetailById(id)
      this.showRoleDialog = true
    }
  }

}
</script>

<style scoped>

</style>
