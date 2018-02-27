<template>
  <div class="api-nav">
    <api-nav-item :treeData="treeData"></api-nav-item>
  </div>
</template>

<script>
import apiNavItem from './api-nav-item'
export default {
  name: 'api-nav',
  components: {
    apiNavItem
  },
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
