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
    width: 350px;
    box-sizing: border-box;
    border-right: 1px solid rgba(0,0,0,.07);
    transition: all .3s;
    .stretch-icon {
      bottom: 0;
    }
    &.fold {
      width: 0;
      border-right: none;
      & > .nav-list-box {
        display: none;
      }
      .stretch-icon {
        transform: rotate(180deg);
        right: -18px;
      }
    }
    .nav-list-box {
      padding: 20px 0;
      height: 100%;
      overflow-y: auto;
      box-sizing: border-box;
    }
  }
</style>
