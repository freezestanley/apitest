<template>
  <div class="api-index">
    <api-nav :treeData="treeData"></api-nav>
    <api-template :item="item" @show="show" @hide="hide"></api-template>
    <api-popover :visible="showPopover" :details="details"></api-popover>
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
      path: '',
      showPopover: false,
      details: {}
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
        val.path = val.path.replace('doc\\', '')
        if (val.type === 'file') {
          val.name = val.name.replace('.json', '')
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
    getNavData: function () {
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
    getData: function (path) {
      // this.axios.get(path).then((response) => {
      //   this.item = response.data
      // })
      if (path === indexDir) {
        this.item = {}
        return
      }
      this.item = require('../../doc/' + path)
    },
    show: function (item) {
      this.details = item
      this.showPopover = true
    },
    hide: function () {
      this.showPopover = false
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
    padding: 0 0 60px 390px;
    box-sizing: border-box;
  }
</style>
