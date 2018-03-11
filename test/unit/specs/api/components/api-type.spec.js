import Vue from 'vue'
import apiType from '@/api/components/api-type'

describe('api-type.vue', () => {
  const Constructor = Vue.extend(apiType)
  const vm = new Constructor({
    propsData: {
      type: 'String|number'
    }
  }).$mount()
  it('should render correct contents', () => {
    expect(vm.$el.querySelectorAll('.type')[0].textContent)
      .toEqual('String')
    expect(vm.$el.querySelectorAll('.type')[1].textContent)
      .toEqual('Number')
  })
  it('methods upperCase', () => {
    expect(vm.upperCase('string'))
      .toEqual('String')
  })
})
