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

      <el-alert title="消息提示的文案" type="info" show-icon>
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
            <template>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

    </el-card>
  </div>
</template>

<script>
import { list } from '../../api/base/users'
import add from './components/add.vue'
export default {
  components: {
    add
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
      }]
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
    search() { },
    // 渲染列表
    async list() {
      const { data } = await list(this.tableData)
      this.tableData = data.list
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
