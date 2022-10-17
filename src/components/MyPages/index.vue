<template>
  <el-pagination
    @size-change="sizeChange"
    @current-change="currentChange"
    @prev-click="handleSizeChange"
    @next-click="handleSizeChange"
    :current-page="currentPage"
    :page-size="pagesize"
    :page-sizes="[5,10,20,50]"
    layout=" prev, pager, next,sizes, jumper"
    :total="counts"
    background
    style="margin-top: 20px; text-align: right;"
  >
  </el-pagination>
</template>

<script>

export default {
  props: {
    counts: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    pagesize: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      // currentPage: 5
    }
  },
  methods: {
    currentChange(val) {
      this.$emit('updataPage', val)
    },
    sizeChange(val) {
      this.$emit('sizeChange', val)
    },
    handleSizeChange(val) {
      this.$emit('updataPage', val)
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .el-pagination__jump{
  margin-left: 0;
}
</style>
