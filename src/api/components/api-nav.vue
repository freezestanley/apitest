<template>
  <div :class="['api-nav', fold ? 'fold' : '']">
    <api-nav-item class="nav-list-box" :treeData="treeData"></api-nav-item>
    <span class="stretch-icon" @click="toggle()"></span>
  </div>
</template>

<script>
export default {
  name: 'api-nav',
  data () {
    return {
      fold: false
    }
  },
  props: {
    treeData: {
      type: Array
    }
  },
  methods: {
    toggle: function () {
      this.fold = !this.fold
    }
  }
}
</script>

<style lang='scss' scoped>
  .api-nav {
    position: relative;
    padding: 20px 0;
    width: 350px;
    overflow-y: auto;
    box-sizing: border-box;
    border-right: 1px solid rgba(0,0,0,.07);
    transition: all .3s;
    .stretch-icon {
      display: inline-block;
      position: absolute;
      right: 0;
      top: 50%;
      width: 20px;
      height: 20px;
      background: url(~@/assets/images/stretch-icon.png) no-repeat;
      background-size: contain;
      z-index: 10;
    }
    &.fold {
      width: 20px;
      & > .nav-list-box {
        display: none;
      }
      .stretch-icon {
        transform: rotate(180deg);
      }
    }
  }
</style>
