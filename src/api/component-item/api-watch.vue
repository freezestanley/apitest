<template>
  <div>
    <api-table :title="type" :tableData="tableData" @show="show" @hide="hide"></api-table>
  </div>
</template>

<script>
import util from '../utils/index'
export default {
  name: 'api-watch',
  data () {
    return {
      tableData: []
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
    show: function (item) {
      this.$emit('show', item)
    },
    hide: function () {
      this.$emit('hide')
    }
  }
}
</script>
