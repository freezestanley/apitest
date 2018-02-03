<template>
  <div>
    <api-table :title="type" :tableData="tableData"></api-table>
  </div>
</template>

<script>
import apiTable from './components/api-table'
export default {
  name: 'api-computed',
  components: {
    apiTable
  },
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

<style lang='scss' rel="stylesheet/scss">
</style>
