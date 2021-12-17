<template>
  <el-card class="page-tools">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col>
        <div v-if="showBefore" class="before">
          <i class="el-icon-info" />
          <slot name="before" />
        </div>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="after" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'PageTools',
  props: {
    showBefore: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-tools {
    // margin: 0;
    .before {
      display: inline-block;
      border: 1px solid #91d5ff;
      background-color:#e6f7ff;
      padding: 0px 10px;
      // font-size: 18px;
      border-radius: 5px;
      height: 30px;
      line-height: 30px;
      // color: ;
      i{
        // font-size: 14px;
        color: #409eff;
        margin-right: 5px;
      }
    }
  }
</style>
