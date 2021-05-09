<template>
  <div class="pannel">
      <div class="topbar">
          <slot name="topbar"/>
      </div>
      <div class="inner">
          <slot name="content"/>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.pannel{
    font-size: 14px;
    color: #778087;
    border-radius: 3px;
    margin-bottom: 15px;
    background: white;
    > .topbar{
        background: #f6f6f6;
        padding: 10px;
    }
    > .inner{
        padding: 10px 10px 20px 10px;
        line-height: 2em;
    }
}
</style>