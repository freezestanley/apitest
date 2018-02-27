<template>
  <div class="api-index">
    <api-nav :treeData="treeData"></api-nav>
    <api-template :item="item"></api-template>
  </div>
</template>

<script>
import apiTemplate from './api-template'
import apiNav from './components/api-nav'
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
    this.getNavData()
    this.getData(path)
  },
  methods: {
    parseFiles: function (data) {
      for (let val of data) {
        if (val.type === 'file') {
          val.path = val.path.substring(4, val.path.length)
        }
        val.open = true
        if (val.children) {
          this.parseFiles(val.children)
        }
      }
    },
    getNavData () {
      this.axios.get(`/json/index.json`).then((response) => {
        let data = [response.data]
        this.parseFiles(data)
        this.treeData = data
      })
    },
    getData (path) {
      this.axios.get(path).then((response) => {
        this.item = response.data
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

<style lang='scss'>
  @import '~@/assets/scss/_reset';
  .api-index {
    display: flex;
    padding: 0 0 60px;
    box-sizing: border-box;
  }
</style>
