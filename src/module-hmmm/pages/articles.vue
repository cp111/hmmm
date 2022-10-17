<template>
  <div class='container'>
    <!-- input -->
    <div class='myInput'>
     <!-- 输入框 -->
      <div class="input">
        <span class="title">关键字</span>
        <el-input
        style="width: 200px;height:32px;"
        v-model="keyword"
        clearable
        placeholder="根据文章标题搜索"
       />
      </div>
     <!-- 下拉选择 -->
     <div class="input">
       <span class="title"> 状态</span>
       <el-select v-model="state" style="width: 200px;height:32px;">
        <el-option label="启用" value="1"/>
        <el-option label="禁用" value="0"/>
       </el-select>
     </div>
     <!-- btn按钮 -->
     <el-row>
      <el-button size="small" @click="clearInput">清除</el-button>
      <el-button size="small" type="primary" @click="getList" >搜索</el-button>
     </el-row>
     <!-- button -->
     <el-button icon="el-icon-edit" class="myBtn" type="success" @click="isShowArticlesNews=true">新增技巧</el-button>
    </div>
    <!-- Tips -->
    <div class="tips">
    <el-alert
    :title="`数据一共${articlesList.counts}条`"
    type="info"
    show-icon>
    </el-alert>
    </div>
    <!-- articleslist -->
    <div class="articleslist">
     <ArticlesList @changeStates="changeStates"  :articlesList="articlesList" ></ArticlesList>
    </div>
   <!-- 分页 -->
    <div class="articlesPagination">
      <ArticlesPagination @upDate="getList" :articlesList="articlesList"></ArticlesPagination>
    </div>
    <!-- 新增文章 -->
    <ArticlesAdd @getList="getList()" :isShowArticlesNews="isShowArticlesNews" @closeArticlesNews="closeArticlesNews"></ArticlesAdd>
    <!-- 文章预览 -->
    <!-- <div>
      <ArticlesPreviews :isShowPreview.sync="isShowPreview"></ArticlesPreviews>
    </div> -->
 </div>
</template>

<script>
import ArticlesList from '../components/articles-list.vue'
import ArticlesAdd from '../components/articles-add.vue'
// import ArticlesPreviews from '../components/articles-previews.vue'
import ArticlesPagination from '../components/articles-pagination.vue'
import { list } from '@/api/hmmm/articles.js'

export default {
  components: {
    ArticlesList,
    ArticlesAdd,
    // ArticlesPreviews,
    ArticlesPagination
  },
  data () {
    return {
      keyword: null,
      state: null,
      inputValue: '',
      selectValue: '1',
      articlesList: {
        page: 1,
        pagesize: 10
      },
      isShowArticlesNews: false

    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取articlesList
    async getList () {
      const { data } = await list({
        keyword: this.keyword,
        state: this.state,
        page: this.articlesList.page,
        pagesize: this.articlesList.pagesize
      })
      this.articlesList = data
      this.articlesList.pagesize = Number(this.articlesList.pagesize)
      this.articlesList.page = Number(this.articlesList.page)
    },
    changeStates (state) {
      this.articlesList.items.forEach(item => {
        if (item.id === state.id) {
          item.state === 0 ? item.state = 1 : item.state = 0
        }
      })
    },
    clearInput () {
      this.keyword = null
      this.state = null
    },
    closeArticlesNews () {
      this.isShowArticlesNews = false
      this.getList()
    }
  }
}
</script>

<style scoped lang='less'>
.container{
  margin: 15px;
  padding: 20px;
  min-height: 100%;
  background-color: #fff;
  .myInput{
    padding-left:15px;
    display: flex;
    align-items: center;
    // flex-wrap: 3;
    .input{
        margin-right: 35px;
        .title{
        margin-right: 10px;
        font-size: 16px;
      }
    }
    .myBtn{
        // justify-self: right;
        margin-left: auto
    }
}
  .tips{
    margin-top: 25px;
  }
  .articleslist{
    margin-top: 20px;
  }
  .articlesPagination{
    margin-top: 25px;
    display: flex;
    justify-content: right;
  }
}
</style>
