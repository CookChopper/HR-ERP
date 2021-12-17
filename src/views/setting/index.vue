<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card style="padding:0 20px;">

        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-row type="flex" justify="end" align="center" style="height:40px">
              <el-col :span="2"><el-button size="small" type="primary" @click="showDialog = true">添加角色</el-button></el-col>
            </el-row>
            <el-table
              :data="list"
              style="width: 100%"
              border
            >
              <el-table-column
                type="index"
                label="序号"
                width="100"
                align="center"
              />
              <el-table-column
                prop="name"
                label="名称"
                width="180"
                align="center"
              />
              <el-table-column
                prop="description"
                label="描述"
                align="center"
              />
              <el-table-column
                label="操作"
                width="250"
                align="center"
              >
                <template slot-scope="{row}">
                  <el-button size="mini" type="success" @click="assignPerm(row.id)">分配权限</el-button>
                  <el-button size="mini" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="delRole(row.id)">删除</el-button>
                </template>

              </el-table-column>
            </el-table>
            <el-row style="height:50px" type="flex" justify="center" align="middle">
              <el-pagination
                :current-page="pageInfo.page"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="pageInfo.pagesize"
                layout="total, sizes, prev, pager, next"
                :total="pageInfo.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
            />
            <el-form label-width="120px" style="margin-top:20px">
              <el-form-item label="企业名称">
                <el-input v-model="companyInfo.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="companyInfo.companyPhone" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyInfo.remarks" type="textarea" disabled style="width:400px" :rows="3" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 添加角色组件 -->
      <el-dialog :visible="showDialog" :title="showTitle" @close="btnCancel">
        <el-form ref="RoleForm" :model="RoleForm" :rules="RoleRules" label-width="120px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="RoleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="RoleForm.description" />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button @click="btnCancel">取消</el-button>
            <el-button type="primary" @click="btnOK">确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>
      <!-- 分配权限组件 -->
      <assign-perm ref="assignPerm" :show-dialog.sync="showPermDialog" />
    </div>
  </div>
</template>

<script>
import { getRoleList, delRoleDetail, getRoleDetail, editRoleDetail, addRoleDetail, getCompanyDetail } from '@/api/setting'
import { mapGetters } from 'vuex'
import AssignPerm from './components/assignPerm.vue'
export default {
  name: 'Setting',
  components: { AssignPerm },
  data() {
    return {
      list: [],
      pageInfo: {
        page: 1,
        pagesize: 2,
        total: 0
      },
      showDialog: false,
      RoleForm: {
        name: '',
        description: ''
      },
      RoleRules: {
        name: [{ required: true, trigger: 'blur', message: '请输入角色名称' }],
        description: [{ required: 'true', trigger: 'blur', message: '请输入角色描述' }]
      },
      companyInfo: {},
      showPermDialog: false
    }
  },
  computed: {
    ...mapGetters(['companyId']),
    showTitle() {
      return this.RoleForm.id ? '编辑角色' : '添加角色'
    }
  },
  created() {
    this.getRoleList()
    this.getCompanyDetail()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageInfo)
      this.list = rows
      this.pageInfo.total = total
    },
    // 添加和编辑角色
    async editRole(id) {
      // 编辑
      this.RoleForm = await getRoleDetail(id)
      this.showDialog = true
    },
    // 删除角色
    async delRole(id) {
      try {
        await this.$confirm('确定删除该角色？')
        await delRoleDetail(id)
        this.$message.success('操作成功')
        this.getRoleList()
      } catch (error) {
        console.log(error)
      }
    },
    // 确认提交
    btnOK() {
      this.$refs.RoleForm.validate(async valid => {
        if (valid) {
          if (this.RoleForm.id) {
            // 编辑
            await editRoleDetail(this.RoleForm)
          } else {
            // 添加
            await addRoleDetail(this.RoleForm)
          }
          this.$message.success('操作成功')
          this.showDialog = false
          this.getRoleList()
        } else {
          return false
        }
      })
    },
    // 取消提交
    btnCancel() {
      this.showDialog = false
      this.RoleForm = {
        name: '',
        description: ''
      }
      this.$refs.RoleForm.resetFields()
      this.$message.info('取消操作')
    },
    // 切换显示条数
    handleSizeChange(newSize) {
      // alert(newSize)
      this.pageInfo.pagesize = newSize
      this.getRoleList(this.pageInfo)
    },
    // 切换页码
    handleCurrentChange(newPage) {
      // alert(newPage)
      this.pageInfo.page = newPage
      this.getRoleList(this.pageInfo)
    },
    // 获取公司信息
    async getCompanyDetail() {
      this.companyInfo = await getCompanyDetail(this.companyId)
    },
    // 分配权限
    async assignPerm(id) {
      await this.$refs.assignPerm.getRoleDetail(id)
      this.showPermDialog = true
    }
  }
}
</script>

<style scoped>

</style>
