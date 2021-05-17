<template>
  <div class="sideBar">
    <Pannel>
      <template v-slot:topbar>作者</template>
      <template v-slot:content>
        <router-link
          :to="{
            name: 'Userinfo',
            params: {
              name: userinfo.loginname,
            },
          }"
        >
          <img :src="userinfo.avatar_url" alt="" />
          <span class="nameLabel">
            {{ userinfo.loginname }}
          </span>
        </router-link>
        <div>积分：{{ userinfo.score }}</div>
        <div></div>
      </template>
    </Pannel>
    <Pannel>
      <template v-slot:topbar>作者最近主题</template>
      <template v-slot:content>
        <ul>
          <li
            class="oneLine"
            :title="item.title"
            v-for="(item, index) in topicLimitedBy5"
            :key="index"
          >
            <router-link
              :to="{
                name: 'Post',
                params: {
                  id: item.id,
                  name: item.author.loginname,
                },
              }"
            >
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </template>
    </Pannel>
    <Pannel>
      <template v-slot:topbar>作者最近回复</template>
      <template v-slot:content>
        <ul>
          <li
            class="oneLine"
            :title="item.title"
            v-for="(item, index) in replyLimitedBy5"
            :key="index"
          >
            <router-link
              :to="{
                name: 'Post',
                params: {
                  id: item.id,
                  name: item.author.loginname,
                },
              }"
            >
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </template>
    </Pannel>
    <!-- <div class="authorSummary">
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
      <div class="recentTopics">
          <div class="topbar">作者最近主题</div>
          <ul>
              <li class="oneLine" 
              v-for="(item,index) in topicLimitedBy5" :key='index'>
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
              <li class="oneLine" 
              v-for="(item,index) in replyLimitedBy5" :key='index'>
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
      </div> -->
  </div>
</template>

<script>
import Pannel from "@/components/Pannel.vue";
export default {
  name: "Sidebar",
  components: {
    Pannel,
  },
  data() {
    return {
      isLoading: false,
      userinfo: {},
    };
  },
  beforeMount() {
    this.isLoading = true;
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then((res) => {
          (this.isLoading = false), (this.userinfo = res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    topicLimitedBy5() {
      if (this.userinfo.recent_topics && this.userinfo.recent_topics.length) {
        return this.userinfo.recent_topics.slice(0, 5);
      }
    },
    replyLimitedBy5() {
      if (this.userinfo.recent_replies && this.userinfo.recent_replies.length) {
        return this.userinfo.recent_replies.slice(0, 5);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sideBar {
}
img {
  width: 48px;
  height: 48px;
  border-radius: 3px;
  vertical-align: middle;
}
</style>