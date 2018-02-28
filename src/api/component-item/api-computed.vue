<template>
  <div>
    <api-table :title="type" :tableData="tableData" @viewDetails="viewDetails"></api-table>
    <api-modal :visible="showModal" @hide="hideModal">
      <api-table :title="details.name" :tableData="details"></api-table>
    </api-modal>
  </div>
</template>

<script>
import util from '../utils/index'
export default {
  name: 'api-computed',
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
      this.details = [item]
      this.showModal = true
    },
    hideModal () {
      this.showModal = false
    }
  }
}
</script>
