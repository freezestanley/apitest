<template>
  <div class="api-index">
    <api-nav :treeData="treeData"></api-nav>
    <api-template :item="item"></api-template>
  </div>
</template>

<script>
import apiTemplate from './api-template'
import apiNav from './components/api-nav'
// let list
let parseFiles = (data) => {
  for (let val of data) {
    if (val.type === 'file') {
      // list.push({
      //   name: val.name.substring(0, val.name.length - 5),
      //   path: val.path.substring(4, val.path.length)
      // })
      val.path = val.path.substring(4, val.path.length)
    }
    val.open = true
    if (val.children) {
      parseFiles(val.children)
    }
  }
}
export default {
  name: 'index',
  components: {
    apiTemplate,
    apiNav
  },
  data () {
    return {
      item: {},
      componentsList: [],
      treeData: []
    }
  },
  created () {
    let path = this.$route.query.path
    // list = []
    this.getNavData()
    this.getData(path)
  },
  methods: {
<<<<<<< HEAD
    getData (name) {
      this.axios.get(`/json/src/components/${name}.json`).then((response) => {
        // this.item = response.data
        this.item = demo1
=======
    getNavData () {
      this.axios.get(`/json/index.json`).then((response) => {
        let data = [response.data]
        parseFiles(data)
        console.log('data=', data)
        this.treeData = data
      })
    },
    getData (path) {
      this.axios.get(path).then((response) => {
        this.item = response.data
>>>>>>> origin/lisanmei
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.name === from.name) {
      this.getData(to.query.path)
    }
    next()
  }
}
</script>

<style lang='scss' rel="stylesheet/scss">
  .api-index {
    display: flex;
    padding: 0 10px 60px;
    box-sizing: border-box;
    & > .api-template {
      flex: 1;
    }
  }
</style>
