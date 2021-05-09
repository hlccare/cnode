<template>
  <div class="authorInfo">
      <div class="authorSummary">
          <div class="topbar">作者</div>
          <router-link :to="{
              name:'Userinfo',
              params:{
                  name:userinfo.loginname
              }
          }">
              <img :src="userinfo.avatar_url" alt="">
          </router-link>
      </div>
      <div class="recentTopic">
          <div class="topbar">作者最近主题</div>
          <ul>
              <li v-for="(item,index) in topicLimitedBy5" :key='index'>
                  <router-link :to="{
                      name:'Post',
                      params:{
                          id:item.id,
                          name:item.author.loginname  
                      }
                  }">

                  {{item.title}}
                  </router-link>
              </li>
          </ul>
      </div>
      <div class="recentReplies">
          <div class="topbar">作者最近回复</div>
          <ul>
              <li v-for="(item,index) in topicLimitedBy5" :key='index'>
                  <router-link :to="{
                      name:'Post',
                      params:{
                          id:item.id,
                          name:item.author.loginname  
                      }
                  }">

                  {{item.title}}
                  </router-link>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    name:"Sliderbar",
    data(){
        return {
            isLoading:false,
            userinfo:{}
        }
    },
    beforeMount(){
        this.isLoading = true
        this.getData()
    },
    methods:{
        getData(){
            this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
            .then(res=>{
                this.isLoading = false,
                this.userinfo = res.data.data
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    computed:{
        topicLimitedBy5(){
            if(this.userinfo.recent_topics&&this.userinfo.recent_topics.length){
                return this.userinfo.recent_topics.slice(0,5);
            }
        },
        replyLimitedBy5(){
            if(this.userinfo.recent_replies&&this.userinfo.recent_replies.length){
                return this.userinfo.recent_replies.slice(0,5);
            }
        },
    },
    
}
</script>

<style>

</style>