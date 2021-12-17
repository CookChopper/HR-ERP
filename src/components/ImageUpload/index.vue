<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :limit="1"
      :class="{diabled:showFileUpload}"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showProgress" :percentage="percent" style="width:200px" />
    <el-dialog :visible.sync="dialogVisible" title="放大图片">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDWsynMegRw97oqb6KHyPaU7TZOwDEyRdY',
  SecretKey: 'h6E5g03oJXUAZibDZeSzFFyQaT6SXLtA'
})
export default {
  props: {
    handleRemove: {
      type: Function,
      required: true
    },
    onSuccess: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false, // 放大图片弹出框
      dialogImageUrl: '', // 放大图片地址
      fileList: [], // 图片数据
      currentFileId: '', // 当前上传图片的id
      percent: 0, // 上传进度
      showProgress: false, // 控制上传进度条显示
      uploadStatus: true
    }
  },
  computed: {
    showFileUpload() {
      return this.fileList.length === 1
    }
  },
  methods: {
    // 放大图片
    handlePictureCardPreview(file) {
      this.dialogVisible = true
      // console.log(file)
      this.dialogImageUrl = file.url
    },
    // 删除图片

    // 文件状态改变时触发的钩子函数
    onChange(file, fileList) {
      // 此步必须配合http-request或默认上传行为 否则会执行两次
      this.fileList = fileList.map(item => item)
    },
    // 上传文件之前的钩子函数
    beforeUpload(file) {
      this.uploadStatus = false
      // 支持上传的图片类型
      const typeList = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']
      // 上传图片大小的最大值
      const maxSize = 5 * 1024 * 1024
      if (!typeList.includes(file.type)) {
        this.$message.error('请上传JPEG、GIF、PNG、JPG图片格式')
        return false
      }
      if (file.size > maxSize) {
        this.$message.error('请不要上传超过5MB的图片')
        return false
      }
      this.currentFileId = file.uid
      this.showProgress = true
      return true
    },
    // 上传
    upload(params) {
      // console.log(params.file)
      if (params.file) {
        cos.putObject({
          Bucket: 'hjc-1256979994', /* 必须 */
          Region: 'ap-nanjing', /* 存储桶所在地域，必须字段 */
          Key: getNameRandom(params.file.name), /* 必须 */
          StorageClass: 'STANDARD',
          Body: params.file, // 上传文件对象
          onProgress: (params) => {
            // console.log(params.percent)
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          // console.log(err || data)
          if (!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileId) {
                return { url: 'http://' + data.Location }
              }
              return item
            })
            this.onSuccess('http://' + data.Location)
            this.uploadStatus = true
            setTimeout(() => {
              this.showProgress = false
              this.percent = 0
            }, 1000)
          } else {
            console.log(err)
          }
        })
      }
    }
  }
}

// 给文件名+7位随机数字
function getNameRandom(name) {
  // return '0' + Math.floor(Math.random() * 1000000)
  const index = name.lastIndexOf('\.')
  const r = Math.floor(Math.random() * 10000000)
  const type = name.substring(index)
  const newName = name.substring(0, index) + r + type
  return newName
  // console.log(name.substring(0, index))
}

</script>

<style>
  .diabled .el-upload--picture-card{
    display: none;
    z-index:-999;
  }
</style>
