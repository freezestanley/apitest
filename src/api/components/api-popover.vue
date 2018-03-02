<template>
  <div class="api-tooltip" :style="{display: viewShow}">
    <ul>
      <li v-for="(value, key) in details" :key="key"><span>{{key}}:</span> {{value}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'api-popover',
  data () {
    return {
      isShow: this.visible
    }
  },
  watch: {
    visible: function (newValue) {
      this.isShow = newValue
    }
  },
  computed: {
    viewShow () {
      return this.isShow ? 'block' : 'none'
    }
  },
  props: {
    details: {
      type: Object
    },
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss' scoped>
  .api-tooltip {
    position: fixed;
    top: 100px;
    right: 10px;
    max-width: 320px;
    padding: 10px;
    background: #fff;
    box-shadow: 0 0 30px #ccc;
    border-radius: 10px;
    z-index: 9000;
    /*display:none;*/
    & > ul {
      padding: 3px 0;
      list-style: none;
      line-height: 24px;
      & > li span{
        color: #d95353;
      }
    }
  }
</style>
