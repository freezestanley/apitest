<template>
  <div class="api-index">
    <div :class="['logo', fold ? 'fold' : '']"><span class="stretch-icon" @click="toggle()"></span></div>
    <api-nav class="nav-box" :treeData="treeData"></api-nav>
    <div class="main">
      <api-template :item="item" @show="show" @hide="hide"></api-template>
    </div>
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
      details: {},
      fold: false
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
    },
    toggle: function () {
      this.fold = !this.fold
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
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    box-sizing: border-box;
    .logo {
      position: relative;
      width: 200px;
      height: 100%;
      background-color: #efefef;
      transition: all .3s;
      .stretch-icon {
        bottom: 0;
      }
      &.fold {
        width: 0;
        .stretch-icon {
          transform: rotate(180deg);
          right: -18px;
        }
      }
    }
    .nav-box {
      height: 100%;
    }
    .main {
      flex: 1;
      padding: 0 30px 30px;
      height: 100%;
      overflow-y: auto;
      box-sizing: border-box;
    }
    .stretch-icon {
      display: inline-block;
      position: absolute;
      right: -18px;
      width: 16px;
      height: 26px;
      background-color: #f5f5f5;
      border: 1px solid #e0e1e5;
      border-radius: 0 4px 4px 0;
      /*background: url(~@/assets/images/stretch-icon.png) no-repeat;*/
      /*background-size: contain;*/
      z-index: 10;
      /*border-radius: 50%;*/
      cursor: pointer;
      &:before {
        position: absolute;
        left: 1px;
        top: 8px;
        content: " ";
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-right-color: #aaa;
      }
    }
  }
</style>
