<template>
    <div>
         <div class="tab-nav "> 
            <div class="wrapper"> 
                <ul class="fl sui-nav nav-tabs navbar-dark"> 
                    <router-link to="/qa/label/0" tag="li" active-class="active" exact><a>首页</a></router-link>
                    <router-link tag="li" :to="'/qa/label/'+item.id" active-class="active" v-for="(item,index) in labelList" :key="index">
                       <a> {{item.labelname}} </a>
                    </router-link>
                </ul> 
                <span class="fr more"><router-link to="/qa/tag">更多</router-link></span> 
                <div class="clearfix"></div> 
            </div> 
            </div> 
            <nuxt-child/>




    </div>
</template>
<script>
import '~/assets/css/page-sj-qa-logined.css'
import labelApi from '@/api/label'
export default {
    asyncData({params,error}){
        return labelApi.toplist().then((res) => {
                return {
                    labelList: res.data.data
                }
        })
    }
}
</script>
