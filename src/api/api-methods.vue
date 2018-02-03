<template>
  <div>
    <api-table :title="type" :tableData="tableData" @viewDetails="viewDetails"></api-table>
    <api-modal :visible="showModal" @hide="hideModal">
      <api-table :title="details.name" :tableData="details"></api-table>
    </api-modal>
  </div>
</template>

<script>
import apiTable from './components/api-table'
import apiModal from './components/api-modal'
export default {
  name: 'api-methods',
  components: {
    apiTable,
    apiModal
  },
  data () {
    return {
      tableData: [],
      showModal: false,
      details: []
    }
  },
  props: {
    type: {
      type: String
    },
    list: {
      type: Array
    }
  },
  created () {
    this.tableData = this.transferList(this.list)
  },
  methods: {
    transferAttr (list) {
      for (let i in list) {
        let val = list[i]
        for (let key in val.defVal) {
          list[i].name = key
          list[i].defaultValue = val.defVal[key]
          delete list[i].defVal
        }
      }
      return list
    },
    transferList (list) {
      for (let i in list) {
        let val = list[i]
        if (val.params) {
          val.params = this.transferAttr(val.params)
        }
      }
      return list
    },
    viewDetails (item) {
      console.log(item)
      this.details = [item]
      this.showModal = true
    },
    hideModal () {
      this.showModal = false
    }
  }
}
</script>

<style lang='scss' rel="stylesheet/scss">
</style>
