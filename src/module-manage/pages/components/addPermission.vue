<template>
  <span>
<el-button type="primary" @click="xz" icon="el-icon-edit" class="add">新增权限组</el-button>
<el-dialog title="创建权限组" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="权限分配" :label-width="formLabelWidth">
        <el-tree
        ref="tree"
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[1]"
        :props="defaultProps">
        </el-tree>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="qd">确 定</el-button>
  </div>
</el-dialog>
  </span>
</template>

<script>
import { list } from '../../../api/base/menus'
import { add } from '../../../api/base/permissions'

export default {
  data() {
    return {
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: ''
      },
      data: [{
        id: 1,
        label: '系统菜单和页面权限点',
        children: [{
          id: '',
          lable: '',
          children: [{
            id: '',
            lable: '',
            children: [{
              id: '',
              lable: ''
            }]
          }]
        }]
      }],
      defaultProps: {
        children: 'childs',
        label: 'title'
      },
      formLabelWidth: '120px'
    }
  },
  created() {
  },
  methods: {
    async xz() {
      this.dialogFormVisible = true
      const { data } = await list()
      this.data = data
    },
    async qd() {
      const id = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      const obj = {
        permissions: id,
        title: this.form.name
      }
      await add(obj)
      this.$emit('zdsx')
      this.dialogFormVisible = false
    }
  }
}
</script>

<style>
.add {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
  margin-left: 600px;
}
</style>
