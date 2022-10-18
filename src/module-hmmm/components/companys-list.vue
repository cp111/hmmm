<template>
  <div>
    <el-table
    :header-cell-style="{backgroundColor:'#fafafa',textAlign: 'center'}"
    :cell-style="{textAlign: 'center'}"
    :data="companysList.items"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        width="138">
        <!-- <template slot-scope="{column,row}">
          {{row}}
        </template> -->
      </el-table-column>
      <el-table-column
        prop="number"
        label="企业编号"
        width="134">
      </el-table-column>
      <el-table-column
        prop="company"
        label="企业简称">
      </el-table-column>
      <el-table-column
        prop="tags"
        label="标签"
        width="134">
      </el-table-column>
      <el-table-column
        prop="username"
        label="创建者">
      </el-table-column>
      <el-table-column
        prop="addDate"
        label="创建日期"
        width="134">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注">
      </el-table-column>
       <el-table-column
        label="状态">
        <template slot-scope="{row}">
            {{states[row.state]}}
        </template>
      </el-table-column>
      <el-table-column
      class="caozuo"
      width="180"
        prop="address"
        label="操作">
       <template slot-scope="{row}">
        <el-row>
        <el-button type="primary" size="medium" circle @click="edit(row)" class="el-icon-edit" ></el-button>
        <el-button type="success" size="medium" circle class="el-icon-check" @click="open(row)" v-if="row.state===0"></el-button>
        <el-button type="danger"  size="medium" circle class="el-icon-close" @click="open(row)" v-if="row.state===1"></el-button>
        <el-button type="warning" size="medium" circle class="el-icon-delete" @click="del(row)"></el-button>
        </el-row>
       </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { remove, disabled } from '@/api/hmmm/companys.js'
export default {
  components: {
    // CompanysAdd
  },
  props: {
    companysList: {
      typpe: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      states: {
        1: '启用',
        0: '禁用'
      },
      openAddUser: false,
      //   formBase: {},
      titleInfo: {
        text: '创建用户'
      },
      rows: null
    }
  },
  methods: {
    edit(row) {
      this.rows = row
      this.$emit('openEdit', this.rows)
    },
    open(row) {
      console.log(row)
      if (row.state === 0) {
        this.$confirm('已成功启用, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          row.state = 1
          await disabled({
            id: row.id,
            state: row.state
          })
          this.$message({
            type: 'success',
            message: '已启用成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      } else {
        this.$confirm('已成功禁用, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          row.state = 0
          await disabled({
            id: row.id,
            state: row.state
          })
          this.$message({
            type: 'success',
            message: '已启用禁用!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      }
    },
    del(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await remove({ id: row.id })
        this.$emit('newDataes')
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.caozuo{
       line-height: 36px;
       border-radius: 50%;
       width:36px;
       height:36px;
}
</style>
<style lang="scss" scoped>
/* 按钮样式 */
.el-button--primary:hover {
  background: #3599F5;
  border-color: #3599F5;
  color: #FFF;
  opacity: 0.8;
}
.el-button--primary {
    color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
}
.el-button--success {
    color: #67c23a;
    background: #f0f9eb;
    border-color: #c2e7b0;
}
.el-button--success:hover {
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
}
.el-button--warning:hover {
    color: #fff;
    background-color: #e6a23c;
    border-color: #e6a23c;
}
.el-button--warning {
    color: #e6a23c;
    background: #fdf6ec;
    border-color: #f5dab1;
}
.el-button--danger:hover {
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;
}
.el-button--danger {
    color: #f56c6c;
    background: #fef0f0;
    border-color: #fbc4c4;
}
</style>
