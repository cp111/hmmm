<template>
  <div class="container">
    <div class="app-main" style="min-height: 100%;">
      <div class="question-container">
        <el-card shadow="always">
          <el-row type="flex" justify="end">
            <el-col :span="6">
              <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="关键字">
                  <el-input v-model="form.name" placeholder="根据编号搜索" />
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light" /></el-col>
            <el-col class="rightheader" style="text-align: right;">
              <el-row>
                <el-button size="small" class="remove" @click="remove">清除</el-button>
                <el-button size="small" type="primary" class="search" @click="searchFn">搜索</el-button>
              </el-row>

            </el-col>
          </el-row>
          <div class="message">
            <el-alert
              style="height:35px;"
              class="el-icon-info"
              :title="`数据一共${total}条`"
              type="info"
            />
          </div>

          <!----------------------- 表格 ------------------------->
          <div>
            <el-table
              :data="tableData"
              style="width: 100%;"
              :header-cell-style="{background:'#fafafa'}"
            >
              <el-table-column
                label="编号"
                width="220"
              >
                <template slot-scope="{row}">
                  <span style="margin-left: 10px">{{ row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="题型"
                width="80"
                :formatter="formatTypeFn"
                prop="questionType"
              >
              <!-- 题型使用组件的格式化函数 -->
                <!-- <template slot-scope="{row}">
                  <span style="margin-left: 10px">{{ row.questionType }}</span>
                </template> -->
              </el-table-column>
              <el-table-column
                label="题目编号"
                width="220"
              >
                <!-- 题目编号使用v-for循环得到 -->
                <template slot-scope="{row}">
                  <div v-for=" (item,index) in row.questionIDs" :key="index" style="margin-left: 10px; color: rgb(0,153,255)" @click="getQuestionId(item.id)">
                    <a href="" @click.prevent="isshow">{{ item.number }}</a>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="录入时间"
                width="180"
              >
                <template slot-scope="{row}">
                  <span style="margin-left: 10px">{{ row.addTime }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="答题时间"
                width="293"
              >
                <template slot-scope="{row}">
                  <span style="margin-left: 10px">{{ row.totalSeconds }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="正确率（%)"
                width="293"
              >
                <template slot-scope="{row}">
                  <span style="margin-left: 10px">{{ row.accuracyRate }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="录入人"
                width="293"
              >
                <template slot-scope="{row}">
                  <span style="margin-left: 10px">{{ row.userName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template slot-scope="{row}">
                  <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(row)" />

                </template>
              </el-table-column>
            </el-table>
            <!-- -----------------------------分页器----------------------- -->
            <div class="block">
              <el-pagination
                background
                :total="+total"
                :current-page.sync="page.page"
                :page-sizes="[20, 30, 50, 100]"
                :page-size.sync="page.pagesize"
                layout=" prev, pager, next,sizes, jumper"
                @size-change="randomsList"
                @current-change="randomsList"
              />
            </div>
            <!-- ---------------------弹窗--------------------------- -->
            <el-dialog
              title="题目预览"
              :visible.sync="dialogVisible"
              width="900px"
              @open="onOpen"
            >
              <div class="bodydetial">
                <el-row>
                  <el-col :span="6">
                    【题型】：{{ questionDetial.questionType === '1' ? '单选' : questionDetial.questionType === '2' ? '多选' : '简答题' }}
                  </el-col>
                  <el-col :span="6">
                    【编号】：{{ questionDetial.id }}
                  </el-col>
                  <el-col :span="6">
                    【难度】：{{ questionDetial.difficulty === '1' ? '简单' : questionDetial.difficulty === '2' ? '一般' : '困难' }}
                  </el-col>
                  <el-col :span="6">
                    【标签】：{{ questionDetial.tags }}
                  </el-col>
                  <el-col :span="6">
                    【学科】：{{ questionDetial.subjectName }}
                  </el-col>
                  <el-col :span="6">
                    【目录】：{{ questionDetial.directoryName }}
                  </el-col>
                  <el-col :span="6">
                    【方向】：{{ questionDetial.direction }}
                  </el-col>
                </el-row>
                <hr>
                【题干】：
                <div v-if="questionDetial.questionType === '1'">
                  <div style="color: blue;">
                    <p>{{ questionDetial.question }}</p>
                  </div>
                  <div>
                    <div style="padding: 8px 0px;">
                      单选题 选项：（以下选中的选项为正确答案）
                      <el-radio-group :value="radio">
                        <!-- <el-radio v-for="item in questionDetial.options" :key="item.id" :label="item.code">{{ item.title }}</el-radio> -->
                        <el-radio v-for="item in questionDetial.options" :key="item.id" :label="item.isRight">{{ item.title }}</el-radio>
                      </el-radio-group>
                    </div>
                  </div>
                </div>
                <div v-else-if="questionDetial.questionType === '2'">
                  <div style="color: blue;">
                    <p>{{ questionDetial.question }}</p>
                  </div>
                  <div>
                    <div style="padding: 8px 0px;">
                      多选题 选项：（以下选中的选项为正确答案）
                      <eel-checkbox-group v-model="check">
                        <el-checkbox v-for="item in questionDetial.options" :key="item.id" :checked="item.isRight === 1">{{ item.title }}</el-checkbox>
                      </eel-checkbox-group>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div style="color: blue;">
                    <p>{{ questionDetial.question }}</p>
                  </div>
                  <div>
                    <div style="padding: 8px 0px;">
                      多选题 选项：（以下选中的选项为正确答案）
                      <el-radio-group v-model="radio">
                        <!-- <el-radio v-for="item in questionDetial.options" :key="item.id" :label="item.code">{{ item.title }}</el-radio> -->
                        <el-radio v-for="item in questionDetial.options" :key="item.id">{{ item.title }}</el-radio>
                      </el-radio-group>
                    </div>
                  </div>
                </div>
                <hr>
                <el-row>【参考答案】：<el-button type="danger" @click="showVideo = true">视频答案预览</el-button></el-row>
                <video v-if="showVideo" controls="controls" :src="questionDetial.videoURL" style="width:400px; height:300px" />
                <hr>
                <el-row style="margin-top: 20px; margin-bottom: 20px">【答案解析】：<div v-html="questionDetial.answer" /></el-row>
                <hr>
                <el-row style="margin-top: 20px; margin-bottom: 20px"> 【题目备注】：{{ questionDetial.tags }}</el-row>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
              </span>
            </el-dialog>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { detail } from '@/api/hmmm/questions'
/* 题型格式化内容的引入 */
import { questionType } from '@/api/hmmm/constants'
import { randoms, removeRandoms } from '@/api/hmmm/questions'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: ''
      },
      total: '',
      tableData: [],
      page: {
        page: 1,
        pagesize: 20
      },
      questionType: questionType,
      questionDetial: '',
      radio: 1, // 1代表正确答案
      showVideo: false
    }
  },
  computed: {
    check: {
      get() {
        // 计算属性判断，如果options没有就返回一个空数组，通过reduce筛选出options每一项，判断isRight = 1，等于1的就把options那一项的id追加到数组里面，再循环标签里面绑定每一项的id，让他默认选中
        if (!this.questionDetial.options) { return [] }
        return this.questionDetial.options.reduce((acc, item) => {
          if (item.isRight === 1) {
            acc.push(item.id)
          }
          return acc
        }, [])
      },
      set() {}
    }
  },
  created() {
    this.randomsList()
  },
  methods: {
    isshow() {
      this.dialogVisible = true
    },
    async randomsList() {
      const { data } = await randoms(this.page)
      // console.log(data)
      // 解构数据
      const { items, counts } = data
      this.tableData = items
      // console.log(this.tableData)
      this.total = counts
    },
    // 题型格式化
    formatTypeFn(row, column, cellValue, index) {
      // console.log(this.questionType)
      // console.log(cellValue)
      const obj = this.questionType.find(item => item.value === +cellValue)
      // console.log(obj)
      return obj ? obj.label : '未知'
    },
    // 搜索
    async searchFn() {
      const { data } = await randoms({
        keyword: this.form.name
      })
      const { items, counts } = data
      this.tableData = items
      // console.log(this.tableData)
      this.counts = counts
      // console.log(data)
    },
    // 清除按钮
    remove() {
      this.form.name = ''
    },
    // 删除功能
    async handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeRandoms({
          id: row.id
        })
        // console.log(row.id)
        this.randomsList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async onOpen() {
      // const res = await list()
      // console.log(res)
    },
    async getQuestionId(id) {
      // console.log(id)
      const { data } = await detail({
        id
      })
      // console.log(data)
      this.questionDetial = data
      console.log(this.questionDetial)
      // console.log(this.radio)
    }
  }
}

</script>

<style scoped lang='less'>
.app-main {
  position: relative;
    // top: 75px;
    width: 1721px;
    height: 2316px;
    .question-container {
      height: 100%;
      padding: 10px;
      // background-color: red;
      /deep/.el-card__body {
      width: 1699px;
      // height: 2113px;
      padding: 20px;
}
    }
    /deep/.el-input--medium .el-input__inner {
    height: 32px;
    line-height: 32px;
    width: 334.75px;
}
.rightheader {
  margin-left: 80px;
  .remove, .search {
    width: 56px;
    height: 32px;
  }
}
.message {
  margin-bottom: 15px;
  display: flex;
  background-color: #f4f4f5;
  color: #909399;
  .message-right {
    padding: 8px;
  }
  .el-icon-info{
   text-align: center;
  }
}
/deep/.el-table__header-wrapper {
  border-bottom: 2px solid #e8e8e8;
}
.block {
  padding-top: 60px;
  margin-top: 20px;
  margin-bottom: 20px;
  float: right;
  /deep/.el-input--medium .el-input__inner {
 width: 40px;
}

}
.bodydetial {
  .el-col-6 {
    padding: 10px 0;
    width: 25%;
}
}

// /deep/.el-table__cell {
//   background-color: #fafafa;
// }
}
</style>
