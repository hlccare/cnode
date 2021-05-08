import PostList from '@/components/PostList.vue';
<template>
  <div class="postList">
    <div v-if="isLoading" class="loading">加载中</div>
    <div class="posts">
      <ul>
        <li>
          <div class="topbar">
            <span>全部</span>
            <span>精华</span>
            <span>分享</span>
            <span>问答</span>
            <span>招聘</span>
          </div>
        </li>
        <li v-for="post in posts" :key="post.id" class="postItem">
          <img :src="post.author.avatar_url" alt="" />
          <span class="count">
            <span class="replyCount">{{ post.reply_count }}</span
            >/<span class="visitCount">{{ post.visit_count }}</span>
          </span>
          <span
            :class="[
              {
                postGood: post.good,
                postTop: post.top,
                topicListTab: !post.good && !post.top,
              },
              'postTab',
            ]"
          >
            {{ post | labelFormatter }}
          </span>
          <router-link
            :to="{
              name: 'Post',
              params: {
                id: post.id,
              },
            }"
          >
            <span class="title">
              {{ post.title }}
            </span>
          </router-link>

          <span class="lastReply">
            {{ post.last_reply_at | formatDate }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      isLoading: false,
      posts: [],
    };
  },
  methods: {
    getData() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            page: 1,
            limit: 20,
          },
        })
        .then((res) => {
          this.isLoading = false;
          console.log(res);
          this.posts = res.data.data;
          console.log(this.posts);
        })
        .catch();
    },
  },
  beforeMount() {
    this.isLoading = true;
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.postList {
  background: #e1e1e1;
  > .posts {
    .topbar {
      background: #f5f5f5;
      padding: 10px;
      > span {
        font-size: 14px;
        color: #80bd01;
        padding: 3px 4px;
        margin: 0 10px;
        cursor: pointer;
      }
    }
    .postItem {
      padding: 8px;
      font-size: 15px;
      background: white;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f0f0f0;
      .count {
        width: 70px;
        text-align: center;
        > .replyCount {
          font-size: 14px;
        }
        > .visitCount {
          font-size: 10px;
          color: grey;
        }
      }
      > .postTab {
        font-size: 12px;
        padding: 2px 4px;
        border-radius: 3px;
      }
      > .postGood,
      .postTop {
        background: #80db01;
        color: white;
      }
      > .topicListTab {
        background: #e5e5e5;
        color: #999;
      }
      .title {
        margin-left: 4px;
        &:hover {
          cursor: pointer;
        }
      }
      > .lastReply {
        margin-left: auto;
      }
    }
  }
}
img {
  height: 30px;
  width: 30px;
  border-radius: 3px;
}
</style>