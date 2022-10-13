<template>
  <div>
    <el-card class="card">
      <!-- 内容部分 -->

      <!-- 搜索导航 -->
     <div class="subNavBar">
       <el-row :gutter="24" class="subNavBar">
        <!-- 搜索部分 -->
       <el-col :span="18">
        <div class="subSearch">
          <el-form  label-width="80px">
          <el-form-item label="学科名称" class="el-form-item__label">
          <el-input type="text" v-model="text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" class="but">清除</el-button>
          <el-button type="primary" size="small" class="but">搜索</el-button>
        </el-form-item>
          </el-form>
        </div>
       </el-col>
       <!-- 添加学科 -->
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
        <el-alert class="el-icon-info" type="info" :closable="false">
          <template #title>
            数据一共
            <span>{{pageDate.counts}}</span>条
          </template>
        </el-alert>
     </div>
     <!-- 表格部分 -->
     <div class="table">
      <el-table
        style="width: 100%"
        :data="getlist"
        :header-cell-style="{background:'#fafafa'}"
         >
      <el-table-column label="序号" width="48" height="64" type="index" />
      <el-table-column
      header-cell-class-name="tableHeader"
        label="学科名称"
        width="207">
        <template  slot-scope="scope">
          {{scope.row.subjectName}}
        </template>
      </el-table-column>

      <el-table-column label="创作者" width="205">
        <template  slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
    <el-table-column
        label="创建日期"
        width="160">
       <template>
        {{time}}
      </template>
    </el-table-column>

    <el-table-column
    label="前台是否显示"
    width="205">
      <template  slot-scope="scope">
        {{scope.row.isFrontDisplay===1?'是':'否'}}
      </template>
    </el-table-column>

    <el-table-column
      label="二级目录"
      width="205">
      <template  slot-scope="scope">
        {{scope.row.twoLevelDirectory }}
      </template>
    </el-table-column>

    <el-table-column
    label="标签"
    width="205">
      <template  slot-scope="scope">
        {{scope.row.tags }}
      </template>
    </el-table-column>

    <el-table-column
      label="标题数量"
      width="205">
      <template  slot-scope="scope">
        {{scope.row.totals }}
      </template>
    </el-table-column>
    <el-table-column

      label="操作"
      width="240">
      <template>
          <span style="color: #409eff;">学科分类</span>
          <span class="operate">学科标签</span>
          <span  class="operate">修改</span>
          <span  class="operate">删除</span>
      </template>
    </el-table-column>
    </el-table>
     </div>
     <!-- 分页组件 -->
     <div class="block">
      <el-pagination
      background
      :current-page.sync="pageIndex.page"
      :page-sizes="[5, 10, 20, 50]"
      :page-size.sync="pageIndex.pagesize"
      layout="prev, pager, next,sizes, jumper"
      @size-change="sizechange"
      @current-change="getList"
      :total="pageDate.counts">
    </el-pagination>
     </div>
    </el-card>
  </div>
</template>

<script>

import { list } from '@/api/hmmm/subjects.js'
// dayjs引入
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 导入本地化语言
dayjs.locale('zh-cn') // 使用本地化语言

export default {
  data () {
    return {
      getlist: [], // 员工列表渲染
      time: '',
      pageDate: [], // 员工列表数据
      text: '',
      pageIndex: {
        page: 1,
        pagesize: 10
      }
    }
  },
  methods: {
    // 获取学科列表
    async getList () {
      const { data } = await list(this.pageIndex)
      // 获取分页数据
      this.pageDate = data
      this.getlist = data.items
      // 格式化时间
      this.time = dayjs(this.getlist.addDate).format('YYYY-MM-DD')
    },

    sizechange (value) {
      this.pageIndex.pagesize = value
      this.getList(this.pageIndex)
    }
  },
  created () {
    this.getList()
  }
}
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
  //内容部分
  .subNavBar {
    height: 51px;
  }
}
/deep/.el-table__header-wrapper {
   border-bottom: 2px solid #e8e8e8;
}
// 表格行高
/deep/.el-table__row {
  height: 57px;
}
  /* 分页部分 */
.block {
  margin: 20px 0;
    float: right;
    height: 32px;
  /deep/.el-input--medium .el-input__inner {
  width: 40px;
}
}
/deep/.el-pagination__jump {
     margin-left: 0px;
    font-weight: 400;
    color: #606266;
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
    margin: 0 0 15px;
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
/* 表格部分 */
.el-table .warning-row {
    background: blue;
  }
  .tableHeader {
    background-color: rgb(110, 27, 27);
  }

  /* 操作 */
  .operate {
    margin: 0 0 0 10px;
    color: #409eff;
  }

</style>
