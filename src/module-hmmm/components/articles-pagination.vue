<template>
  <div>
    <div class="block">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="articlesList.page"
      :page-sizes="[1,5,6,10]"
      :page-size.sync="articlesList.pagesize"
      layout="sizes, prev, pager, next, jumper"
      :page-count="articlesList.pages"
      :total="articlesList.counts">
    </el-pagination>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    articlesList: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {

    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('upDate')
      // this.$parent.getList()
    },
    handleCurrentChange (val) {
      this.$emit('upDate')

      // this.$parent.getList()
    }
  }
}
</script>

<style>

</style>
