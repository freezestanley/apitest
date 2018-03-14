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
    &.fold {
      width: 20px;
      border-right: none;
      & > .nav-list-box {
        display: none;
      }
      .stretch-icon {
        transform: rotate(180deg);
      }
    }
  }
</style>
