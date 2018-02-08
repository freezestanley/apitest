<template>
  <div>
    <api-table :title="type" :tableData="tableData" @viewDetails="viewDetails"></api-table>
    <api-modal :visible="showModal" @hide="hideModal">
      <api-table :title="details.name" :tableData="details"></api-table>
    </api-modal>
  </div>
</template>

<script>
import apiTable from '../components/api-table'
import apiModal from '../components/api-modal'
let allFunctions
let transformData = (list, parentLevel, parentLevelName) => {
  if (!list) {
    return
  }
  for (let val of list) {
    if (parentLevel === undefined) {
      val.level = 0
      val.levelName = `${val.name}`
    } else {
      val.level = parentLevel + 1
      val.levelName = `${parentLevelName} > ${val.name}`
    }
    allFunctions.push(val)
    transformData(val.function, val.level, val.levelName)
  }
}
export default {
  name: 'api-function',
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
    allFunctions = []
    transformData(this.list)
    this.filterData()
    this.tableData = allFunctions
  },
  methods: {
    // 筛选数据
    filterData () {
      let list = []
      for (let i in allFunctions) {
        let val = allFunctions[i]
        list[i] = {
          name: val.name,
          descript: val.descript,
          params: val.params,
          return: val.return,
          level: val.level,
          levelName: val.levelName
        }
      }
      allFunctions = list
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
