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
    name: {
      type: String
    },
    descript: {
      type: String
    }
  },
  created () {
    this.tableData = [{name: this.name, descript: this.descript}]
  }
}
</script>
