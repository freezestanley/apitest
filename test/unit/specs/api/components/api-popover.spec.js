import Vue from 'vue'
import apiPopover from '@/api/components/api-popover'

describe('api-popover.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(apiPopover)
    const vm = new Constructor({
      propsData: {
        visible: true,
        details: {
          name: 'paramsA',
          descript: '参数A'
        }
      }
    }).$mount()
    expect(vm.$el.style.display)
      .toEqual('block')
    expect(vm.$el.textContent)
      .toContain('参数A')
  })
})
