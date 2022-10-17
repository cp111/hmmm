<template>
  <div class="container">
    <el-card>
      <questions-public-page @audit="audit" @updataList="updataList" :checkDialogVisible.sync="checkDialogVisible"
        :isShowChoice="true" @updataQuestions="getBaseList(pageData)" :dialogVisible.sync="dialogVisible"
        @previewQuestions="previewQuestions" :questionList.sync="baseQuestionList" :counts="counts" />
      <MyPages :pagesize="pageData.pagesize" @sizeChange="sizeChange" :pages="+pages" :counts="counts"
        :currentPage="+pageData.page" @updataPage="updataPage" />
    </el-card>
    <questions-preview :currentCatalog="currentCatalog" :currentQuestions="currentQuestions"
      :dialogVisible.sync='dialogVisible' />
    <questions-check :currentAudit="currentAudit" :checkDialogVisible.sync="checkDialogVisible" />
  </div>
</template>

<script>
import MyPages from '@/components/MyPages'
import questionsPublicPage from '../components/questions-public-page.vue'
import { choice as getChoiceListAPI, detail as getCurrentQuestionsAPI } from '@/api/hmmm/questions'
import QuestionsPreview from '../components/questions-preview.vue'
import QuestionsCheck from '../components/questions-check.vue'
export default {
  components: { questionsPublicPage, MyPages, QuestionsPreview, QuestionsCheck },
  data() {
    return {
      dialogVisible: false,
      pageData: {
        page: 1,
        pagesize: 5
      },
      baseQuestionList: [],
      counts: 0, // 总记录数
      pages: '', // 总页数
      currentQuestions: {},
      currentCatalog: '',
      isShowChoice: false,
      checkDialogVisible: false,
      currentAudit: {}
    }
  },
  created() {
    this.getBaseList(this.pageData)
  },
  methods: {
    async getBaseList(pageData) {
      if (this.counts - pageData.pagesize === 0 && pageData.page !== 1) {
        console.log(pageData)
        pageData.pagesize--
      }
      const { data } = await getChoiceListAPI(pageData)
      this.baseQuestionList = data.items
      this.pageData.page = data.page
      this.counts = data.counts
      this.pages = data.pages
    },
    sizeChange(pagesize) {
      this.pageData.pagesize = pagesize
      this.getBaseList(this.pageData)
    },
    updataPage(page) {
      this.pageData.page = page
      this.getBaseList(this.pageData)
    },
    async previewQuestions(row) {
      this.currentCatalog = row.catalog
      const { data } = await getCurrentQuestionsAPI(row)
      this.currentQuestions = data
    },
    // 审核
    audit(row) {
      console.log(row)
      this.currentAudit = row
    },
    // 切换面包屑更新视图
    updataList(activeName) {
      console.log(activeName)
      if (activeName !== '4') {
        this.pageData.chkState = activeName
        this.getBaseList(this.pageData)
        this.pageData = {
          page: 1,
          pagesize: 5
        }
      } else {
        this.getBaseList(this.pageData)
      }
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 0 10px;
  margin: 10px 0;
}
</style>
