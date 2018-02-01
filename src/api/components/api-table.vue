<template>
  <div class="api-table">
    <p class="title">{{tableData.title}}</p>
    <table>
      <tr>
        <th v-for="(val, key) in tableData.list[0]" :key="key">{{key}}</th>
      </tr>
      <tr v-for="(val, index) of tableData.list" :key="index">
        <td v-for="(_val, key) in val" :key="key + index">{{_val}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
// import apiTemplate from './api-template'
export default {
  name: 'api-table',
  props: {
    tableData: {
      type: [Object, Array],
      default () {
        return {
          title: 'class',
          list: [{
            descript: 'class描述',
            name: 'aafddfdfs'
          }]
        }
      }
    }
  },
  created () {
    // this.title = this.tableData.title
  }
}
</script>

<style lang='scss' rel="stylesheet/scss">
</style>
