<template>
  <div class="container">
    <el-dialog
      title="预览文章"
      :visible="isShowPreview"
      width="800px"
      @close="closeArticlesPre"
    >
      <h2 style="padding:0;margin:0 0 10px 0;">{{ previewContent?.title }}</h2>
      <div style="padding-left:10px;margin:0 0 10px 0;">
        <span class="margin">{{ previewContent?.createTime|timeFormater }}</span>
        <span class="margin">{{ previewContent?.username }}</span>
        <span class="el-icon-view margin" />
        <span>{{ previewContent?.visits }}</span>
      </div>
      <div class="articlesContent" v-html="previewContent?.articleBody" />
    </el-dialog>
  </div>
</template>

<script>
export default {

  props: {
    isShowPreview: {
      type: Boolean,
      default: false
    },
    previewContent: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {

    }
  },
  methods: {
    closeArticlesPre() {
      this.$emit('closeArticlesPre', false)
    }
  }
}
</script>

<style scoped lang='less'>
  .articlesContent{
    width: 100%;
    padding: 10px;
    background-color: #f5f5f5;
  }
  .margin{
    margin-right: 10px;
  }
</style>
