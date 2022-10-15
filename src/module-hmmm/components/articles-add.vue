<template>
    <div>
      <el-dialog
         @close="closeArticlesNews"
         title="新增文章"
         :visible="isShowArticlesNews"
         width="70%">
            <el-form ref="form" :model="formData" :rules="rules"  label-width="80px">
               <!-- input框 -->
              <el-form-item label="文章标题" prop="title">
                <el-input v-model="formData.title"></el-input>
              </el-form-item>
              <!-- 富文本 -->
              <el-form-item label="文章内容" prop="articleBody">
                 <quill-editor
                  v-model="formData.articleBody"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @change="onEditorChange($event)">
                </quill-editor>
              </el-form-item>
              <el-form-item label="视频地址" prop="videoURL">
                <el-input v-model="formData.videoURL"></el-input>
              </el-form-item>
            </el-form>
         <span slot="footer" class="dialog-footer">
           <el-button @click="closeArticlesNews">取 消</el-button>
           <el-button type="primary" @click="newArticles">确 定</el-button>
         </span>
      </el-dialog>
    </div>
</template>
<script>
import { add } from '@/api/hmmm/articles'
import { quillEditor } from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  components: {
    quillEditor
  },
  props: {
    isShowArticlesNews: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formData: {
        title: '',
        articleBody: '',
        videoURL: ''
      },
      rules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        articleBody: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
      },
      // 富文本编辑器配置
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
            ['blockquote', 'code-block'], // 引用  代码块
            ['image', 'link'] // 链接、图片、视频
          ]
        },
        placeholder: ''
      }
    }
  },
  methods: {
    closeArticlesNews () {
      this.$emit('update:isShowArticlesNews', false)
      this.$refs.form.resetFields()
    },
    // 新增文章列表
    async newArticles () {
      await this.$refs.form.validate()
      const data = await add(this.formData)
      this.$emit('update:isShowArticlesNews', false)
      this.$parent.getList()
      console.log(data)
    },
    // 内容改变事件
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.formData.articleBody = html
    }
    // 失去焦点事件
    // onEditorBlur (quill) {
    //   console.log('editor blur!', quill)
    // },
    // 获得焦点事件
    // onEditorFocus (quill) {
    //   console.log('editor focus!', quill)
    // },
    // 准备富文本编辑器
    // onEditorReady (quill) {
    //   console.log('editor ready!', quill)
    // },
  }
}
</script>

<style>
.ql-editor p{
    height: 200px;
}
.el-input--medium .el-input__inner {
    height: 32px;
    line-height: 32px;
}
.ql-toolbar.ql-snow {
    padding: 0px;
    height: 34px;
}
</style>
