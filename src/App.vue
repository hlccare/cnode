<template>
  <div>
    <Header />
    <div class="main">
      <router-view name="main"></router-view>
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
</style>
