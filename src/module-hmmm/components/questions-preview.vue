<template>
  <div class='container'>
    <el-dialog title="题目预览" :visible.sync="dialogVisible" :before-close="handleClose" width="900px">
      <el-row>
        <el-col :span="6">【题型】：{{ currentQuestions.questionType === '1' ? '单选': currentQuestions.questionType === '2' ?
        '多选' : '简答'}}</el-col>
        <el-col :span="6">【编号】：{{currentQuestions.id}}</el-col>
        <el-col :span="6">【难度】：{{ currentQuestions.difficulty === '1' ? '简单': currentQuestions.difficulty === '2' ? '一般'
        : '困难'}}</el-col>
        <el-col :span="6">【标签】：{{currentQuestions.tags}}</el-col>
        <el-col :span="6">【学科】：{{currentQuestions.subjectName}}</el-col>
        <el-col :span="6">【目录】：{{currentCatalog}}</el-col>
        <el-col :span="6">【方向】：{{currentQuestions.direction}}</el-col>
      </el-row>
      <hr>
      <div>【题干】：</div>
      <div>
        <p style="color: blue;" v-html="currentQuestions.question"></p>
      </div>
      <div v-if="currentQuestions.questionType !== '1' && currentQuestions.questionType !== '2'"></div>
      <div v-else>
        <p>{{ currentQuestions.questionType === '1' ? '单选': currentQuestions.questionType === '2' ? '多选' : '简答'}}题
          选项：（以下选中的选项为正确答案）</p>
          <div v-for="item in currentQuestions.options" :key="item.id" style="padding: 8px 0px;">
            <el-radio v-if="currentQuestions.questionType === '1'"  :value="1" :label="item.isRight">{{item.title}}</el-radio>
            <el-checkbox-group v-else-if="currentQuestions.questionType === '2'"  v-model="checkList">
              <el-checkbox :label="item.id">{{item.title}}</el-checkbox >
              </el-checkbox-group>
          </div>
      </div>
      <hr>
      【参考答案】：<el-button @click="videoBtn" size="small" type="danger">视频答案预览</el-button>
      <video class="video" v-show="isVideo" :src="currentQuestions.videoURL" controls muted></video>
      <hr>
      <el-row>
        <el-col :span="24">【答案解析】：<span v-html="currentQuestions.answer"></span></el-col>
      </el-row>
      <hr>
      <el-row>
        <el-col :span="24">【题目备注】：<span v-html="currentQuestions.remarks"></span></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    currentQuestions: {
      type: Object,
      required: true
    },
    currentCatalog: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isVideo: false
    }
  },
  computed: {
    checkList() {
      const arr = this.currentQuestions.options.reduce((newArr, item) => {
        if (item.isRight === 1) {
          newArr.push(item.id)
        }
        return newArr
      }, [])
      return arr
    }
  },
  methods: {
    handleClose() {
      this.isVideo = false
      this.$emit('update:dialogVisible', false)
    },
    videoBtn() {
      this.isVideo = true
    }
  }
}
</script>

<style scoped lang='less'>
.el-col-6 {
  padding: 10px 0;
}
.video{
  display: block;
}
</style>
