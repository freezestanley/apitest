<template>
  <div>
    <api-table :title="type" :tableData="tableData"></api-table>
  </div>
</template>

<script>
import apiTable from './components/api-table'
export default {
  name: 'api-components',
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
    let list = []
    for (let index in this.list) {
      list[index] = {name: this.list[index]}
    }
    this.tableData = list
  }
}
</script>

<style lang='scss' rel="stylesheet/scss">
</style>
