<template>
  <div>
    <el-table
    :header-cell-style="{backgroundColor:'#fafafa',textAlign: 'center'}"
    :cell-style="{textAlign: 'center'}"
    :data="companysList.items"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="138">
      </el-table-column>
      <el-table-column
        prop="number"
        label="企业编号"
        width="134">
      </el-table-column>
      <el-table-column
        prop="company"
        label="企业名称">
      </el-table-column>
      <el-table-column
        prop="tags"
        label="标签"
        width="134">
      </el-table-column>
      <el-table-column
        prop="username"
        label="创建者">
      </el-table-column>
      <el-table-column
        prop="addDate"
        label="创建日期"
        width="134">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注">
      </el-table-column>
       <el-table-column
        label="状态">
        <template slot-scope="{row}">
            {{states[row.state]}}
        </template>
      </el-table-column>
      <el-table-column
      class="caozuo"
      width="180"
        prop="address"
        label="操作">
       <template slot-scope="{row}">
        <i class="el-icon-edit" style="line-height: 36px;border-radius: 50%;color: #409eff;width:36px;height:36px;background: #ecf5ff;border-color: #b3d8ff;margin-right:10px;"></i>
        <i class="el-icon-check" v-if="row.state===0" style="line-height: 36px;border-radius: 50%;color: #67c23a;width:36px;height:36px;background: #f0f9eb;border-color: #c2e7b0;margin-right:10px;"></i>
        <i class="el-icon-close" v-if="row.state===1" style="line-height: 36px;border-radius: 50%;color: #e6a23c;width:36px;height:36px;background: #fdf6ec;border-color: #f5dab1;margin-right:10px;"></i>
        <i class="el-icon-delete" style="line-height: 36px;border-radius: 50%;color: #f56c6c;width:36px;height:36px;background: #fef0f0;border-color: #fbc4c4;"></i>
       </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    companysList: {
      typpe: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      states: {
        1: '启用',
        0: '禁用'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.caozuo{

       line-height: 36px;
       border-radius: 50%;
       width:36px;
       height:36px;

}
</style>
