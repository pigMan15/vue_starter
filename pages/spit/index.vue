<template>
    <div>
   <div class="wrapper tag-item"> 
    <div class="fl left-list"> 
     <div class="tc-data-list"> 
      <div class="tc-list" v-infinite-scroll="loadMore"> 
       <ul class="detail-list"> 
        <li class="qa-item" v-for="(item,index) in items" :key="index"> 
         <div class="fl record"> 
          <div class="number"> 
           <div class="border useful"> 
            <p class="usenum" @click="thumbup(index)"><a class="zan"><i :class="'fa fa-thumbs-up '+item.zan" aria-hidden="true"></i></a></p> 
            <p class="zannum"> {{item.thumbup}} </p> 
           </div> 
           <div class="border answer"> 
            <a href="#" class="star"><i class="fa fa-star-o" aria-hidden="true"></i></a> 
           </div> 
          </div> 
         </div> 
         <div class="info"> 
          <p class="text"> 
              <router-link :to="'/spit/'+item.id" >
                        {{item.content}} 
              </router-link>
        
              </p> 
          <div class="other"> 
           <div class="fl date"> 
            <span>{{item.publishtime}}</span> 
           </div> 
           <div class="fr remark"> 
            <a href="#" data-toggle="modal" data-target="#shareModal" class="share"><i class="fa fa-share-alt" aria-hidden="true"></i> 分享</a> 
            <a href="#" data-toggle="modal" data-target="#remarkModal" class="comment"><i class="fa fa-commenting" aria-hidden="true"></i> 回复</a> 
           </div> 
          </div> 
         </div> 
         <div class="clearfix"></div> </li> 
     
         
       </ul> 
       <div class="modal fade" id="shareModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> 
        <div class="modal-dialog" role="document"> 
         <div class="modal-content"> 
          <div class="modal-header"> 
           <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> 
           <h4 class="modal-title" id="myModalLabel">分享到</h4> 
          </div> 
          <div class="modal-body" style="overflow:hidden"> 
           <div class="jiathis_style_32x32"> 
            <a class="jiathis_button_qzone"></a> 
            <a class="jiathis_button_tsina"></a> 
            <a class="jiathis_button_weixin"></a> 
            <a class="jiathis_button_cqq"></a> 
           </div> 
          </div> 
         </div> 
        </div> 
       </div> 
       <div class="modal fade" id="remarkModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> 
        <div class="modal-dialog" role="document"> 
         <div class="modal-content"> 
          <div class="modal-header"> 
           <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> 
           <h4 class="modal-title" id="myModalLabel">发表评论</h4> 
          </div> 
          <div class="modal-body"> 
           <div class="comment"> 
            <span class="who"><img src="~/assets/img/asset-photo.png" />匿名评论</span>: 今天入职腾讯，产品岗，普通非985211大学，上家是不到五十人创业小公司！16年毕业！找内推腾讯给的面试机会，五轮面试！可能是我把运气攒一起了！ 
           </div> 
           <div class="form"> 
            <textarea class="form-control" rows="5" placeholder="匿名评论"></textarea> 
            <div class="remark"> 
             <button class="sui-btn btn-info">发表</button> 
            </div> 
           </div> 
          </div> 
         </div> 
        </div> 
       </div> 
      </div> 
     </div> 
     <!-- <script>
    $(function () {
        $(".zan").click(function () {
            $(this).children(".fa").toggleClass("color");
            var c = parseInt($(this).parent().siblings(".zannum").html());
            c = c++;
        });
        $(".star").click(function () {
            console.log("eeee");
            $(this).children(".fa").removeClass("fa-star-o").addClass("fa-star color");
        });
        $(".detail-list").unbind("scroll").bind("scroll", function (e) {
            var sum = this.scrollHeight;
            if (sum - 10 <= $(this).scrollTop() + $(this).height()) {
                $(".detail-list").append($("li").clone());
            }
        });
    })

</script> --> 
    </div> 
    <div class="fl right-tag"> 
     <div class="block-btn"> 
      <p>来个匿名吐槽，发泄一下你心中的怒火吧！</p> 
     <router-link class="sui-btn btn-block btn-share" to="/spit/submit">发吐槽</router-link>
     </div> 
    </div> 
    <div class="clearfix"></div> 
   </div>
    <el-dialog
        title="评论"
        :visible.sync="dialogVisible"
        width="40%" >
        <div class="quill-editor" 
            :content="content"
            @change="($event)"
            v-quill:myQuillEditor="editorOption">
        </div> 
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
    </div>
</template>
<script>
import '~/assets/css/page-sj-spit-index.css'
import spitApi from '@/api/spit'
import Auth from '@/utils/auth'
export default {
    asyncData(){
        return spitApi.search(1,10,{state:'1'}).then((res) => {
            let tmp = res.data.data.rows.map(item =>{
                 return {
                    ...item,
                    zan:''
                 }
            })
            return {items:tmp}
        })
    },
    data(){
        return{
            pageNum:1,
            dialogVisible:false,
            content: '',
            editorOption: {
            // some quill options
            modules: {
                toolbar: [
                [{ 'size': ['small', false, 'large'] }],
                ['bold', 'italic'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image']
                ]
            }
            }
        }
    },
    methods:{
        loadMore(){
            this.pageNum++;
            spitApi.search(this.pageNum,10,{state:'1'}).then((res) => {
                let tmp = res.data.data.rows.map(item =>{
                    return {
                        ...item,
                        zan:''
                    }
                 })
                this.items = this.items.concat(tmp)
            })
        },
        thumbup(index){
            if(Auth.getUser().name === undefined){
                this.$notify({
                    message:'必须登录才可以点赞',
                    type:'warning',
                    duration:2000
                })
                return
            }    
            if(this.items[index].zan === 'color'){
                this.$notify({
                    message:'您已点过赞了！',
                    type:'warning',
                    duration:2000
                })
                return
            }   
            this.items[index].zan = 'color'
            spitApi.thumbup(this.items[index].id).then(res =>{
                this.items[index].thumbup++
            })
        },
        onEditorChange({ editor, html, text }) {
            console.log('editor change!', editor, html, text)
            this.content = html
        },
    }
}
</script>
<style>
.quill-editor {
      min-height: 200px;
      max-height: 400px;
      overflow-y: auto;
    }

</style>
