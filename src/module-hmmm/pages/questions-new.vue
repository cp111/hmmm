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
              <el-select v-model="form.subjectID" placeholder="请选择" style="width: 400px" @change="simple1List">
                <el-option v-for="item in subject" :key="item.value" :label="item.label" :value="item.value" />
                <!-- <el-option label="区域一" value="shanghai" /> -->
              </el-select>
            </el-form-item>
            <el-form-item prop="directory" label="目录：">
              <el-select v-model="form.directory" placeholder="请选择" style="width: 400px">
                <el-option v-for="(item,index) in simpleList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item prop="company" label="企业：">
              <el-select v-model="form.company" placeholder="请选择" style="width: 400px">
                <el-option v-for="item in company" :key="item.id" :label="item.company" :value="item.shortName" />
                <!-- <el-option label="区域二" value="beijing" /> -->
              </el-select>
            </el-form-item>
            <el-form-item label="城市：" required style="height: 36px">
              <el-col :span="11">
                <el-form-item prop="city1">
                  <el-select v-model="form.provinces" placeholder="请选择" style="width: 198px;" @change="cityArea">
                    <el-option v-for="(item,index) in provinces" :key="index" :label="item" :value="item" />
                    <!-- <el-option label="区域二" value="beijing" /> -->
                  </el-select>
                  <el-select v-model="form.city2" placeholder="请选择" style="width: 198px">
                    <el-option v-for="(item,index) in city" :key="index" :label="item" :value="item" />
                    <!-- <el-option label="区域二" value="beijing" /> -->
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item prop="orientation" label="方向:">
              <el-select v-model="form.orientation" placeholder="请选择" style="width: 400px">
                <el-option v-for="(item,index) in direction" :key="index" :label="item" :value="item" />
                <!-- <el-option label="区域二" value="beijing" /> -->
              </el-select>
            </el-form-item>
            <el-form-item prop="topic" label="题型">
              <el-radio-group v-model="form.topic">
                <el-radio label="单选" />
                <el-radio label="多选" />
                <el-radio label="简答" />
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="difficulty" label="难度">
              <el-radio-group v-model="form.difficulty">
                <el-radio label="简单" />
                <el-radio label="一般" />
                <el-radio label="困难" />
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="theme" label="题干:">
              <quill-editor
                ref="QuillEditor"
                v-model="form.theme"
                style="height: 200px; margin-bottom: 50px"
              />
              <!-- <richtext v-model="form.theme" style="height: 200px; margin-bottom: 50px" /> -->
            </el-form-item>
            <el-form-item label="选项：">
              <el-radio-group v-model="form.resource" style="display: flex; line-height: 36px; align-items: center; padding-bottom: 20px">
                <el-radio label="A:" style="margin-right: 5px" />
                <el-input v-model="form.name" style="width: 240px" />
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                >
                  <i class="el-icon-circle-close" />
                  <span class="text">上传图片</span>
                </el-upload>
              </el-radio-group>
              <el-radio-group v-model="form.resource" style="display: flex; line-height: 36px; align-items: center; padding-bottom: 20px">
                <el-radio label="B:" style="margin-right: 5px" />
                <el-input v-model="form.name" style="width: 240px" />
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                >
                  <i class="el-icon-circle-close" />
                  <span class="text">上传图片</span>
                </el-upload>
              </el-radio-group>
              <el-radio-group v-model="form.resource" style="display: flex; line-height: 36px; align-items: center; padding-bottom: 20px">
                <el-radio label="C:" style="margin-right: 5px" />
                <el-input v-model="form.name" style="width: 240px" />
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                >
                  <i class="el-icon-circle-close" />
                  <span class="text">上传图片</span>
                </el-upload>
              </el-radio-group>
              <el-radio-group v-model="form.resource" style="display: flex; line-height: 36px; align-items: center; padding-bottom: 20px">
                <el-radio label="D:" style="margin-right: 5px" />
                <el-input v-model="form.name" style="width: 240px" />
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                >
                  <i class="el-icon-circle-close" />
                  <span class="text">上传图片</span>
                </el-upload>
              </el-radio-group>
              <el-button
                type="danger"
                disabled
                style="padding: 9px 15px; font-size: 12px;
                      border-radius: 3px;"
              >+增加选项与答案</el-button>
            </el-form-item>
            <el-form-item label="解析视频:">
              <el-input v-model="form.name" style="width: 400px" />
            </el-form-item>
            <el-form-item prop="answer" label="答案解析:">
              <richtext v-model="form.answer" style="height: 200px; margin-bottom: 50px" />
            </el-form-item>
            <el-form-item label="题目备注:">
              <el-input v-model="form.desc" type="textarea" style="width: 400px;" />
            </el-form-item>
            <el-form-item label="试题标签：">
              <el-select v-model="form.region" placeholder="请选择试题标签" style="width: 400px">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
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
import richtext from '../components/richtext'
import { simple } from '@/api/hmmm/subjects'
import { list } from '@/api/hmmm/companys'
import { provinces, citys } from '@/api/hmmm/citys'
import { direction } from '@/api/hmmm/constants'
import { simple1 } from '@/api/hmmm/directorys'
export default {
  components: {
    richtext
  },
  data() {
    return {
      subject: [],
      provinces: provinces(),
      city: '',
      company: [],
      direction: direction,
      simpleList: [],
      form: {
        name: '',
        directory: '', // 目录
        subjectID: '', // 学科
        company: '', // 企业
        city1: '', // 城市
        city2: '',
        orientation: '', // 方向
        date1: '',
        date2: '',
        topic: '单选', // 题型
        difficulty: '简单', // 难度
        theme: '', // 题干
        answer: '', // 答案解析
        delivery: false,
        type: '',
        resource: '',
        desc: ''
        // isshow: false
      },
      rules: {
        subject: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        directory: [
          { required: true, message: '请输入活动名称', trigger: 'change' }
        ],
        company: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        orientation: [
          { required: true, message: '请输入活动名称', trigger: 'change' }
        ],
        topic: [
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
    provinces: {

    }
  },
  created() {
    this.subjectList()
    this.companylist()
  },
  methods: {
    onSubmit() {
      // console.log('submit!')
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
      // console.log(this.form.subjectID)
      // console.log(data)
      this.simpleList = data
    },
    // 城市二级
    cityArea() {
      this.city = citys(this.form.provinces)
      // console.log(this.provinces)
      // console.log(this.city)
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
