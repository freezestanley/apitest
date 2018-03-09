import Vue from 'vue'
import router from '@/router'
import apiNavItem from '@/api/components/api-nav-item'
// Vue.use(router)
describe('api-nav-item.vue', () => {
  const Constructor = Vue.extend({...apiNavItem, router})
  const vm = new Constructor({
    propsData: {
      treeData: [
        {
          'path': 'json/src',
          'name': 'src',
          'type': 'folder',
          'open': true,
          'level': 0,
          'children': [
            {
              'path': 'json/src/components',
              'name': 'components',
              'type': 'folder',
              'level': 1,
              'children': [
                {
                  'path': 'json/src/components/demo1.json',
                  'name': 'demo1.json',
                  'type': 'file',
                  'level': 2
                },
                {
                  'path': 'json/src/components/HelloWorld.json',
                  'name': 'HelloWorld.json',
                  'type': 'file',
                  'level': 2
                }
              ]
            }
          ]
        }
      ]
    }
  }).$mount()
  it('should render correct contents', () => {
    expect(vm.$el.querySelector('.icon').className)
      .toContain('collapse')
    expect(vm.$el.textContent)
      .toContain('demo1')
  })
  it('toggle event', () => {
    const button = vm.$el.querySelector('.icon')
    const clickEvent = new window.Event('click')
    button.dispatchEvent(clickEvent)
    // 需要手动监听更新
    vm._watcher.run()

    expect(button.className).toContain('expand')
  })
})
