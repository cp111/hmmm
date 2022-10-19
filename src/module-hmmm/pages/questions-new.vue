<template>
  <div class="container">
    <div>
      <el-card shadow="always">
        <div class="el-card__header">
          试题录入
        </div>
        <div class="el-card__body">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item prop="subjectID" label="学科：">
              <el-select v-model="form.subjectID" placeholder="请选择" style="width: 400px" @change="simple1List(form.subjectID)">
                <el-option v-for="item in subject" :key="item.value" :label="item.label" :value="item.value" />
                <!-- <el-option label="区域一" value="shanghai" /> -->
              </el-select>
            </el-form-item>
            <el-form-item prop="catalogID" label="目录：">
              <el-select v-model="form.catalogID" placeholder="请选择" style="width: 400px">
                <el-option v-for="(item,index) in simpleList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item prop="enterpriseID" label="企业：">
              <el-select v-model="form.enterpriseID" placeholder="请选择" style="width: 400px">
                <el-option v-for="item in company" :key="item.id" :label="item.company" :value="item.id" />
                <!-- <el-option label="区域二" value="beijing" /> -->
              </el-select>
            </el-form-item>
            <el-form-item label="城市：" required style="height: 36px">
              <el-col :span="11">
                <el-form-item prop="city">
                  <el-select v-model="form.province" placeholder="请选择" style="width: 198px;" @change="cityArea">
                    <el-option v-for="(item,index) in provinces" :key="index" :label="item" :value="item" />
                    <!-- <el-option label="区域二" value="beijing" /> -->
                  </el-select>
                  <el-select v-model="form.city" placeholder="请选择" style="width: 198px">
                    <el-option v-for="(item,index) in city" :key="index" :label="item" :value="item" />
                    <!-- <el-option label="区域二" value="beijing" /> -->
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item prop="direction" label="方向:">
              <el-select v-model="form.direction" placeholder="请选择" style="width: 400px">
                <el-option v-for="(item,index) in direction" :key="index" :label="item" :value="item" />
                <!-- <el-option label="区域二" value="beijing" /> -->
              </el-select>
            </el-form-item>
            <el-form-item prop="questionType" label="题型">
              <el-radio-group v-model="form.questionType">
                <!-- 格式化映射表，题型是v-for循环出来的，value获取的值是123，显示label，单选多选简答 -->
                <el-radio v-for="item in questionType" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="difficulty" label="难度">
              <!-- 跟题型是一样的做法 -->
              <el-radio-group v-model="form.difficulty">
                <el-radio
                  v-for="radios in difficulty"
                  :key="radios.value"
                  :label="radios.value"
                >
                  {{ radios.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="question" label="题干:">
              <quill-editor
                ref="QuillEditor"
                v-model="form.question"
                style="height: 200px; margin-bottom: 50px"
              />
            </el-form-item>
            <el-form-item label="选项：">
              <el-row v-for="(item,index) in form.options" :key="index">
                <el-col v-if="form.questionType === 1" style="display: flex; line-height: 36px; align-items: center; padding-bottom: 20px">
                  <el-radio-group v-model="radio">
                    <el-radio :label="index" style="margin-right: 5px">
                      {{ form.options[index].code }}
                    </el-radio>
                  </el-radio-group>
                  <el-input v-model="item.title" style="width:240px" />
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                  >
                    <img v-if="imageUrl" :src="imageUrl" style=" width: 100px; height:60px;">
                    <i class="el-icon-circle-close" />
                    <span class="text">上传图片</span>
                  </el-upload>
                </el-col>
              </el-row>
              <el-row v-for="(item,index) in form.options" :key="index">
                <el-col v-if="form.questionType === 2" style="display: flex; line-height: 36px; align-items: center; padding-bottom: 20px">
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox :label="index" style="margin-right: 5px">
                      {{ item.code }}
                    </el-checkbox>
                  </el-checkbox-group>
                  <el-input v-model="item.title" style="width:240px" />
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                  >

                    <img
                      v-if="imageUrl"
                      :src="imageUrl"
                      style=" width: 100px; height:60px;"
                    >
                    <i class="el-icon-circle-close" />
                    <span class="text">上传图片</span>
                  </el-upload>
                </el-col>
              </el-row>
              <el-row v-for="(item,index) in form.options" :key="index">
                <el-col v-if="form.questionType === 3" />
              </el-row>
            </el-form-item>
            <el-form-item label="解析视频:">
              <el-input v-model="form.videoURL" style="width: 400px" />
            </el-form-item>
            <el-form-item prop="answer" label="答案解析:">
              <quill-editor
                ref="QuillEditor"
                v-model="form.answer"
                style="height: 200px; margin-bottom: 50px"
              />
            </el-form-item>
            <el-form-item label="题目备注:" prop="remarks">
              <el-input v-model="form.remarks" type="textarea" style="width: 400px;" />
            </el-form-item>
            <el-form-item label="试题标签：">
              <el-select
                v-model="form.tags"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择试题标签"
                style="width: 400px"
              >
                <el-option v-for="item in tagsList" :key="item.id" :label="item.subjectName" :value="item.tagName" />
                <!-- <el-option label="区域二" value="beijing" /> -->
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确认提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
// const oldProcedure = this.$refs.child.getVal()
// this.form.content = oldProcedure
import { simple } from '@/api/hmmm/subjects'
import { list } from '@/api/hmmm/companys'
import { provinces, citys } from '@/api/hmmm/citys'
import { direction, questionType, difficulty } from '@/api/hmmm/constants'
import { directorySimple as simple1 } from '@/api/hmmm/directorys'
import { add, update, detail } from '@/api/hmmm/questions'
import { list as list2 } from '@/api/hmmm/tags'
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: true,
      tagsList: [],
      checkList: [],
      subject: [],
      provinces: provinces(),
      city: '',
      company: [],
      questionType,
      difficulty,
      direction: direction,
      simpleList: [],
      id: this.$route.query.id,
      form: {
        province: '',
        tags: '',
        videoURL: '',
        name: '',
        catalogID: '', // 目录
        subjectID: '', // 学科
        enterpriseID: '', // 企业
        city1: '', // 城市
        city: '',
        direction: '', // 方向
        questionType: 1, // 题型
        difficulty: 1, // 难度
        answer: '', // 题干
        question: '', // 答案解析
        remarks: '',
        options: [{ code: 'A', img: '', isRight: true, title: '' }, { code: 'B', img: '', isRight: false, title: '' }, { code: 'C', img: '', isRight: false, title: '' }, { code: 'D', img: '', isRight: false, title: '' }]
        // isshow: false
      },
      res: {},
      rules: {
        subjectID: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        catalogID: [
          { required: true, message: '请输入活动名称', trigger: 'change' }
        ],
        enterpriseID: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        direction: [
          { required: true, message: '请输入活动名称', trigger: 'change' }
        ],
        questionType: [
          { required: true, message: '请输入活动名称', trigger: 'change' }
        ],
        difficulty: [
          { required: true, message: '请输入活动名称', trigger: 'change' }
        ],
        theme: [
          { required: true, message: '请输入题干', trigger: 'blur' }
        ],
        answer: [
          { required: true, message: '请输入题干', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    checkList: {
      handler(index) {
        this.form.options[index].isRight = true
      }
    },
    radio: {
      handler(index) {
        this.form.options.forEach(item => {
          item.isRight = false
        })
        this.form.options[index].isRight = true
      }
    }
  },
  created() {
    this.subjectList()
    this.companylist()
    if (this.id) {
      // console.log(+this.id)
      this.res = this.getQuestionDetail({
        id: +this.id
      })
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 获取学科列表
    async subjectList() {
      const { data } = await simple()
      this.subject = data
      // console.log(this.subject)
    },
    // 获取企业列表
    async companylist() {
      const { data } = await list()
      // console.log(data)
      this.company = data.items
      // console.log(this.company)
    },
    //  二级目录
    async simple1List() {
      const { data } = await simple1(this.form.subjectID)
      const res = await list2()
      this.tagsList = res.data.items
      // console.log(this.form.subjectID)
      // console.log(data)
      this.simpleList = data
    },
    cityArea() {
      this.city = citys(this.form.province)
      // console.log(this.provinces)
      // console.log(this.city)
    },
    async onSubmit() {
      try {
        if (this.id) {
          // console.log(11111)
          await update({
            id: +this.id,
            province: this.form.province,
            tags: this.form.tags.toString(),
            videoURL: this.form.videoURL,
            catalogID: +this.form.catalogID, // 目录
            subjectID: this.form.subjectID, // 学科
            enterpriseID: this.form.enterpriseID, // 企业
            city: this.form.city,
            direction: this.form.direction, // 方向
            questionType: this.form.questionType.toString(), // 题型
            difficulty: this.form.difficulty.toString(), // 难度
            answer: this.form.answer, // 题干
            question: this.form.question, // 答案解析
            remarks: this.form.remarks,
            options: this.form.options
          })
        }
        // this.form.questionType = this.form.questionType.toString()
        await add({
          province: this.form.province,
          tags: this.form.tags.toString(),
          videoURL: this.form.videoURL,
          catalogID: +this.form.catalogID, // 目录
          subjectID: this.form.subjectID, // 学科
          enterpriseID: this.form.enterpriseID, // 企业
          city: this.form.city,
          direction: this.form.direction, // 方向
          questionType: this.form.questionType.toString(), // 题型
          difficulty: this.form.difficulty.toString(), // 难度
          answer: this.form.answer, // 题干
          question: this.form.question, // 答案解析
          remarks: this.form.remarks,
          options: this.form.options
        })
        this.$message.success('提交成功')
        this.$router.push('/questions/list')
      } catch (error) {
        this.$message.error(error)
      }
    },
    async getQuestionDetail() {
      const { data } = await detail({ id: +this.id })
      console.log(data)
      data.difficulty = +data.difficulty
      data.questionType = +data.questionType
      this.form = data
    }
  }
}
</script>

<style scoped lang='less'>
.container{
  padding: 20px;
 /deep/.el-card__body {
  padding: unset;
 }
 .el-card__header {
  padding: 18px 20px;
  font-size: 14px;
 }
 .el-card__body {
  padding: 20px;
  .el-form-item {
    margin-bottom: 22px;
    /deep/.el-upload {
      background-color: #fff;
      margin-left: 4px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    width: 100px;
    height: 60px;
    line-height: 60px;
    .text {
      display: inline-block;
      font-size: 14px;
    }
    .el-icon-circle-close {
      position: absolute;
    right: 0;
    top: 0;
    -webkit-transform: translate(50%,-50%);
    transform: translate(50%,-50%);
    background: #fff;
    font-size: 18px;
    color: #999;
    }
}
    /deep/.el-textarea__inner {
      height: 96px !important;
    }
}
 }
}
</style>
