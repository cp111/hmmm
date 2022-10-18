<template>
  <div>
    <!-- !从所属学科进入目录 -->
       <!-- !从侧边栏进入目录 -->
  <div>
    <el-card class="card">
      <div  v-if="$route.query.id?true:false">
      <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item >学科管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.query.name}}</el-breadcrumb-item>
        <el-breadcrumb-item>标签管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="subNavBar">
       <el-row :gutter="24" class="subNavBar">
        <!-- 搜索部分 -->
       <el-col :span="18">
        <div class="subSearch">
          <el-form :model="form" label-width="80px" :inline="true">
            <el-form-item label="标签名称">
          <el-input v-model="form.directorys"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.options.value" placeholder="请选择">
          <el-option
            v-for="item in form.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
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
          <!-- <el-button type="text" size="small" style="color:#409eff;float: right;" icon="el-icon-back" @click="$router.back()">返回学科</el-button> -->
        <el-button type="success" size="small" class="rightBut" icon="el-icon-edit" @click="addSubject">新增标签</el-button>
        <el-button type="text" size="small" style="color:#409eff;float: right;margin-right: 10px;font-size: 14px;" icon="el-icon-back" @click="$router.back()">返回学科</el-button>
      </div>
    </el-col>
    </el-row>
     </div>
    </div>
      <!-- 内容部分 -->

      <!-- 搜索导航 -->
     <div class="subNavBar" v-else>
       <el-row :gutter="24" class="subNavBar">
        <!-- 搜索部分 -->
       <el-col :span="18">
        <div class="subSearch">
          <el-form :model="form" label-width="80px" :inline="true">
            <el-form-item label="标签名称">
          <el-input v-model="form.directorys"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.options.value" placeholder="请选择">
          <el-option
            v-for="item in form.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
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
      <el-table-column label="序号" width="48" height="64" type="index" />
      <el-table-column
      header-cell-class-name="tableHeader"
        label="所属学科"
        width="287">
        <template  slot-scope="scope">
          {{scope.row.subjectName}}
        </template>
      </el-table-column>
      、
      <el-table-column label="标签名称" width="286">
        <template  slot-scope="scope">
          {{scope.row.tagName}}
        </template>
      </el-table-column>

      <el-table-column label="创作者" width="286">
        <template  slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
    <el-table-column
        label="创建日期"
        width="286">
       <template>
        {{time}}
      </template>
    </el-table-column>

    <el-table-column
    label="状态"
    width="286">
      <template  slot-scope="scope">
        {{scope.row.state===1?'已启用':'已禁用'}}
      </template>
    </el-table-column>

    <el-table-column

      label="操作"
      width="200">
      <template   slot-scope="scope">
          <el-button type="text" class="operateState" @click="changeStates(scope.row)" >{{scope.row.state==1?"禁用":'启动' }}</el-button>
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
      :title="editForm.id ? '修改标签':'新增标签'"
      :visible.sync="dialogVisible"
      width="400px"
      >
      <!-- 有路由id进入的页面 -->
      <div class="addSubject" v-if="$route.query.id">
        <el-form :model="editForm" label-width="80px" :rules="rules">
        <el-form-item label="标签名称" prop="dialogdirectorys" style="margin-bottom: 18px">
          <el-input v-model="editForm.directorysOK" style="width:280px" placeholder="请输入标签名称">
    </el-input>
      </el-form-item>
      </el-form>
      <div class="dialogFooter">
        <span class="ok" @click="okBtn">确认</span>
        <span class="cancel" @click="dialogVisible=false">取消</span>
      </div>
      </div>
      <!-- 目录页面进入 -->
      <div class="addSubject" v-else>
        <el-form :model="form" label-width="80px" :rules="rules">
        <el-form-item label="所属学科" prop="subjectName" style="margin-bottom: 18px">
          <el-select v-model="form.subjectOption" placeholder="请选择" style="width:280px">
             <el-option ref="addOpction" v-for="item in subList" :key="item.id" :label="item.label" :value="item.value"></el-option>
    </el-select>
      </el-form-item>
      <el-form-item label="标签名称" >
        <el-input v-model="form.subjectName" ></el-input>
      </el-form-item>
      </el-form>
      <div class="dialogFooter">
        <span class="ok" @click="okBtn">确认</span>
        <span class="cancel" @click="dialogVisible=false">取消</span>
      </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { list as directoryslist, add, update, remove } from '@/api/hmmm/tags.js'
// dayjs引入
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 使用本地化语言
import { simple as getSubList } from '@/api/hmmm/subjects.js' // 导入本地化语言
dayjs.locale('zh-cn')

export default {
  data () {
    return {
      subList: [], // 简单列表详情
      addSubjectOP: [],
      // subjectID: null,
      searchName: '',
      // 目录跳转页面
      subjectId: '', // 学科id
      // 目录跳转页面
      form: {

        subjectName: '',
        dialogSubject: '', // 表单双绑
        dialogEdit: '', // 编辑学科名称
        directorys: '', // 目录名称
        subjectOption: '', // 修改目录所属学科
        newAddOpctions: [], // 处理后数组
        options: [{
          value: 1,
          label: '开启'
        }, {
          value: 0,
          label: '禁用'
        }]
      },
      editForm: {
        directoryName: '',
        id: '',
        // subjectOption: null,
        subjectID: null
      },
      dialogVisible: false, // 新增学科弹窗显示
      getlist: [], // 员工列表渲染
      time: '',
      pageDate: [], // 员工列表数据
      pageIndex: {
        page: 1,
        pagesize: 10,
        subjectName: null,
        isFrontDisplay: null,
        subjectID: null
      },
      rules: {
        dialogSubject: [
          { required: true, message: '请输入学科名称', trigger: 'blur' },
          { min: 1, trigger: 'blur' }
        ],
        // 新增
        dialogdirectorys: [
          { required: true, message: '请输入目录名称', trigger: 'blur' },
          { min: 1, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getList()
    // 一进入页面获取多条数据，把数据渲染到新增选项上
    this.getOpctionsList()
    this.getSubList()
  },
  methods: {
    async getSubList () {
      const res = await getSubList()
      this.subList = res.data
      console.log(this.subList)
    },
    async getOpctionsList () {
      const { data } = await directoryslist({
        page: 1,
        pagesize: 1000
      })
      // console.log(data)
      const newlist = []
      // 已进入页面获取所有信息
      this.addSubjectOP = data.items
      // console.log(this.addSubjectOP)
      this.addSubjectOP.forEach(item => {
        newlist.push({
          subjectName: item.subjectName,
          id: item.id
        })
      })
    },
    changeStates (row) {
      row.state = !row.state
      this.$message.success('操作成功')
      console.log(row.state)
      // this.getList()
    },

    // 获取目录列表
    async getList () {
      if (this.$route.query.id) {
        this.pageIndex.subjectID = this.$route.query.id
      }
      const { data } = await directoryslist(this.pageIndex)
      // 获取分页数据
      this.pageDate = data
      this.getlist = data.items
      // console.log(this.pageDate)

      // 格式化时间
      this.time = dayjs(this.getlist.addDate).format('YYYY-MM-DD HH:mm:ss')
    },

    // 分页组件
    // 切换分页组件
    sizechange (value) {
      this.pageIndex.pagesize = value
      // console.log(this.pageIndex.pagesize)
      this.getList(this.pageIndex)
    },

    // 导航栏
    // 搜索功能完成
    async searchBtn () {
      this.searchName = this.form.directorys
      // 重复赋值
      const { data } = await directoryslist({
        tagName: this.searchName,
        page: 1,
        pagesize: 10,
        state: this.form.options.value
      })
      this.getlist = data.items
    },
    // 清空
    clearBtn () {
      this.form.directorys = ''
      this.form.options.value = ''
    },
    // 新增学科
    async  addSubject () {
      this.editForm.subjectName = ''
      this.editForm.id = ''
      this.dialogVisible = true
      // console.log(this.getlist)
    },
    // 导航栏
    // 一进页面所有学科列表
    // 确认按钮
    async okBtn () {
      if (this.editForm.id) {
        this.EditOK()
      } else {
        // 判断是否从学科页面跳转进入目录页
        if (this.$route.query.id) {
          const myString = this.$route.query.id
          const subjectID = parseInt(myString)
          await add({
            tagName: this.editForm.directorysOK,
            subjectID,
            id: null
          })
          this.editForm.directorysOK = ''
          this.dialogVisible = false
          this.$message.success('操作成功')
          this.getList()
        }
        const res = await add({
          tagName: this.form.subjectName,
          subjectID: this.form.subjectOption
        })
        this.dialogVisible = false
        this.$message.success('新增标签成功')
        this.getList()
        console.log(res)
      }
    },
    // 修改学科
    EditSubject (row) {
      this.editForm.id = row.id
      this.editForm.subjectID = row.subjectID
      this.form.subjectOption = row.subjectID
      this.form.subjectName = row.tagName
      this.dialogVisible = true
    },
    async EditOK () {
      await update({
        tagName: this.form.subjectName,
        subjectID: this.form.subjectOption,
        id: this.editForm.id
      })
      this.dialogVisible = false
      this.getList()
      this.form.subjectOption = ''
      this.form.subjectName = ''
      this.$message.success('修改目录成功')
      console.log(this.form.subjectOption)
    },
    // 删除数据
    del (row) {
      // console.log(row.id)
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
/deep/.el-breadcrumb__inner {
    color: #606266;
}
</style>

<style>
