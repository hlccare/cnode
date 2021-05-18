<template>
  <div class="header">
    <router-link to="/">
      <svg class="logo">
        <use xlink:href="#logo" />
      </svg>
    </router-link>
    <ul>
      <router-link to="/">
        <li>首页</li>
      </router-link>
      <router-link to="/">
        <li>API</li>
      </router-link>
      <router-link to="/">
        <li>关于</li>
      </router-link>
    </ul>
  </div>
</template>

<script>
import logo from "@/assets/img/logo.svg";
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
.header {
  background: #444444;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    max-width: 120px;
    max-height: 30px;
    margin-left: 50px;
  }
  > ul {
    list-style: none;
    margin-right: 16px;
    li {
      display: inline-block;
      padding: 0 16px;
      color: #cccccc;
      &:hover {
        color: white;
      }
    }
  }
}
@media (max-width: 700px) {
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    > ul {
      display: none;
    }
    .logo {
      margin-left: 0;
    }
  }
}
</style>