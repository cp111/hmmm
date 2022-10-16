<template>
  <div>
    <!-- !从所属学科进入目录 -->
    <div v-if="showPanel">

    <el-card class="card">
      <!-- 内容部分 -->
      <!-- 搜索导航 -->
     <div class="subNavBar">
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb>
       <el-row :gutter="24" class="subNavBar">
        <!-- 搜索部分 -->
       <el-col :span="18">
        <div class="subSearch">
          <el-form :model="form" label-width="80px" :inline="true">
            <el-form-item label="目录名称">
          <el-input v-model="form.subject"></el-input>
        </el-form-item>
        <el-form-item label="状态">
        <el-select v-model="form.label" placeholder="请选择">
          <el-option label="启用" value="shanghai"></el-option>
          <el-option label="禁用" value="beijing"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" class="but" @click="clearBtn">清除</el-button>
          <el-button type="primary" size="small" class="but" @click="searchBtn">搜索</el-button>
        </el-form-item>
          </el-form>
        </div>
       </el-col>
       <!-- 添加学科 -->
      <el-col :span="6">
        <div>
        <el-button type="success" size="small" class="rightBut" icon="el-icon-edit" @click="addSubject">新增目录</el-button>
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
      <el-table-column label="序号" width="80" height="64" type="index" />
      <!-- 所属学科 -->
      <el-table-column
      header-cell-class-name="tableHeader"
        label="所属学科"
        width="241">
        <template  slot-scope="scope">
          {{scope.row.subjectName}}
        </template>
      </el-table-column>
      <!-- 目录名称 -->
      <el-table-column
      header-cell-class-name="tableHeader"
        label="目录名称"
        width="238">
        <template  slot-scope="scope">
          {{scope.row.directoryName
}}
        </template>
      </el-table-column>
      <!-- 创作者 -->
      <el-table-column label="创作者" width="238">
        <template  slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <!-- 创建时间 -->
    <el-table-column
        label="创建日期"
        width="238">
       <template>
        {{time}}
      </template>
    </el-table-column>

    <!-- <el-table-column
    label="前台是否显示"
    width="205">
      <template  slot-scope="scope">
        {{scope.row.isFrontDisplay===1?'是':'否'}}
      </template>
    </el-table-column> -->
    <!-- 面试题数量 -->
    <el-table-column
      label="面试题数量"
      width="238">
      <template  slot-scope="scope">
        {{scope.row.totals }}
      </template>
    </el-table-column>
    <!-- 状态 -->
    <el-table-column
    label="状态"
    width="238">
      <template  slot-scope="scope">
        {{scope.row.state==1?"已启用":'已禁用' }}
      </template>
    </el-table-column>
    <!-- 操作 -->
    <el-table-column

      label="操作"
      width="150">
      <template   slot-scope="scope">
          <el-button type="text" class="operateState" @click="changeStates(scope.row)" >{{scope.row.state==1?"已启用":'已禁用' }}</el-button>
          <el-button type="text"  class="operate" @click="EditSubject(scope.row)" :disabled="scope.row.state==1?false:true" >修改</el-button>
          <el-button type="text"  class="operate" @click="del(scope.row)" :disabled="scope.row.state==1?false:true" >删除</el-button>
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
       <!-- !从侧边栏进入目录 -->
  <div v-else>
    <el-card class="card">
      <!-- 内容部分 -->

      <!-- 搜索导航 -->
     <div class="subNavBar">
       <el-row :gutter="24" class="subNavBar">
        <!-- 搜索部分 -->
       <el-col :span="18">
        <div class="subSearch">
          <el-form :model="form" label-width="80px" :inline="true">
            <el-form-item label="目录名称">
          <el-input v-model="form.subject"></el-input>
        </el-form-item>
        <el-form-item label="状态">
        <el-select v-model="form.label" placeholder="请选择">
          <el-option label="启用" value="shanghai"></el-option>
          <el-option label="禁用" value="beijing"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" class="but" @click="clearBtn">清除</el-button>
          <el-button type="primary" size="small" class="but" @click="searchBtn">搜索</el-button>
        </el-form-item>
          </el-form>
        </div>
       </el-col>
       <!-- 添加学科 -->
      <el-col :span="6">
        <div>
        <el-button type="success" size="small" class="rightBut" icon="el-icon-edit" @click="addSubject">新增目录</el-button>
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
      <el-table-column label="序号" width="80" height="64" type="index" />
      <!-- 所属学科 -->
      <el-table-column
      header-cell-class-name="tableHeader"
        label="所属学科"
        width="241">
        <template  slot-scope="scope">
          {{scope.row.subjectName}}
        </template>
      </el-table-column>
      <!-- 目录名称 -->
      <el-table-column
      header-cell-class-name="tableHeader"
        label="目录名称"
        width="238">
        <template  slot-scope="scope">
          {{scope.row.directoryName
}}
        </template>
      </el-table-column>
      <!-- 创作者 -->
      <el-table-column label="创作者" width="238">
        <template  slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <!-- 创建时间 -->
    <el-table-column
        label="创建日期"
        width="238">
       <template>
        {{time}}
      </template>
    </el-table-column>

    <!-- <el-table-column
    label="前台是否显示"
    width="205">
      <template  slot-scope="scope">
        {{scope.row.isFrontDisplay===1?'是':'否'}}
      </template>
    </el-table-column> -->
    <!-- 面试题数量 -->
    <el-table-column
      label="面试题数量"
      width="238">
      <template  slot-scope="scope">
        {{scope.row.totals }}
      </template>
    </el-table-column>
    <!-- 状态 -->
    <el-table-column
    label="状态"
    width="238">
      <template  slot-scope="scope">
        {{scope.row.state==1?"已启用":'已禁用' }}
      </template>
    </el-table-column>
    <!-- 操作 -->
    <el-table-column

      label="操作"
      width="150">
      <template   slot-scope="scope">
          <el-button type="text" class="operateState" @click="changeStates(scope.row)" >{{scope.row.state==1?"已启用":'已禁用' }}</el-button>
          <el-button type="text"  class="operate" @click="EditSubject(scope.row)" :disabled="scope.row.state==1?false:true" >修改</el-button>
          <el-button type="text"  class="operate" @click="del(scope.row)" :disabled="scope.row.state==1?false:true" >删除</el-button>
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
    <!-- 新增学科弹出框 -->
    <el-dialog
      :title="editForm.id ? '修改目录':'新增学科'"
      :visible.sync="dialogVisible"
      width="400px"
      >
      <div class="addSubject">
        <el-form :model="editForm" label-width="80px" :rules="rules">
        <el-form-item label="所属学科" prop="subjectName" style="margin-bottom: 18px">
          <el-select v-model="form.subjectOption" placeholder="请选择活动区域" style="width:280px">
      <el-option label="区域一" value="shanghai"></el-option>
    </el-select>
      </el-form-item>
      <el-form-item label="是否显示" >
        <el-input ></el-input>
      </el-switch>
      </el-form-item>
      </el-form>
      <div class="dialogFooter">
        <span class="ok" @click="okBtn">确认</span>
        <span class="cancel" @click="dialogVisible=false">取消</span>
      </div>
      </div>
    </el-dialog>
    <!-- 修改学科弹出框 -->
    <!-- <el-dialog
      title="修改学科"
      :visible.sync="dialogEdit"
      width="400px"
      >
      <div class="addSubject">
        <el-form :model="editForm" label-width="80px" :rules="rules" >
        <el-form-item label="学科名称" prop="subjectName" style="margin-bottom: 18px">
        <el-input v-model="editForm.subjectName" placeholder="请输入学科名称"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" >
        <el-switch
        v-model="form.value"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change="switchChange">
      </el-switch>
      </el-form-item>
      </el-form>
      <div class="dialogFooter">
        <span class="ok" @click="EditOK">确认</span>
        <span class="cancel" @click="dialogEdit=false">取消</span>

      </div>
      </div>

    </el-dialog> -->
  </div>
</template>

<script>

import { directoryslist, add } from '@/api/hmmm/directorys.js'
// dayjs引入
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 导入本地化语言
dayjs.locale('zh-cn') // 使用本地化语言

export default {
  data () {
    return {
      showPanel: false,
      form: {
        subject: '',
        dialogSubject: '', // 表单双绑
        value: true, // 开关
        dialogEdit: '', // 编辑学科名称
        directorys: '', // 目录名称
        subjectOption: {} // 修改目录所属学科
      },
      editForm: {
        subjectName: '',
        id: '',
        isFrontDisplay: ''
      },
      dialogVisible: false, // 新增学科弹窗显示
      dialogEdit: false, // 修改学科弹窗显示
      getlist: [], // 员工列表渲染
      time: '',
      pageDate: [], // 员工列表数据
      pageIndex: {
        page: 1,
        pagesize: 10,
        subjectName: '',
        isFrontDisplay: ''
      },
      rules: {
        dialogSubject: [
          { required: true, message: '请输入学科名称', trigger: 'blur' },
          { min: 1, trigger: 'blur' }
        ],
        subjectName: [
          { required: true, message: '请输入学科名称', trigger: 'blur' },
          { min: 1, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getList()
    this.getRouteId()
  },
  methods: {
    // 从学科跳转页面

    getRouteId () {
      console.log(this.$route.id)
      if (this.$route.id) {
        this.showPanel = true
      } else {
        this.showPanel = false
      }
    },
    // 从学科跳转页面
    // 禁用状态切换
    changeStates (row) {
      row.state = !row.state

      this.$message.success('操作成功')
    },
    // 获取目录列表
    async getList () {
      const { data } = await directoryslist(this.pageIndex)
      // 获取分页数据
      this.pageDate = data
      this.getlist = data.items
      // 格式化时间
      this.time = dayjs(this.getlist.addDate).format('YYYY-MM-DD HH:mm:ss')
    },

    // 分页组件
    // 切换分页组件
    sizechange (value) {
      this.pageIndex.pagesize = value
      console.log(this.pageIndex.pagesize)
      this.getList(this.pageIndex)
    },

    // 导航栏
    // 搜索功能
    async searchBtn () {
      // 重复赋值
      this.pageIndex.subjectName = this.form.subject
      await this.getList(this.pageIndex.subjectName)
      // this.form.subject = ''
      // console.log(this.form.subjectName)
    },
    // 清空
    clearBtn () {
      this.form.subject = ''
    },
    // 新增学科
    addSubject () {
      this.editForm.subjectName = ''
      this.editForm.isFrontDisplay = true
      this.editForm.id = ''
      this.dialogVisible = true
    },
    // switch切换状态
    switchChange () {
      console.log(this.form.value)
    },
    // 确认按钮
    async okBtn () {
      if (this.editForm.id) {
        this.EditOK()
      } else {
        await add({
          subjectName: this.editForm.subjectName,
          isFrontDisplay: this.editForm.isFrontDisplay
        })
        this.dialogVisible = false
        this.$message.success('操作成功')
        this.getList()
      }
    },
    // 修改学科
    EditSubject (row) {
      this.editForm.id = row.id
      this.editForm.subjectName = row.subjectName
      this.editForm.isFrontDisplay = !!row.isFrontDisplay
      this.dialogVisible = true
    },
    async EditOK () {
      await update(this.editForm)
      this.dialogVisible = false
      this.getList()
      this.$message.success('操作成功')
    },
    // 删除数据
    del (row) {
      console.log(row.id)
      this.$confirm('此操作将永久删除该学科，是否继续？', '确认信息', {
        // distinguishCancelAndClose: true,
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(async () => {
          await remove(row.id)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          await this.getList()
        }).catch(() => {
        })
    }
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
// 面包屑
/deep/.el-card__header {
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
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
.subSearch  .el-input--medium .el-input__inner {
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
    cursor:pointer;
  }
  .operateState {
    /* margin: 0 0 0 10px; */
    color: #409eff;
    cursor:pointer;
  }
  /* 新增学科 */
  .dialog {
    height: 161px;
    /* background-color: aqua; */
  }
/* 弹窗 */
.el-input--medium .el-input__inner {
    height: 32px;
    line-height: 32px;
}
/* 是否显示 */
.el-form-item--medium .el-form-item__content, .el-form-item--medium .el-form-item__label {
    line-height: 32px;
}
/* 底部按钮 */
.dialogFooter {
  margin-top: 20px;
  height: 36px;
  /* background-color: #409eff; */
}
 .cancel {
  float: right;
  padding: 10px 20px 20px;
  display: inline-block;
  width: 70px;
  height: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  color: #606266;
  cursor:pointer;
}
.ok {
  float: right;
  margin-left: 10px;
  padding: 10px 20px 20px;
  display: inline-block;
  width: 70px;
  height: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  color: #fff;
  background: #409eff;
  cursor:pointer;
}
</style>
