<template>
  <div>
    <el-card class="card">
   <template>
    <el-input v-model="formInline.user" class="input" placeholder="根据用户名搜索">
      </el-input>
      <el-button @click="qk" style="margin-left:10px">清空</el-button>
      <el-button type="primary" @click="search">搜索</el-button>
      <addPermission @zdsx="qqsj" />
   </template>

      <el-alert :title="'共'+this.tableData.length +'条数据'" type="info" show-icon class="alert">
      </el-alert>

      <template>
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="250">
    </el-table-column>
    <el-table-column
      prop="title"
      label="用户名"
      width="300">
    </el-table-column>
    <el-table-column
      prop="create_date"
      sortable
      label="日期"
      width="380">
    </el-table-column>
    <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <editPermission/>
              <el-button type="danger" icon="el-icon-delete" @click="del(scope.row)" circle class="del"></el-button>
            </template>
          </el-table-column>
  </el-table>
</template>

    </el-card>
  </div>
</template>

<script>
import { list, remove } from '../../api/base/permissions'
import addPermission from './components/addPermission.vue'
import editPermission from './components/editPermission.vue'
export default {
  components: {
    addPermission,
    editPermission
  },
  data() {
    return {
      formInline: {
        user: ''
      },

      tableData: [{
        title: '',
        create_date: ''
      }],
      multipleSelection: []
    }
  },

  created() {
    this.list()
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 渲染列表
    async list() {
      const { data } = await list()
      this.tableData = data.list
    },
    qk() {
      this.formInline.user = ''
      this.list()
    },
    async search() {
      const obj = {
        page: 1,
        pagesize: 10,
        title: this.formInline.user
      }
      const { data } = await list(obj)
      this.tableData = data.list
    },
    qqsj() {
      this.list()
    },
    async  del(row) {
      await remove(row)
      this.list()
    }
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
  margin-left: 600px;
}

.item {
  margin-left: 150px;
}

.input {
  width: 250px;
}
.alert {
  margin-top: 20px;
  margin-bottom: 20px;
}
.del {
  margin-left: 10px;
}
</style>
