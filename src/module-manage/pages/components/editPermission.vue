<template>
    <span>
 <el-button type="primary" circle @click="add" icon="el-icon-edit" class="btn"></el-button>
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
        :default-expanded-keys="[1]"
        :props="defaultProps">
        </el-tree>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
    </span>
  </template>

<script>
import { list } from '../../../api/base/menus'
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
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
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
    async add() {
      this.dialogFormVisible = true
      const { data } = await list()
      this.data = data
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
