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
              <i v-if="row.videoURL !==null" style="color:#4d50ff" class="el-icon-film"></i>
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
           <el-button type="text" @click="showPreview">预览</el-button>
          <el-button type="text" @click="changeStates(row)">{{row.state===0?'启用':'禁用'}}</el-button>
          <el-button type="text" :disabled="row.state===1">修改</el-button>
          <el-button type="text" :disabled="row.state===1" @click="delArticlesList(row.id)">删除</el-button>
          </template>

        </el-table-column>
    </el-table>
    <!-- 文章预览 -->
    <div>
      <ArticlesPreviews @closeArticlesPre="closeArticlesPre" :isShowPreview.sync="isShowPreview"></ArticlesPreviews>
    </div>
  </div>
</template>

<script>
import ArticlesPreviews from '../components/articles-previews.vue'
import { changeState, remove } from '@/api/hmmm/articles'
export default {
  components: {
    ArticlesPreviews
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
      isShowPreview: false
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
    showPreview () {
      this.isShowPreview = true
    },
    closeArticlesPre () {
      this.isShowPreview = false
    }
  }

}
</script>

<style>
</style>
