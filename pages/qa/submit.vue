<template>
    <div class="wrapper">
         <div class="qa-submit-form">
    <form action="" class="sui-form">
        <div class="input-title">
            <input type="text" placeholder="标题：一句话说清问题，用问号结尾" class="input-xfat input-xxlarge title">
        </div>
        <div class="tags-area">
            <div class="input-tags">
                <input type="text" placeholder="标签，如:php可使用逗号，分号； 来分隔" class="input-xfat input-xxlarge" id="tags">
            </div>
            <div class="tags-box">
                <ul class="sui-tag tag-bordered">
                    <li class="tag-item">javascript</li>
                    <li class="tag-item">php</li>
                    <li class="tag-item">css</li>
                    <li class="tag-item">html</li>
                    <li class="tag-item">java</li>
                    <li class="tag-item">python</li>
                    <li class="tag-item">html5</li>
                    <li class="tag-item">node.js</li>
                    <li class="tag-item">c++</li>
                </ul>
            </div>
        </div>

        <div class="editor">

             <div class="quill-editor" 
         :content="content"
         @change="onEditorChange($event)"
         @blur="onEditorBlur($event)"
         @focus="onEditorFocus($event)"
         @ready="onEditorReady($event)"
         v-quill:myQuillEditor="editorOption">
     </div>
        </div>
        <div class="submit">
            <span>已保存草稿</span>
            <span><a class="sui-btn btn-release" @click="save()">发布问题</a></span>
        </div>
        <div class="clearfix"></div>
    </form>
</div>
    </div>
</template>
<script>
import '~/assets/css/page-sj-qa-submit.css'
import Auth from '@/utils/auth'
import problemApi from '@/api/problem'
import {quillRedefine} from 'vue-quill-editor-upload'
export default {
    data () {
      return {
        content: '',
        editorOption: {}
      }
    },
    created() {
        this.editorOption = quillRedefine(
        {
          // 图片上传的设置
          uploadConfig: {
            action: 'http://localhost:3000/upload',  // 必填参数 图片上传地址
            // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
            // 你必须把返回的数据中所包含的图片地址 return 回去
            res: (respnse) => {
              return respnse.info
            },
            name: 'img'  // 图片上传参数名
          }
        }
      )
    },
    methods:{
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.content = html
      },
      save(){
        problemApi.save({
            content: this.content,
            nickname: Auth.getUser().name
        }).then(res => {
           
                this.$notify({
                    message: '问题发布成功',
                    type: (res.data.flag)?'success':'error'
                })
                this.$router.push('/qa')
            
        })
      }
    }
}
</script>
<style scoped>
.quill-editor {
      min-height: 300px;
      max-height: 400px;
      overflow-y: auto;
    }
</style>