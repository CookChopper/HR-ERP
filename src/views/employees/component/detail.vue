<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <el-form ref="userForm" label-width="120px" style="margin:50px 0 0 200px" :model="userInfo" :rules="rules">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="userInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码" prop="password2">
                <el-input v-model="userInfo.password2" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUserDetail">保存</el-button>
                <el-button @click="$router.back()">返回</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <el-row type="flex" justify="end">
              <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
                <router-link :to="`/employees/print/${userId}?type=personal`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- 放置内容 -->
            <component :is="userComponent" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <el-row type="flex" justify="end">
              <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
                <router-link :to="`/employees/print/${userId}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- 放置内容 -->
            <component :is="JobComponent" />

          </el-tab-pane>
          <!-- <el-tab-pane></el-tab-pane> -->
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api/user'
import UserInfo from './userInfo.vue'
import JobInfo from './jobInfo.vue'
export default {
  components: {
    UserInfo, JobInfo
  },
  data() {
    return {
      userId: this.$route.params.id,
      userInfo: {
        username: '',
        password2: ''
      },
      rules: {
        username: [{
          required: true, trigger: 'blur', message: '请填写用户名'
        }],
        password2: [{
          required: true, trigger: 'blur', message: '请填写密码'
        }, {
          min: 6, max: 9, trigger: 'blur', message: '请输入6-9位密码'
        }]
      },
      userComponent: 'user-info',
      JobComponent: 'job-info',
      fullscreenLoading: false
    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId)
    },
    saveUserDetail() {
      this.$refs['userForm'].validate(async valid => {
        if (valid) {
          await saveUserDetailById({ ...this.userInfo, password: this.userInfo.password2 })
          this.$message.success('操作成功')
          this.getUserDetailById()
        }
        return false
      })
    }
  }
}
</script>

<style>

</style>
