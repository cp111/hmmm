<template>
  <div>
<el-card class="card">
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item>
    <el-input v-model="formInline.user" placeholder="根据用户名搜索"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="qk">清空</el-button>
    <el-button type="primary" @click="search">搜索</el-button>
    <el-button type="primary" icon="el-icon-edit" class="add">新增用户</el-button>
  </el-form-item>
</el-form>

<el-alert
    title="消息提示的文案"
    type="info"
    show-icon>
  </el-alert>

  <template>
  <el-table
    :data="tableData"
    border
    style="width: 100%;margin-top: 20px;">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

</el-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },

  created () {

  },

  methods: {
    qk() {
      this.formInline = {}
    },
    search() {}
  }
}
</script>

<style scoped lang='less'>
.card {
  margin: 20px;
}
.add {
  color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
    margin-left: 651px;
}
</style>
