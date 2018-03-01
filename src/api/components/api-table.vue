<template>
  <div class="api-table">
    <p class="title">{{title}}</p>
    <table>
      <thead>
        <tr>
          <th v-for="(val, index) of tableHead" :key="index">{{val}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(val, index) of tableData" :key="index">
          <td v-for="(key, _index) of tableHead" :key="_index">
            <div class="params-list" v-if="Object.prototype.toString.call(val[key]) === '[object Array]'" >
              <a v-for="(item, _key) in val[key]" :key="_key" @click="viewDetails(item)">{{item.name}}</a>
            </div>
            <ul class="obj-info" v-else-if="Object.prototype.toString.call(val[key]) === '[object Object]'" >
              <li v-for="(value, _key) in val[key]" :key="_key"><span>{{_key}}:</span> {{value}}</li>
            </ul>
            <span v-else>
              {{val[key]}}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'api-table',
  data () {
    return {
      tableHead: []
    }
  },
  props: {
    title: {
      type: String
    },
    tableData: {
      type: Array
    }
  },
  created () {
    this.changeTitle()
  },
  watch: {
    tableData () {
      this.changeTitle()
    }
  },
  methods: {
    viewDetails (item) {
      this.$emit('viewDetails', item)
    },
    changeTitle () {
      let tableHead = []
      for (let val of this.tableData) {
        tableHead = Array.from(new Set([...tableHead, ...Object.keys(val)]))
      }
      tableHead.sort((a, b) => {
        return a === 'descript' || b === 'name'
      })
      this.tableHead = tableHead
    }
  }
}
</script>

<style lang='scss' scoped>
  .api-table {
    & > .title {
      padding: 20px 0;
      font-size: 25px;
      color: #33ab70;
    }
    table {
      /*display: block;*/
      /*width: 100%;*/
      tr {
        border-top: 1px solid #ccc;
      }
      th, td {
        padding: 8px 13px;
        max-width: 320px;
        border: 1px solid #ddd;
        vertical-align: middle;
      }
      th {
        font-weight: bold;
        text-align: center;
      }
    }
    .params-list a {
      margin-right: 10px;
      color: #00c;
      text-decoration: underline;
      cursor: pointer;
    }
    .obj-info {
      padding: 3px 0;
      list-style: none;
      line-height: 24px;
      li > span {
        color: #d95353;
      }
    }
  }
</style>
