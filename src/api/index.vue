<template>
  <div class="api-index">
    <h2 class="title">Components</h2>
    <api-template :item="item"></api-template>
  </div>
</template>

<script>
// import json from '../../doc/json/src/components/demo1.json'
import apiTemplate from './api-template'
import json from '../../doc/json/src/components/demo1.json'
console.log('json=', json)
export default {
  name: 'index',
  components: {
    apiTemplate
  },
  created () {
    this.item = json
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
