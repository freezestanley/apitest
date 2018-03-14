<template>
  <div class="api-index">
    <div class="logo"></div>
    <api-nav :treeData="treeData"></api-nav>
    <api-template :item="item" @show="show" @hide="hide"></api-template>
    <api-popover :visible="showPopover" :details="details"></api-popover>
  </div>
</template>

<script>
let indexDir = 'index.json'
export default {
  name: 'index',
  data () {
    return {
      item: {},
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
        val.path = val.path.indexOf('doc\\') > -1 ? val.path.replace('doc\\json/', '') : val.path.replace('doc/json/', '')
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
        val.open = val.level < 1 ? true : val.open
        if (val.children) {
          this.parseFiles(val.children, val.level)
        }
      }
    },
    getNavData: function () {
      let data = require('$doc/' + indexDir)
      data = [data.children[1]]
      this.parseFiles(data)
      // console.log('data', data)
      this.treeData = data
    },
    getData: function (path) {
      if (!path) {
        this.item = {}
        return
      }
      this.item = require('$doc/' + path)
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
    /*margin-top: 50px;*/
    margin: 0 20px 60px 590px;
    box-sizing: border-box;
    .logo {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: 200px;
      background-color: #efefef;
    }
  }
</style>
