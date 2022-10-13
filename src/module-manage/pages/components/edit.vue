<template>
  <!-- Form -->
  <span>
    <el-button type="primary" circle @click="xg(currentRow)" icon="el-icon-edit" class="btn"></el-button>

    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item class="item" label="用户名" :label-width="formLabelWidth">
          <el-input class="input" v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item class="item" label="邮箱" :label-width="formLabelWidth">
          <el-input class="input" v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item class="item" label="角色" :label-width="formLabelWidth">
          <el-input class="input" v-model="form.role" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item class="item" label="权限组名称" :label-width="formLabelWidth">
          <el-select v-model="form.permission_group_id" placeholder="请选择">
            <el-option v-for="(item,index) in xl" :key="index"  :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="item" label="联系电话" :label-width="formLabelWidth">
          <el-input class="input" v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item class="item" label="介绍" :label-width="formLabelWidth">
          <el-input type="textarea" placeholder="Please input" class="input"
          v-model="form.introduction" autocomplete="off">
          </el-input>
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
import { list } from '../../../api/base/permissions'
import { update } from '../../../api/base/users'
export default {
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        avatar: '',
        email: '',
        introduction: '',
        password: '',
        permission_group_id: '',
        phone: '',
        role: '',
        sex: '',
        username: ''
      },
      xl: [
        {
          title: '',
          id: ''
        }
      ],
      formLabelWidth: '120px'
    }
  },
  props: {
    currentRow: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    async xg(row) {
      this.form = row
      const { data } = await list()
      this.xl = data.list
      this.dialogFormVisible = true
    },
    async qd() {
      await update(this.form)
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped lang="less">

.item {
  margin-left: 150px;
}

.input {
  width: 250px;
}

.btn {
  color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
    margin-right: 5px;
}
</style>
