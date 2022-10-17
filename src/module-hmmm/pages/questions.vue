<template>
  <div class="container">
    <el-card>
      <questions-public-page @updataQuestions="getBaseList(pageData)" :dialogVisible.sync="dialogVisible"
        @previewQuestions="previewQuestions" :questionList.sync="baseQuestionList" :counts="counts" />
      <MyPages :pagesize="+pageData.pagesize" @sizeChange="sizeChange" :counts="counts" :pages="+pages"
        :currentPage="+pageData.page" @updataPage="updataPage" />
    </el-card>
    <questions-preview :currentCatalog="currentCatalog" :currentQuestions="currentQuestions"
      :dialogVisible.sync='dialogVisible' />
  </div>
</template>

<script>
import MyPages from '@/components/MyPages'
import questionsPublicPage from '../components/questions-public-page.vue'
import { list as getBaseListAPI, detail as getCurrentQuestionsAPI } from '@/api/hmmm/questions'
import QuestionsPreview from '../components/questions-preview.vue'
export default {
  components: { questionsPublicPage, MyPages, QuestionsPreview },
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
      currentCatalog: ''
    }
  },
  created() {
    this.getBaseList(this.pageData)
  },
  methods: {
    async getBaseList(pageData) {
      if (this.counts - pageData.pagesize === 0 && pageData.page !== 1) {
        console.log(pageData)
        pageData.page--
      }
      const { data } = await getBaseListAPI(pageData)
      this.baseQuestionList = data.items
      this.pageData.page = data.page
      this.counts = data.counts
      this.pages = data.pages
      console.log(data)
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
