<script>
import apiClass from './api-class'

export default {
  functional: true,
  name: 'api-template',
  render: function (h, ctx) {
    let items = ctx.props.item
    function checkComponent (n) {
      if (n === 'class') {
        return apiClass
      }
    }
    let idx = 0
    let children = []
    for (let i in items) {
      let ele = items[i]
      if (typeof ele === 'string') {
        ele = {descript: ele}
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
