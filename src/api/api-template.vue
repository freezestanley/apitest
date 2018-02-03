<script>
import apiClass from './api-class'
import apiComponents from './api-components'
import apiComputed from './api-computed'
import apiEvent from './api-event'
import apiExtend from './api-extend'
import apiFunction from './api-function'
import apiMethods from './api-methods'
import apiMixins from './api-mixins'
import apiProps from './api-props'
import apiWatch from './api-watch'

export default {
  functional: true,
  name: 'api-template',
  render: function (h, ctx) {
    let items = ctx.props.item
    function checkComponent (n) {
      if (n === 'class') {
        return apiClass
      } else if (n === 'components') {
        return apiComponents
      } else if (n === 'computed') {
        return apiComputed
      } else if (n === 'event') {
        return apiEvent
      } else if (n === 'extend') {
        return apiExtend
      } else if (n === 'function') {
        return apiFunction
      } else if (n === 'methods') {
        return apiMethods
      } else if (n === 'mixins') {
        return apiMixins
      } else if (n === 'props') {
        return apiProps
      } else if (n === 'watch') {
        return apiWatch
      }
    }
    let idx = 0
    let children = []
    for (let i in items) {
      let ele = items[i]
      if (Object.prototype.toString.call(ele) === '[object String]') {
        ele = {descript: ele}
      } else if (Object.prototype.toString.call(ele) === '[object Array]') {
        ele = {list: ele}
      }
      ele.idx = idx
      ele.type = i
      if (!ele.hideComp) {
        children.push(h('li', {style: {display: 'block'}}, [h(checkComponent(ele.type), {props: ele})]))
      } else {
        children.push(h('li', {style: {display: 'none'}}, [h(checkComponent(ele.type), {props: ele})]))
      }
      idx += 1
    }
    return h('ul', {class: 'api-template'}, children)
    // let children = items.map((ele, index, array) => {
    //   if (!ele.hideComp) {
    //     ele.idx = index
    //     return h('li', {}, [h(checkComponent(ele.type), {props: ele, on: ele.on})])
    //   }
    // })

    // return h('ul', {class: 'axa-form'}, children)
  },
  props: {
    item: {
      type: [Object, String]
    }
  }
}
</script>
<style lang='scss' rel="stylesheet/scss">
  @import '~@/assets/scss/_reset';
</style>
