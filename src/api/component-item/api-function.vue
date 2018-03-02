<template>
  <div>
    <api-table :title="type" :tableData="tableData" @show="show" @hide="hide"></api-table>
  </div>
</template>

<script>
import util from '../utils/index'
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
    if (val.return && val.return.defVal) {
      val.return.default = val.return.defVal.default
      delete val.return.defVal
      util.sort(val.return)
    }
    allFunctions.push(val)
    transformData(val.function, val.level, val.levelName)
  }
}
export default {
  name: 'api-function',
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
      allFunctions = util.transferList(list)
    },
    show (item) {
      this.$emit('show', item)
    },
    hide () {
      this.$emit('hide')
    }
  }
}
</script>
