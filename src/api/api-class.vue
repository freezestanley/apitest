<template>
  <div>
    <api-table :tableData="tableData"></api-table>
  </div>
</template>

<script>
import apiTable from './components/api-table'
export default {
  name: 'api-class',
  components: {
    apiTable
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
    let list = []
    list.push({name: this.name, descript: this.descript})
    this.tableData = {title: this.type, list: list}
  }
}
</script>

<style lang='scss' rel="stylesheet/scss">
</style>
