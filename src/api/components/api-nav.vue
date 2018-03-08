<template>
  <div class="api-nav">
    <api-nav-item :treeData="treeData"></api-nav-item>
  </div>
</template>

<script>
export default {
  name: 'api-nav',
  props: {
    treeData: {
      type: Array
    }
  }
}
</script>

<style lang='scss' scoped>
  .api-nav {
    position: fixed;
    left: 200px;
    top: 0;
    bottom: 0;
    padding: 20px 0;
    width: 350px;
    overflow-y: auto;
    border-right: 1px solid rgba(0,0,0,.07);
  }
</style>
