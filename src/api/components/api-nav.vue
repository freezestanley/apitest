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
    padding-top: 20px;
    width: 400px;
  }
</style>
