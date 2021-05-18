<template>
  <div class="postList">
    <div v-if="isLoading" class="loading">
      <img src="../assets/img/loading.gif" alt="" />
    </div>
    <div class="posts">
      <ul>
        <li>
          <div class="topbar">
            <span
              @click="changeTab(value)"
              :class="{ selected: postTab === value }"
              v-for="(value, key, index) in tabMap"
              :key="index"
              >{{ key }}</span
            >
          </div>
        </li>
        <li v-for="post in posts" :key="post.id" class="postItem">
          <router-link
            :to="{
              name: 'Userinfo',
              params: {
                name: post.author.loginname,
              },
            }"
          >
            <img :src="post.author.avatar_url" alt="" />
          </router-link>
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
                name: post.author.loginname,
              },
            }"
            class="title oneLine"
          >
            <span class="">
              {{ post.title }}
            </span>
          </router-link>

          <span class="lastReply">
            {{ post.last_reply_at | formatDate }}
          </span>
        </li>
        <li class="pagination">
          <pagination @handle="renderList" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
const tabMap = {
  全部: "",
  精华: "good",
  分享: "share",
  问答: "ask",
  招聘: "job",
};
export default {
  components: {
    Pagination,
  },
  data: function () {
    return {
      isLoading: false,
      posts: [],
      postpage: 1,
      postTab: "",
      tabMap,
    };
  },
  methods: {
    getData() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            page: this.postpage,
            limit: 20,
            tab: this.postTab,
          },
        })
        .then((res) => {
          this.posts = res.data.data;
          console.log(this.posts);
          this.isLoading = false;
        })
        .catch();
    },
    renderList(value) {
      this.isLoading = true;
      this.postpage = value;
      this.getData();
    },
    changeTab(value) {
      this.isLoading = true;
      this.postTab = value;
      this.getData();
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
  white-space: nowrap;
  background: #e1e1e1;
  border-radius: 3px;
  position: relative;
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
        &.selected {
          color: white;
          background: #80bd01;
          border-radius: 3px;
        }
        &:not(.selected):hover {
          color: #9e78c0;
        }
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
        flex-grow: 1;
        width: 0;
        &:hover {
          cursor: pointer;
        }
      }
      > .lastReply {
        margin-left: auto;
        min-width: 3em;
        text-align: right;
      }
    }
    .pagination {
      background: white;
      padding: 4px;
    }
  }
}
img {
  height: 30px;
  width: 30px;
  border-radius: 3px;
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>