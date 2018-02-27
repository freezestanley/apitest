<template>
  <div>
    <api-table :title="type" :tableData="tableData"></api-table>
  </div>
</template>

<script>
import apiTable from '../components/api-table'
export default {
  name: 'api-mixins',
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

<style lang='scss' rel="stylesheet/scss">
</style>
