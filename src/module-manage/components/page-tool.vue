<template>
   <div class="block">
    <el-pagination
    @prev-click="upPage"
      @next-click="nextPage"
  background
  layout="prev, pager, next"
  :total="counts">
</el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    counts: {
      type: Number,
      required: true
    },
    pagesize: {
      type: Number,
      required: true
    },
    pages: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    }
  },
  methods: {
    upPage(val) {
      this.$emit('up', val)
    },
    nextPage(val) {
      this.$emit('next', val)
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped lang="less">
.block {
  margin-top: 20px;
  margin-left: 900px;
}
</style>
