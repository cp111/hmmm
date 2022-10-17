<template>
  <el-dialog title="题目审核" :visible="checkDialogVisible" @close="onClose" width="20%">
    <el-form :model="checkData">
      <el-form-item>
        <el-radio v-model="checkData.chkState" :label="1">通过</el-radio>
        <el-radio v-model="checkData.chkState" :label="2">拒绝</el-radio>
      </el-form-item>
      <el-form-item>
        <el-input type="textarea" placeholder="请输入审核意见" v-model="checkData.chkRemarks">
        </el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { choiceCheck } from '@/api/hmmm/questions'
export default {
  props: {
    checkDialogVisible: {
      type: Boolean,
      required: true
    },
    currentAudit: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      checkData: {
        chkState: 1,
        chkRemarks: ''
      }
    }
  },
  methods: {
    onClose() {
      this.$emit('update:checkDialogVisible', false)
    },
    // 提交
    async submit() {
      if (this.checkData.chkRemarks === '') {
        return this.$message({
          message: '请输入审核意见',
          type: 'warning'
        })
      }
      this.checkData.id = this.currentAudit.id
      console.log(this.checkData)
      try {
        await choiceCheck(this.checkData)
        this.$message.success('操作成功')
        this.$parent.getBaseList()
        this.onClose()
      } catch (error) {
        this.$message.error('操作失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.dialog-footer {
  display: flex;
  justify-content: center;
}

.el-form-item {
  margin-bottom: 18px;
}
</style>
