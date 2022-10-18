<template>
  <div>
    <el-card class="card">
   <template>
    <el-input v-model="formInline.user" class="input" placeholder="根据用户名搜索">
      </el-input>
      <el-button @click="qk">清空</el-button>
      <el-button type="primary" @click="search">搜索</el-button>
      <add @zdsx="qqsj" />
   </template>

      <el-alert :title="'共'+this.tableData.length +'条数据'" type="info" show-icon>
      </el-alert>

      <template>
        <el-table :data="tableData" style="width: 100%;margin-top: 20px;">
          <el-table-column fixed prop="id" label="序号" width="100">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="150">
          </el-table-column>
          <el-table-column prop="phone" label="联系电话" width="150">
          </el-table-column>
          <el-table-column prop="username" label="用户名" width="150">
          </el-table-column>
          <el-table-column prop="permission_group_title" label="权限组名称" width="300">
          </el-table-column>
          <el-table-column prop="role" label="角色" width="150">
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="scope">
              <edit
               :current-row="scope.row" />
              <el-button type="danger" @click="del(scope.row)" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <PageTool
      :counts= +pageTools.counts
      :pagesize = +pageTools.pagesize
      :pages = +pageTools.pages
      :page = +pageTools.page
      @next="next"
      @up="up"
      />
    </el-card>
  </div>
</template>

<script>
import { list, remove } from '../../api/base/users'
import add from './components/add.vue'
import edit from './components/edit.vue'
import PageTool from '../components/page-tool.vue'
export default {
  components: {
    add,
    edit,
    PageTool
  },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [{
        id: '',
        email: '',
        phone: '',
        username: '',
        permission_group_title: '',
        role: ''
      }],
      pageTools: {
        counts: '',
        pagesize: '',
        pages: '',
        page: ''
      },
      currentPage4: 1
    }
  },

  created() {
    this.list()
  },

  methods: {
    qk() {
      this.formInline = {}
    },
    qqsj() {
      this.list()
    },
    async search() {
      const obj = {
        page: 1,
        pagesize: 10,
        username: this.formInline.user
      }
      const { data } = await list(obj)
      this.tableData = data.list
    },
    // 渲染列表
    async list() {
      const { data } = await list(this.formInline.user)
      console.log(data)
      this.tableData = data.list
      this.pageTools.counts = data.counts
      this.pageTools.pagesize = data.pagesize
      this.pageTools.pages = data.pages
      this.pageTools.page = data.page
    },
    async del(row) {
      await remove(row)
      this.list()
    },
    async next() {
      this.pageTools.page++
      const { data } = await list(this.pageTools)
      this.tableData = data.list
    },
    async up() {
      if (this.pageTools.page-- > 0) {
        const { data } = await list(this.pageTools)
        this.tableData = data.list
      }
    }
  }
}
</script>

<style scoped lang='less'>
.card {
  margin: 20px;
}

.input {
  width: 200px;
  margin: 10px;
  margin-bottom:20px ;
}
</style>
