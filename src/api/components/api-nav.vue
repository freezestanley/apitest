<template>
  <div class="api-nav">
    <!--<p class="nav-header">Components</p>-->
    <!--<ul>-->
      <!--<li v-for="(val, key) of componentsList" :key="key"><router-link :to="{name: $route.name, query: {path: val.path}}" :class="{'selected': val.path === $route.query.path}">{{val.name}}</router-link></li>-->
    <!--</ul>-->
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

<style lang='scss' rel="stylesheet/scss">
  .api-nav {
    padding-top: 20px;
    width: 400px;
  }
</style>
