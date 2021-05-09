<template>
  <div>
    <Header />
    <div class="main">
      <div class="content-wrapper">
      <router-view name="main"></router-view>
      </div>
      <div class="siderBar-wrapper">
      <router-view name="sliderbar"></router-view>

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
.main{
  display: flex;
  width: 90%;
  margin: 15px auto;
  min-height: 400px;
  > .content-wrapper{
    flex-grow: 1;
    width: 0;
    margin-right: 15px;
  }
}
</style>
