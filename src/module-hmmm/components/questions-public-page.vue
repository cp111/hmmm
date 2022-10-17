<template>
  <div>
    <div class="btn_wrapper">
      <span style="font-size: 12px; color: pink;">说明：目前支持学科和关键字条件筛选</span>
      <el-button type="success" @click="$router.push('/questions/new')" size="mini" icon="el-icon-edit">新增试题</el-button>
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
        <el-col :span="3" class="province">
          <el-form-item label="城市" prop="province">
            <el-select @change="getDirectory" style="width: 120%;" v-model="formData.province" size="small"
              placeholder="请选择">
              <el-option v-for="(item,index) in provincesList" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3" class="city">
          <el-form-item prop="city">
            <el-select v-model="formData.city" style="width: 80%; margin-left: 20%;" size="small" placeholder="请选择">
              <el-option v-for="(item,index) in citysList" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="btn">
          <el-button size="small" @click="clearBtn" type="defalt">清除</el-button>
          <el-button size="small" @click="searchBtn" type="primary">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 审核区 -->
    <el-tabs v-if="isShowChoice" v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="4"></el-tab-pane>
      <el-tab-pane v-for="(item,index) in chkTypeList" :key="index" :label="item.label" :name="item.value">
      </el-tab-pane>
    </el-tabs>
    <!-- 提示 -->
    <el-alert :title="`数据一共有${counts}条`" style="margin-bottom: 15px;" show-icon :closable="false" type="info" />
    <!-- 表格区 -->
    <el-table :data="questionList" style="width: 100%">
      <el-table-column prop="number" label="试题编号" width="120">
      </el-table-column>
      <el-table-column prop="subject" label="学科" width="180">
      </el-table-column>
      <el-table-column prop="catalog" label="目录" width="180">
      </el-table-column>
      <el-table-column label="题型" width="180">
        <template slot-scope="{row}">
          <span>{{ row.questionType === '1' ? '单选': row.questionType === '2' ? '多选' : '简答'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="题干" width="280">
        <template slot-scope="{row}">
          <span v-html="row.question"></span>
        </template>
      </el-table-column>
      <el-table-column prop="addDate" label="录入时间" width="180" :formatter="formatData">
      </el-table-column>
      <el-table-column label="难度" width="180">
        <template slot-scope="{row}">
          <span>{{ row.difficulty === '1' ? '简单': row.difficulty === '2' ? '一般' : '困难'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="creator" label="录入人" width="180" />
      <el-table-column v-if="isShowChoice" label="审核状态" width="180">
        <template slot-scope="{row}">
          <span>{{ row.chkState == '0' ? '待审核': row.chkState == '1' ? '通过' : '拒绝'}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="isShowChoice" prop="chkRemarks" label="审核意见" width="180" />
      <el-table-column v-if="isShowChoice" prop="chkUser" label="审核人" width="180" />
      <el-table-column v-if="isShowChoice" label="发布状态" width="180">
        <template slot-scope="{row}">
          <span>{{ row.publishState == '0' ? '待发布': row.publishState == '1' ? '已发布' : '已下架'}}</span>
        </template>
      </el-table-column>
      <!-- 精选题库 -->
      <el-table-column v-if="isShowChoice" fixed="right" label="操作" width="200">
        <template slot-scope="{row}">
          <el-button size="small" type="text" @click="previewQuestions(row)">预览</el-button>
          <el-button size="small" :disabled="row.chkState===1" @click="auditBtn(row)" type="text">审核</el-button>
          <el-button size="small" :disabled="row.publishState===1" type="text"
            @click="$router.push('/questions/new'+`?id=${row.id}`)">修改</el-button>
          <el-button size="small" type="text" @click="putawayBtn(row)">{{row.publishState===1?'下架':'上架'}}</el-button>
          <el-button size="small" type="text" :disabled="row.publishState===1" @click="delQuestions(row)">删除</el-button>
        </template>
      </el-table-column>
      <!-- 基础题库 -->
      <el-table-column v-else label="操作" width="180">
        <template slot-scope="{row}">
          <el-button plain size="small" @click="previewQuestions(row)" title="预览" type="primary" icon="el-icon-view"
            circle></el-button>
          <el-button plain size="small" @click="$router.push('/questions/new'+`?id=${row.id}`)" title="修改"
            type="success" icon="el-icon-edit" circle></el-button>
          <el-button plain size="small" @click="delQuestions(row)" title="删除" type="danger" icon="el-icon-delete"
            circle></el-button>
          <el-button plain size="small" @click="addChoiceness(row)" title="加入精选" type="warning" icon="el-icon-check"
            circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 学科简单列表
import { simple } from '@/api/hmmm/subjects.js'
import { directorySimple } from '@/api/hmmm/directorys.js'
import { simple as getCreator } from '@/api/base/users.js'
import { provinces, citys } from '@/api/hmmm/citys.js'
import { remove as removeQuestion, choiceAdd, list, choicePublish } from '@/api/hmmm/questions.js'
import { questionType, difficulty, direction, chkType } from '@/api/hmmm/constants'
import moment from 'moment'
export default {
  props: {
    questionList: {
      type: Array,
      required: true
    },
    counts: {
      type: Number
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    isShowChoice: {
      type: Boolean,
      default: false
    },
    checkDialogVisible: {
      type: Boolean,
      default: false
    }
  },
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
      activeName: '4',
      subjectSimpleList: [],
      directorySimpleList: [],
      creatorList: [],
      provincesList: [],
      citysList: [],
      questionTypeList: [],
      difficultyList: [],
      directionList: [],
      chkTypeList: []
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
      this.chkTypeList = chkType
    },
    // 下拉框改变，获取二级目录,二级城市
    async getDirectory() {
      this.citysList = await citys(this.formData.province)
      const { data } = await directorySimple(this.formData.subjectID)
      this.directorySimpleList = data
    },
    clearBtn() {
      this.$refs.form.resetFields()
    },
    async searchBtn() {
      if (this.formData.subjectID === '' && this.formData.keyword === '') return
      const obj = {}
      if (this.formData.subjectID !== '') {
        obj.subjectID = this.formData.subjectID
      }
      if (this.formData.keyword !== '') {
        obj.keyword = this.formData.keyword
      }
      const { data } = await list(obj)
      console.log(data)
      this.$emit('update:questionList', data.items)
    },
    // 格式化时间
    formatData(row, column, cellValue) {
      return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
    },
    // 点击预览试题
    previewQuestions(row) {
      this.$emit('previewQuestions', row)
      this.$emit('update:dialogVisible', true)
    },
    // 删除
    async delQuestions(row) {
      try {
        await this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
          type: 'warning'
        })
        await removeQuestion(row)
        this.$message.success('删除成功!')
        this.$emit('updataQuestions')
      } catch (err) {
        console.log(err)
      }
    },
    // 加入精选
    async addChoiceness(row) {
      row.choiceState = 1
      try {
        await this.$confirm('此操作将该题目加入精选, 是否继续?', '提示', {
          type: 'info'
        })
        await choiceAdd(row)
        this.$emit('updataQuestions')
        this.$message.success('加入成功!')
      } catch (err) {
        console.log(err)
      }
    },
    // 审核切换
    handleClick() {
      this.$emit('updataList', this.activeName)
    },
    // 上架
    async putawayBtn(row) {
      try {
        await this.$confirm(`您确认${row.publishState === 1 ? '下架' : '上架'}这条题目吗?`, '提示', {
          type: 'warning'
        })
        row.publishState === 0 ? row.publishState = 1 : row.publishState = 0
        await choicePublish(row)
        this.$message.success(`${row.publishState === 0 ? '下架成功!' : '上架成功'}`)
        this.$emit('updataQuestions')
      } catch (err) {
        throw Error
      }
    },
    // 审核
    auditBtn(row) {
      this.$emit('update:checkDialogVisible', true)
      this.$emit('audit', row)
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

::v-deep .city {
  .el-form-item__content {
    margin-left: 0 !important;
  }
}

::v-deep .el-table th {
  background-color: #fafafa;

  .is-leaf {
    border-bottom: 2px solid #e8e8e8;
  }

}
</style>
