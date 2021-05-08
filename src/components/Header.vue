<template>
  <div class="header">
    <svg class="logo">
      <use xlink:href="#logo" />
    </svg>
    <ul>
      <li><a href="#">首页</a></li>
      <li><a href="#">新手</a></li>
      <li><a href="#">API</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">登录</a></li>
      <li><a href="#">注册</a></li>
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
  > .logo {
    max-width: 120px;
    max-height: 30px;
    margin-left: 50px;
  }
  > ul {
    list-style: none;
    margin-right: 16px;
    > li {
      display: inline-block;
      padding: 0 16px;
      color: white;
    }
  }
}
</style>