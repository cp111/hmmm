<template>
  <div class="container">
    <div class="myInput">
      <el-row :gutter="20">
        <el-col :span="6">
          <!-- 输入框 -->
          <div class="input">
            <span class="title">标签名称</span>
            <el-input
              v-model="search.tags"
              style="width: 70%;height:32px;"
              clearable
              placeholder="请输入"
            />
          </div>
        </el-col>
        <el-col :span="6">
          <!-- 下拉选择 -->
          <div class="input">
            <span class="title">城市</span>
            <el-select v-model="search.province" style="width: 70%;height:32px;" @change="handleProvince">
              <el-option v-for="item in citySelect.province" :key="item" :label="item" :value="item" />
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="input">
            <span class="title">地区</span>
            <el-select v-model="search.city" style="width: 70%;height:32px;">
              <el-option v-for="item in citySelect.cityDate" :key="item" :label="item" :value="item" />
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="input">
            <span class="title">企业简称</span>
            <el-input
              v-model="search.shortName"
              style="width: 70%;height:32px;"
              clearable
              placeholder="请输入"
            />
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="input">
            <span class="title">状态</span>
            <el-select v-model="search.state" style="width: 70%;height:32px;">
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
            </el-select>
          </div>
        </el-col>
        <!-- btn按钮 -->
        <el-col :span="6" style="padding-left:46px;">
          <div>
            <el-button size="small" @click="restForm">清除</el-button>
            <el-button size="small" type="primary" @click="getList">搜索</el-button>
          </div>
        </el-col>
        <el-col :span="6" :offset="6">
          <div class="input">
            <el-button icon="el-icon-edit" class="myBtn" type="success" @click="openNews">新增用户</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="tips">
      <el-alert
        :title="`数据一共${companysList.counts}条`"
        type="info"
        show-icon
      />
    </div>
    <!-- companysLise -->
    <div v-loading="loading" class="companysLise" element-loading-text="给我一点时间">
      <CompanysList :companys-list="companysList" @newDataes="getList" @openEdit="openEdit($event)" />
    </div>
    <!-- 创建用户 -->
    <CompanysAdd ref="addCom" :title-info="titleInfo" :form-base="editContent" :dialog-form-visible.sync="openAddUser" @newDataes="getList" />
    <!-- 分页 -->
    <div class="articlesPagination">
      <CompanysPagination :articles-list="companysList" @upDate="getList" />
    </div>
  </div>
</template>

<script>
import CompanysList from '../components/companys-list.vue'
import CompanysAdd from '../components/companys-add.vue'
import CompanysPagination from '../components/articles-pagination.vue'
import { list } from '@/api/hmmm/companys.js'
import { provinces, citys } from '@/api/hmmm/citys.js'
export default {
  components: {
    CompanysList,
    CompanysAdd,
    CompanysPagination
  },
  data() {
    return {
      loading: false,
      search: {
        tags: '',
        province: '',
        city: '',
        shortName: '',
        state: null
      },
      companysList: {
        page: 1,
        pagesize: 10
      },
      openAddUser: false,

      titleInfo: {
        text: '创建用户'
      },
      editContent: {
        city: '',
        company: '',
        isFamous: true,
        province: '',
        remarks: '',
        shortName: '',
        tags: ''
      },
      citySelect: {
        province: [],
        cityDate: []
      }
    }
  },
  created() {
    this.getList()
    this.getCityData()
  },
  methods: {
    // 获取省
    getCityData: function() {
      this.citySelect.province = provinces()
    },
    // 选省获取到市
    handleProvince: function(e) {
      this.citySelect.cityDate = citys(e)
      this.search.city = this.citySelect.cityDate[0]
    },
    async getList() {
      this.loading = true
      try {
        const { data } = await list({
          page: this.companysList.page,
          pagesize: this.companysList.pagesize,
          tags: this.search.tags,
          province: this.search.province,
          city: this.search.city,
          shortName: this.search.shortName,
          state: this.search.state
        })
        this.companysList = data
        this.companysList.pagesize = Number(this.companysList.pagesize)
        this.companysList.page = Number(this.companysList.page)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    // 清除input框内容
    restForm() {
      this.search = {
        page: 1,
        pagesize: 10,
        tags: '',
        province: '',
        city: '',
        shortName: '',
        state: null
      }
    },
    openEdit(row) {
      // this.editContent = row
      this.$refs.addCom.formBase = { ...row, isFamous: true }
      this.titleInfo.text = '编辑用户'
      this.openAddUser = true
    },
    openNews() {
      this.titleInfo.text = '创建用户'
      this.openAddUser = true
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
    font-size: 15px;
    .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  }
  .input{
    display: flex;
    justify-content: right;
      // text-align: left;
        .title{
        margin-right: 10px;
        font-size: 16px;
        text-align: center;
        line-height: 32px;
      }
    }
    .myBtn{
        margin-right:0;
    }
    .tips{
    margin-top: 25px;
  }
  .companysLise{
    margin-top: 25px;
  }
  .articlesPagination{
    margin-top: 25px;
    display: flex;
    justify-content: right;
  }
}
</style>
