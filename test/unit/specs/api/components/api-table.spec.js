import Vue from 'vue'
import apiTable from '@/api/components/api-table'
import apiType from '@/api/components/api-type'

describe('api-table.vue', () => {
  const Constructor = Vue.extend({...apiTable, components: {apiType}})
  const vm = new Constructor({
    propsData: {
      title: 'props',
      tableData: [
        {
          name: 'propA',
          type: 'Number',
          descript: 'this is propA type Number',
          attr: [
            {
              name: 'required',
              defaultValue: true,
              descript: 'this is propA required'
            },
            {
              name: 'validator',
              defaultValue: 'asfddaf',
              descript: 'this is propA validator'
            }
          ]
        },
        {
          name: 'propB',
          type: 'String|Number',
          descript: 'this is propB type String, Number'
        },
        {
          name: 'propC',
          type: 'String',
          descript: 'this is propC type String',
          attr: [
            {
              name: 'required',
              defaultValue: true,
              descript: 'this is propC attr required'
            }
          ]
        }
      ]
    }
  }).$mount()
  it('should render correct contents', () => {
    expect(vm.$el.querySelector('.title').textContent)
      .toEqual('props')
    expect(vm.tableHead.toString())
      .toEqual('name,type,attr,descript')
  })
})
