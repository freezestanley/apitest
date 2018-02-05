<template>
  <div class="api-index">
    <h2 class="title">Components</h2>
    <api-template :item="item"></api-template>
  </div>
</template>

<script>
import apiTemplate from './api-template'
import demo1 from '../../doc/json/src/components/demo1.json'
import HelloWorld from '../../doc/json/src/components/HelloWorld.json'

export default {
  name: 'index',
  components: {
    apiTemplate
  },
  created () {
    let name = this.$route.query.name
    if (name === 'demo1') {
      this.item = demo1
    } else if (name === 'HelloWorld') {
      this.item = HelloWorld
    }
  }
}
</script>

<style lang='scss' rel="stylesheet/scss">
  .api-index {
    padding: 0 10px 60px;
    box-sizing: border-box;
    & > .title {
      padding: 30px 0;
      border-bottom: 2px solid #ccc;
      font-size: 20px;
    }
  }
</style>
