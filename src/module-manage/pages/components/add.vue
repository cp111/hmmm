<template>
  <!-- Form -->
  <span>

    <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-edit" class="add">新增用户</el-button>

    <el-dialog title="创建用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item  prop="username" class="item" label="用户名" :label-width="formLabelWidth">
          <el-input class="input" v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item  prop="email" class="item" label="邮箱" :label-width="formLabelWidth">
          <el-input class="input" v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item  prop="password" class="item" label="密码" :label-width="formLabelWidth">
          <el-input class="input" v-model="form.password" autocomplete="off"></el-input>
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
        <el-button @click="qx">取 消</el-button>
        <el-button type="primary" @click="qr">确 定</el-button>
      </div>
    </el-dialog>
  </span>

</template>

<script>
import { add } from '../../../api/base/users'
import { list } from '../../../api/base/permissions'
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
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        password: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
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
  async created() {
    const { data } = await list()
    console.log(data)
    this.xl = data.list
    console.log(this.xl)
  },
  methods: {
    async qr() {
      await add(this.form)
      this.$emit('zdsx')
      this.dialogFormVisible = false
      this.form = {}
    },
    qx() {
      this.dialogFormVisible = false
      this.form = {}
    }
  }
}
</script>

<style scoped lang="less">
.add {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
  margin-left: 651px;
}

.item {
  margin-left: 150px;
}

.input {
  width: 250px;
}
</style>
