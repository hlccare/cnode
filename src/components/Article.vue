<template>
  <div class="article">
    <div class="loading" v-if="isLoading">加载中</div>
    <div v-else>
      <div class="topicHeader">
        <div class="topicTitle oneLine" :title="post.title">{{ post.title }}</div>
        <ul class="topicInfo">
          <li>发布于：{{ post.create_at | formatDate }}</li>
          <li>作者：{{ post.author.loginname }}</li>
          <li>{{ post.visit_count }}次浏览</li>
          <li>来自{{ post | labelFormatter }}</li>
        </ul>
      </div>
      <div class="topicContent markdown-body" v-html="post.content"></div>
    </div>
    <Pannel class="topicReplies">
      <template v-slot:topbar>{{post.replies&&post.replies.length}} 回复</template>
      <template v-slot:content>
        <div v-for="(reply,index) in post.replies" :key="reply.id">
          <div class="replyInfo">
            <router-link :to="{
              name:'Userinfo',
              params:{
                name:reply.author.loginname
              }
            }">
            <img :src="reply.author.avatar_url" alt="">
            </router-link>
            
            <span class='replyName'>{{reply.author.loginname}}</span>
            <span class="replyIndex">{{index+1}}楼</span>
            <span class="replyTime">{{reply.create_at | formatDate}}</span>
            <span v-if="reply.ups.length>0" class="replyLike">👍{{reply.ups.length}}</span>
          </div>
          <p v-html='reply.content' class="replyContent"></p>
        </div>
      </template>
    </Pannel>
  </div>
</template>

<script>
import Pannel from './Pannel.vue';
export default {
  components:{
    Pannel
  },
  data: function () {
 
    return {
      isLoading: false,
      post: {},
    };
  },
  methods: {
    getArticleData() {
      console.log(this.$route.params.id);
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then((res) => {
          this.post = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  
    watch:{
        $route(to,from){
            this.getArticleData();
        }
    },
  beforeMount() {
    this.isLoading = true;
    this.getArticleData();
  },
};
</script>

<style lang="scss" scoped>
.article{
  .topicHeader{
    padding: 10px;
    border-radius: 3px 3px 0 0;
    background: white;
    border-bottom: 1px solid #e5e5e5;
    .topicTitle{
      font-size: 22px;
      font-weight: 700;
      line-height: 2em;
    }
    .topicInfo{
      font-size: 12px;
      color: #838383;
      >li{
        display: inline;
        &::before{
          content:' • '
        }
      }
    }
  }
  .topicContent{
    padding: 20px;
    background: white;
    border-radius: 0 0 3px 3px;
    margin-bottom: 15px;
  }
  .topicReplies{
    .replyInfo{
      display: flex;
    }
    .replyContent{
      padding:0 50px;
      color: #333;
      
      ::v-deep img{
        max-width: 100%;
      }
    }
    img{
      width: 30px;
      height: 30px;
      border-radius: 3px;
      vertical-align: middle;
    }
    .replyName{
      color:#666666;
      font-size: 12px;
      font-weight: 700;
      margin-left: 10px;
    }
    .replyIndex{
      margin-left: 4px;
      font-size: 11px;
      color: #08c;
    }
    .replyTime{
      font-size: 11px;
      color:#08c;
      &::before{
        content:'•';
      }
    }
    .replyLike{
      margin-left: auto;
    }
  }
}

</style>