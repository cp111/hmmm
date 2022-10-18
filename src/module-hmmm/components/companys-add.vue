<template>
  <div class="add-form">
    <el-dialog :title="titleInfo.text" :visible="dialogFormVisible" @close="dialogFormH">
      <el-form
        ref="dataForm"
        :rules="ruleInline"
        :model="formBase"
        label-position="left"
        label-width="150px"
        style="width: 80%; margin-left:10px;"
      >
        <el-form-item label="企业名称" prop="shortName">
          <el-input v-model="formBase.shortName" />
        </el-form-item>
        <el-form-item label="所属公司" prop="company">
          <el-input v-model="formBase.company" />
          <p>https://www.tianyancha.com （在此可查询所属公司全称及简称）</p>
        </el-form-item>
        <el-form-item label="城市" prop="province">
          <el-select
            v-model="formBase.province"
            class="filter-item"
            style="width: 130px;"
            filterable
            @keyup.enter="handleFilter"
            @change="handleProvince"
          >
            <el-option v-for="item in citySelect.province" :key="item" :label="item" :value="item" />
          </el-select>
          <el-select
            v-model="formBase.city"
            class="filter-item"
            style="width: 130px;"
            filterable
            @keyup.enter="handleFilter"
          >
            <el-option v-for="item in citySelect.cityDate" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="方向（企业标签）" prop="tags">
          <el-input v-model="formBase.tags" />
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            v-model="formBase.remarks"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormH">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="createData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { add, update } from '@/api/hmmm/companys'
import { provinces, citys } from '@/api/hmmm/citys.js'
export default {
  name: 'CompanysAdd',
  props: {
    titleInfo: {
      type: Object,
      required: true
    },
    // formBase: {
    //   type: Object,
    //   required: true
    // },
    dialogFormVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      citySelect: {
        province: [],
        cityDate: []
      },
      // 表单验证
      ruleInline: {
        shortName: [
          { required: true, message: '企业简称不能为空', trigger: 'blur' }
        ],
        company: [{ required: true, message: '所属不能为空', trigger: 'blur' }],
        province: [
          { required: true, message: '请选择省份', trigger: 'blur' }
        ],
        tags: [{ required: true, message: '请请输标签', trigger: 'blur' }]
      },
      formBase: {
        city: '',
        company: '',
        province: '',
        remarks: '',
        shortName: '',
        tags: '',
        isFamous: true
      }
    }
  },
  computed: {},
  // 挂载结束

  mounted: function() {},
  // 创建完毕状态
  created() {
    this.getCityData()
  },
  // 组件更新
  updated: function() {},
  methods: {
    // 弹层隐藏
    dialogFormH() {
      this.$emit('update:dialogFormVisible', false)
      this.$refs.dataForm.resetFields()
      this.formBase = {
        city: '',
        company: '',
        province: [],
        remarks: '',
        shortName: '',
        tags: '',
        isFamous: true
      }
    },
    // 获取省
    getCityData: function() {
      this.citySelect.province = provinces()
    },
    // 选省获取到市
    handleProvince: function(e) {
      this.citySelect.cityDate = citys(e)
      this.formBase.city = this.citySelect.cityDate[0]
    },
    // 表单提交
    async createData() {
      this.$refs.dataForm.validate(async valid => {
        if (valid) {
          const data = {
            ...this.formBase
          }
          if (this.formBase.id) {
            await update(data).then(() => {
              this.$emit('newDataes', this.formBase)
            })
            this.dialogFormH()
          } else {
            await add(this.formBase).then(() => {
              this.$emit('newDataes', this.formBase)
            })
            this.dialogFormH()
          }
        } else {
          this.$message.error('*号为必填项!')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
::v-deep .el-form--label-left .el-form-item__label {
  text-align: right;
}
::v-deep .el-form-item--medium {
  margin-bottom: 22px;
}
::v-deep .el-dialog__footer {
  text-align: center;
}
</style>
