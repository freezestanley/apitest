<template>
  <div class="api-index">
    <api-nav :treeData="treeData"></api-nav>
    <api-template :item="item"></api-template>
  </div>
</template>

<script>
let indexDir = 'json/index.json'
export default {
  name: 'index',
  data () {
    return {
      item: {},
      componentsList: [],
      treeData: [],
      path: ''
    }
  },
  created () {
    this.path = this.$route.query.path
    this.getNavData()
    if (this.path) {
      this.getData(this.path)
    }
  },
  methods: {
    parseFiles: function (data, parentLevel) {
      for (let val of data) {
        val.path = val.path.substring(4, val.path.length)
        if (val.type === 'file') {
          val.name = val.name.substring(0, val.name.length - 5)
        }
        if (parentLevel === undefined) {
          val.level = 0
        } else {
          val.level = parentLevel + 1
        }
        if (!this.path) {
          val.open = false
        } else if (val.path === this.path || this.path.indexOf(val.path + '/') === 0) {
          val.open = true
        }
        val.open = val.level < 2 ? true : val.open
        if (val.children) {
          this.parseFiles(val.children, val.level)
        }
      }
    },
    getNavData () {
      // this.axios.get(`/json/index.json`).then((response) => {
      //   let data = [response.data]
      //   this.parseFiles(data)
      //   this.treeData = data
      // })
      let data = [require('../../doc/' + indexDir)]
      this.parseFiles(data)
      // console.log('data', data)
      this.treeData = data
    },
    getData (path) {
      // this.axios.get(path).then((response) => {
      //   this.item = response.data
      // })
      if (path === indexDir) {
        this.item = {}
        return
      }
      // for (let val in this.treeData) {
      //   if (val.p)
      // }
      this.item = require('../../doc/' + path)
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
    position: relative;
    /*display: flex;*/
    padding: 0 0 60px 370px;
    box-sizing: border-box;
  }
</style>
