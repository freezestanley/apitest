<template>
  <div>
    <api-table :title="type" :tableData="tableData"></api-table>
  </div>
</template>

<script>
export default {
  name: 'api-class',
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
    this.tableData = this.list
  }
}
</script>
