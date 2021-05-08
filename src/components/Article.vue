<template>
  <div class="article">
    <div class="loading" v-if="isLoading">加载中</div>
    <div v-else>
      <div class="topicHeader">
        <div class="topic-title">{{ post.title }}</div>
        <ul>
          <li>发布于：{{ post.create_at | formatDate }}</li>
          <li>作者：{{ post.author.loginname }}</li>
          <li>{{ post.visit_count }}次浏览</li>
          <li>来自{{ post | labelFormatter }}</li>
          <li></li>
        </ul>
      </div>
      <div class="topicContent markdown-body" v-html="post.content"></div>
    </div>
    <div>
      <div class="topbar"></div>
      <div v-for="(reply,index) in post.replies" :key="reply.id">
        <router-link :to="{
          name:'Userinfo',
          params:{
            name:reply.author.loginname
          }
        }">
        <img src="reply.author.avatar_url" alt="">
        </router-link>
        <span>{{reply.author.loginname}}</span>
        <span>{{index+1}}楼</span>
        <span v-if="reply.ups.length>0">{{reply.ups.length}}</span>
        <p v-html='reply.content'></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  beforeMount() {
    this.isLoading = true;
    this.getArticleData();
  },
};
</script>

<style lang="scss" scoped>
</style>