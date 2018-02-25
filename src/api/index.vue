<template>
  <div class="api-index">
    <h2 class="title">Components</h2>
    <div class="components-list">
      <router-link :to="{name: $route.name, query: {component: val}}" v-for="(val, key) of componentsList" :key="key" :class="{'selected': val === $route.query.component}">{{val}}</router-link>
    </div>
    <api-template :item="item"></api-template>
  </div>
</template>

<script>
import apiTemplate from './api-template'
import { componentsList } from './config/index'
import demo1 from '../../doc/src/components/demo1.json'
export default {
  name: 'index',
  components: {
    apiTemplate
  },
  data () {
    return {
      item: {},
      componentsList: componentsList
    }
  },
  created () {
    let name = this.$route.query.component
    this.getData(name)
  },
  methods: {
    getData (name) {
      this.item = demo1
      // this.axios.get(`/json/src/components/${name}.json`).then((response) => {
      //   this.item = response.data
      // })
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.name === from.name) {
      this.getData(to.query.component)
    }
    next()
  }
}
</script>

<style lang='scss' rel="stylesheet/scss">
  .api-index {
    padding: 0 10px 60px;
    box-sizing: border-box;
    & > .title {
      padding: 30px 0;
      font-size: 20px;
    }
    & > .components-list {
      padding-bottom: 30px;
      border-bottom: 2px solid #ccc;
      a {
        display: inline-block;
        margin-right: 10px;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        text-decoration: none;
        &.selected {
          background: #33ab70;
          color: #fff;
        }
      }
    }
  }
</style>
