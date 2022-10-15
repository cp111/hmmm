<template>
  <el-card>
    <div class="btn_wrapper">
      <span style="font-size: 12px; color: pink;">说明：目前支持学科和关键字条件筛选</span>
      <el-button type="success" size="mini" icon="el-icon-edit">新增试题</el-button>
    </div>
    <el-form ref="form" :model="formData" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="学科" prop="subjectID">
            <el-select v-model="formData.subjectID" @change="getDirectory" size="small" style="width: 100%"
              placeholder="请选择">
              <el-option v-for="(item,index) in subjectSimpleList" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="二级目录" prop="catalogID">
            <el-select v-model="formData.catalogID" style="width: 100%" size="small" placeholder="请选择">
              <el-option v-for="(item,index) in directorySimpleList" :key="index" :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="标签" prop="tags">
            <el-select v-model="formData.tags" style="width: 100%" size="small" placeholder="请选择">
              <!-- <el-option label=""></el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="关键字" prop="keyword">
            <el-input v-model="formData.keyword" size="small" placeholder="根据题干搜索"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="试题类型" prop="questionType">
            <el-select style="width: 100%" v-model="formData.questionType" size="small" placeholder="请选择">
              <el-option v-for="(item,index) in questionTypeList" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="难度" prop="difficulty">
            <el-select style="width: 100%" v-model="formData.difficulty" size="small" placeholder="请选择">
              <el-option v-for="(item,index) in difficultyList" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="方向" prop="direction">
            <el-select v-model="formData.direction" style="width: 100%" size="small" placeholder="请选择">
              <el-option v-for="(item,index) in directionList" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="录入人" prop="creatorID">
            <el-select v-model="formData.creatorID" style="width: 100%" size="small" placeholder="请选择">
              <el-option v-for="item in creatorList" :key="item.id" :label="item.username" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="题目备注" prop="remarks">
            <el-input v-model="formData.remarks" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="企业简称" prop="shortName">
            <el-input v-model="formData.shortName" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="city">
          <el-form-item label="城市" prop="province" >
            <el-select @change="getDirectory" v-model="formData.province" size="small" placeholder="请选择">
              <el-option v-for="(item,index) in provincesList" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="city">
            <el-select v-model="formData.city" size="small" placeholder="请选择">
              <el-option v-for="(item,index) in citysList" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="btn">
          <el-button size="small" @click="clearBtn" type="defalt">清除</el-button>
          <el-button size="small" type="primary">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 提示 -->
    <el-alert title="数据一共有条" type="info" show-icon />
  </el-card>
</template>

<script>
// 学科简单列表
import { simple } from '@/api/hmmm/subjects.js'
import { directorySimple } from '@/api/hmmm/directorys.js'
import { simple as getCreator } from '@/api/base/users.js'
import { provinces, citys } from '@/api/hmmm/citys.js'
import { questionType, difficulty, direction } from '@/api/hmmm/constants'
export default {
  data() {
    return {
      formData: {
        subjectID: '', // 学科
        catalogID: '', // 二级目录
        tags: '', // 标签
        keyword: '', // 关键字
        questionType: '', // 试题类型
        difficulty: '', // 难度
        direction: '', // 方向
        creatorID: '', // 录入人
        remarks: '', // 题目备注
        shortName: '', // 企业简称
        province: '', // 企业所在地省份
        city: '' // 企业所在城市
      },
      subjectSimpleList: [],
      directorySimpleList: [],
      creatorList: [],
      provincesList: [],
      citysList: [],
      questionTypeList: [],
      difficultyList: [],
      directionList: []
    }
  },
  created() {
    this.getSubjectSimpleList()
  },
  methods: {
    async getSubjectSimpleList() {
      const { data } = await simple()
      this.subjectSimpleList = data
      const res = await getCreator()
      this.creatorList = res.data
      this.provincesList = provinces()
      this.questionTypeList = questionType
      this.difficultyList = difficulty
      this.directionList = direction
    },
    // 下拉框改变，获取二级目录,二级城市
    async getDirectory() {
      this.citysList = await citys(this.formData.province)
      const { data } = await directorySimple(this.formData.subjectID)
      this.directorySimpleList = data
    },
    clearBtn() {
      // this.formData = {}
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.btn_wrapper {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;

  ::v-deep .el-button--mini {
    padding: 9px 15px;
  }
}

::v-deep .el-form-item {
  margin-bottom: 18px;
}

.btn {
  display: flex;
  justify-content: end;
}

.city {
  display: flex;
  justify-content: space-around;
  // flex: 1;
}
</style>
