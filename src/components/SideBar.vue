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
          v-if="userinfo.loginname"
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
            v-for="(item, index) in topicList"
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
            v-for="(item, index) in replyList"
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
  </div>
</template>

<script>
import Pannel from "@/components/Pannel.vue";
export default {
  name: "Sidebar",
  components: {
    Pannel,
  },
  props: {
    isLimited: {
      type: Boolean,
      default: true,
    },
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
    topicList() {
      if (this.isLimited) {
        if (this.userinfo.recent_topics && this.userinfo.recent_topics.length) {
          return this.userinfo.recent_topics.slice(0, 5);
        }
      } else {
        return this.userinfo.recent_topics;
      }
    },
    replyList() {
      if (this.isLimited) {
        if (
          this.userinfo.recent_replies &&
          this.userinfo.recent_replies.length
        ) {
          return this.userinfo.recent_replies.slice(0, 5);
        }
      } else {
        return this.userinfo.recent_replies;
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