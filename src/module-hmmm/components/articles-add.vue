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
import { add, update } from '@/api/hmmm/articles'
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
    },
    articlesChangeContent: {
      type: Object,
      default: () => ({})
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
  created () {
    console.log(this.articlesChangeContent)
    this.formData.title = this.articlesChangeContent?.title
    this.formData.articleBody = this.articlesChangeContent?.articleBody
    this.formData.videoURL = this.articlesChangeContent?.videoURL
  },
  watch: {
    articlesChangeContent () {
      this.formData = {
        title: this.articlesChangeContent?.title,
        articleBody: this.articlesChangeContent?.articleBody,
        videoURL: this.articlesChangeContent?.videoURL
      }
    }
  },
  methods: {
    closeArticlesNews () {
      this.$emit('closeArticlesNews', false)
      this.$refs.form.resetFields()
    },
    // 新增/修改文章列表
    async newArticles () {
      await this.$refs.form.validate()
      if (this.articlesChangeContent.id) {
        console.log(this.articlesChangeContent)
        this.$nextTick(async () => {
          await update({
            id: this.articlesChangeContent.id,
            title: this.formData.title,
            articleBody: this.formData.articleBody,
            videoURL: this.formData.videoURL
          })
        })
      } else {
        await add(this.formData)
      }
      this.$emit('closeArticlesNews', false)
    },
    // 内容改变事件
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.formData.articleBody = html
    }
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
