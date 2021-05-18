<template>
  <div>
    <Header />
    <div class="main">
      <div class="content-wrapper">
        <router-view name="main"></router-view>
      </div>
      <div class="sideBar-wrapper">
        <router-view name="sidebar"></router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Header from "@/components/Header.vue";
export default {
  name: "App",
  components: {
    Header,
  },
};
</script>
<style lang="scss">
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";
.main {
  display: flex;
  width: 90%;
  margin: 15px auto;
  min-height: 400px;
  > .content-wrapper {
    flex-grow: 1;
    width: 0;
    margin-right: 15px;
  }
  > .sideBar-wrapper {
    > .sideBar {
      width: 290px;
    }
  }
}
@media (max-width: 700px) {
  .sideBar-wrapper {
    display: none;
  }
  .main {
    width: 95%;
    > .content-wrapper {
      margin-right: 0px;
    }
  }
}
</style>
