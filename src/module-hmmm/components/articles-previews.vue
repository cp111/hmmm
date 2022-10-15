<template>
  <div class='container'>
   <el-dialog
  title="预览文章"
  :visible="isShowPreview"
   @close="closeArticlesPre"
  width="70%">
 <h2>11</h2>
</el-dialog>
  </div>
</template>

<script>
export default {

  props: {
    isShowPreview: {
      type: Boolean,
      defaults: false
    }
  },
  created () {
    console.log(this.$route)
  },
  methods: {
    closeArticlesPre () {
      this.$emit('closeArticlesPre', false)
    }
  }
}
</script>

<style scoped lang='less'></style>
