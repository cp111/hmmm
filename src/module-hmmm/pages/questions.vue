<template>
  <div class='container'>
      <questions-public-page/>
  </div>
</template>

<script>
import questionsPublicPage from '../components/questions-public-page.vue'
export default { components: { questionsPublicPage } }
</script>

<style scoped lang='less'>
.container{
  padding: 0 10px;
  margin: 10px 0;
}
</style>
