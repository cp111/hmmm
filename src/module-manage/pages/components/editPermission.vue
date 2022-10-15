<template>
    <span>
 <el-button type="primary" circle @click="edit" icon="el-icon-edit" class="btn"></el-button>
  <el-dialog title="编辑权限组" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="权限分配" :label-width="formLabelWidth">
        <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        ref="tree"
        :default-expanded-keys="[1]"
        :default-checked-keys="arr"
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
import { detail, update } from '../../../api/base/permissions'
export default {
  data() {
    return {
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
      arr: [],
      formLabelWidth: '120px'
    }
  },
  props: {
    currentRow: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
  },
  methods: {
    async edit() {
      this.dialogFormVisible = true
      const { data } = await list()
      this.data = data
      this.form.name = this.currentRow.title
      const res = await detail(this.currentRow)
      this.arr = res.data.permissions
    },
    async qd() {
      const key = this.$refs.tree.getCheckedNodes()
      const keys = []
      key.map(item => {
        keys.push(item.id)
      })
      const obj = {
        id: this.currentRow.id,
        title: this.form.name,
        permissions: keys
      }
      await update(obj)
      this.edit()
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
