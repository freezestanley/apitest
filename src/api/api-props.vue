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
import util from './util'
export default {
  name: 'api-props',
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
    this.tableData = util.transferList(this.list)
  },
  methods: {
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
