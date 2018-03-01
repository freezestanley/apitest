<script>
import apiComponent from './api-component.conf.js'

export default {
  functional: true,
  name: 'api-template',
  render: function (h, ctx) {
    let items = ctx.props.item
    function checkComponent (n) {
      let path = apiComponent['api-' + n]
      if (path) {
        return require('.' + path).default
      }
    }
    let idx = 0
    let children = []
    for (let i in items) {
      let ele = items[i]
      if (Object.prototype.toString.call(ele) === '[object String]') {
        ele = {list: [{descript: ele}]}
      } else if (Object.prototype.toString.call(ele) === '[object Array]') {
        ele = {list: ele}
      } else if (Object.prototype.toString.call(ele) === '[object Object]') {
        ele = {list: [ele]}
      }
      ele.idx = idx
      ele.type = i
      children.push(h('li', [h(checkComponent(ele.type), {props: ele})]))
      idx += 1
    }
    return h('ul', {class: 'api-template'}, children)
  },
  props: {
    item: {
      type: [Object, String]
    }
  }
}
</script>
<style lang='scss' rel="stylesheet/scss" scoped>
  @import '~@/assets/scss/_reset';
  .api-template {
    list-style: none;
  }
</style>
