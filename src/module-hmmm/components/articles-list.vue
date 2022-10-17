<template>
  <div>
     <el-table
      :header-cell-style="{backgroundColor:'#fafafa'}"
      :data="articlesList.items"
      style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          width="400"
          prop="title"
          label="文章标题"
          >
           <template slot-scope="{row}">
              {{row.title}}
              <a :href="row.videoURL"><i  v-if="row.videoURL !==null" style="color:#4d50ff" class="el-icon-film"></i></a>
           </template>
        </el-table-column>
        <el-table-column
          prop="visits"
          label="阅读数">
        </el-table-column>
        <el-table-column
          prop="username"
          label="录入人">
        </el-table-column>
        <el-table-column
         width="172"
          label="录入时间">
          <template slot-scope="{row}">
            {{row.createTime | timeFormater}}
          </template>
        </el-table-column>
        <el-table-column
         width="100"
          label="状态">
          <template slot-scope="{row}">
            {{states[row.state]}}
          </template>
        </el-table-column>
        <el-table-column
          width="180"
          label="操作">
          <template slot-scope="{row}">
           <el-button type="text" @click="showPreview(row)">预览</el-button>
          <el-button type="text" @click="changeStates(row)">{{row.state===0?'启用':'禁用'}}</el-button>
          <el-button type="text" :disabled="row.state===1" @click="showArticlesChange(row)">修改</el-button>
          <el-button type="text" :disabled="row.state===1" @click="delArticlesList(row.id)">删除</el-button>
          </template>

        </el-table-column>
    </el-table>
    <!-- 文章预览 -->
    <div>
      <ArticlesPreviews :previewContent="previewContent" @closeArticlesPre="closeArticlesPre" :isShowPreview.sync="isShowPreview"></ArticlesPreviews>
    </div>
    <!-- 富文本 -->
    <ArticlesChange :title="title" @closeArticlesNews="closeArticlesNews" :articlesChangeContent="articlesChangeContent" :isShowArticlesNews="isShowArticlesChange"></ArticlesChange>
  </div>
</template>

<script>
import ArticlesPreviews from '../components/articles-previews.vue'
import ArticlesChange from '../components/articles-add.vue'
import { changeState, remove } from '@/api/hmmm/articles'
export default {
  components: {
    ArticlesPreviews,
    ArticlesChange
  },
  props: {
    articlesList: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      states: {
        0: '已禁用',
        1: '已启用'
      },
      isShowPreview: false,
      previewContent: null,
      isShowArticlesChange: false,
      articlesChangeContent: null,
      title: '修改文章'
    }
  },
  methods: {
    async changeStates (row) {
      this.$emit('changeStates', row)
      await changeState({
        state: row.state,
        id: row.id
      })
    },
    async delArticlesList (id) {
      await remove(
        { id: id }
      )
      this.$parent.getList()
    },
    showPreview (row) {
      console.log(row)
      this.previewContent = row
      this.isShowPreview = true
    },
    closeArticlesPre () {
      this.isShowPreview = false
    },
    showArticlesChange (row) {
      this.articlesChangeContent = row
      this.isShowArticlesChange = true
    },
    async closeArticlesNews () {
      this.isShowArticlesChange = false
    //   this.$parent.getList()
    }
  }

}
</script>

<style>
</style>
