<template>
  <div>
    <el-card class="card">
      <!-- 内容部分 -->

      <!-- 搜索 -->
     <div class="subNavBar">
       <el-row :gutter="24" class="subNavBar">
       <el-col :span="18">
        <div class="subSearch">
          <el-form  label-width="80px">
          <el-form-item label="学科名称" class="el-form-item__label">
          <el-input ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" class="but">清除</el-button>
          <el-button type="primary" size="small" class="but">搜索</el-button>
        </el-form-item>
          </el-form>
        </div>
       </el-col>
  <el-col :span="6">
    <div class="grid-content bg-purple">
      <el-button type="success" size="small" class="rightBut" icon="el-icon-edit">新增学科</el-button>
  </div>
</el-col>
</el-row>
     </div>
     <!-- alert提示信息 -->
     <div class="alert">
      <!-- <i class="el-icon-info"></i> -->
      <el-alert class="el-icon-info" type="info"> 
        <template #title>
          数据一共
          <span>13</span>条
        </template>
      </el-alert>
     </div>
</el-card>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
body {
    height: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
}
.card {
  // padding: 20px;
  //内容部分
  .subNavBar {
    height: 51px;
    // background-color: aqua;
  }
}

</style>
<style>
/* 导航-----------------开始 */
/* label */
.el-form-item__label {
    height: 32px;
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 32px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

/* input */
.el-input--medium .el-input__inner {
    height: 32px;
    line-height: 32px;
    width: 200px;
}

/* button按钮 */
.but {
  width:56px;
  font-size: 12px;
}
.rightBut {
  float: right;
}
.el-form-item {
    margin-bottom: 0px;
}
/* 导航-----------------结束 */
/* alert */
.alert {
    width: 100%;
    /* padding: 8px 16px; */
    margin: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 4px;
    position: relative;
    background-color: #fff;
    overflow: hidden;
    opacity: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-transition: opacity .2s;
    transition: opacity .2s;
}
</style>
