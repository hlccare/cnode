<template>
  <div class="pagination">
    <button @click="goToTop">«</button>
    <button class="pagebtn pageEllipsis" v-if="isPrevHidden">...</button>
    <button
      :class="[
        { currentPage: btn === currentPage },
        { pageEllipsis: btn === '...' },
        'pagebtn',
      ]"
      @click="changePage(btn)"
      v-for="(btn, index) in pagebtns"
      :key="index"
    >
      {{ btn }}
    </button>
    <button @click="goToBottom">»</button>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "Pagination",
  data() {
    return {
      pagebtns: [1, 2, 3, 4, 5, "..."],
      currentPage: 1,
      isPrevHidden: false,
      totalCount: 500,
      pagesize: 20,
    };
  },
  methods: {
    goToTop() {
      this.changePage(1);
    },
    goToBottom() {
      this.changePage(this.totalCount / this.pagesize);
    },
    getPageNumberList(num, start, end, length = 5) {
      let array = [];
      console.log(num);
      console.log(start);
      console.log(end);
      if (end <= length) {
        for (let i = 1; i <= length; i++) {
          array.push(i);
        }
      } else if (end - num <= length) {
        for (let i = 0; i < length; i++) {
          array.push(end - i);
        }
        array.reverse();
      } else if (num - start < length / 2) {
        for (let i = 1; i <= length; i++) {
          array.push(i);
        }
      } else {
        for (let i = 0; i < length; i++) {
          array.push(num - Math.floor(length / 2) + i);
        }
      }
      return array;
    },
    changePage(btn) {
      if (btn === "...") return;
      let start = 1;
      let end = this.totalCount / this.pagesize;
      let length = 5;
      let list = this.getPageNumberList(Number(btn), start, end, length);
      if (Number(list[0]) === start && length < end) {
        list.push("...");
      } else if (Number(list[-1]) === end && length < end) {
        list.unshift("...");
      } else {
        list.push("...");
        list.unshift("...");
      }
      this.pagebtns = list;
      this.currentPage = btn;
      this.$emit("handle", this.currentPage);
    },
  },
};
</script>

<style lang='scss' scoped>
button {
  padding: 4px 12px;
  background: white;
  border: 1px solid #dddddd;
  border-right: none;
  color: #778087;
  cursor: pointer;
  &:first-child {
    border-radius: 3px 0 0 3px;
  }
  &:last-child {
    border-right: 1px solid #dddddd;
    border-radius: 0 3px 3px 0;
  }
}
.currentPage {
  color: #80bd84;
  cursor: default;
}
.pageEllipsis {
  cursor: default;
}
</style>