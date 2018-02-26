<template>
  <div class="api-table">
    <p class="title">{{title}}</p>
    <table>
      <thead>
        <tr>
          <th v-for="(val, key) in tableData[0]" :key="key" v-if="key !== 'descript'">{{key}}</th>
          <th v-for="(val, key) in tableData[0]" :key="key" v-if="key === 'descript'">{{key}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(val, index) of tableData" :key="index">
          <td v-for="(_val, key) in val" :key="key + index" v-if="key !== 'descript'">
            <div class="params-list" v-if="Object.prototype.toString.call(_val) === '[object Array]'" >
              <a v-for="(item, _key) in _val" :key="_key" @click="viewDetails(item)">{{item.name}}</a>
            </div>
            <ul class="obj-info" v-else-if="Object.prototype.toString.call(_val) === '[object Object]'" >
              <li v-for="(value, _key) in _val" :key="_key"><span>{{_key}}:</span> {{value}}</li>
            </ul>
            <span v-else>
              {{_val}}
            </span>
          </td>
          <td v-for="(_val, key) in val" :key="key + index" v-if="key === 'descript'">
            <span>
              {{_val}}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import apiTemplate from './api-template'
export default {
  name: 'api-table',
  props: {
    title: {
      type: String
    },
    tableData: {
      type: Array
    }
  },
  methods: {
    viewDetails (item) {
      this.$emit('viewDetails', item)
    }
  }
}
</script>

<style lang='scss' rel="stylesheet/scss">
  .api-table {
    & > .title {
      padding: 20px 0;
      font-size: 25px;
      color: #33ab70;
    }
    table {
      display: block;
      width: 100%;
      tr {
        border-top: 1px solid #ccc;
      }
      th, td {
        padding: 6px 13px;
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
      list-style: none;
      li {
        padding-bottom: 5px;
        & > span {
          color: #d95353;
        }
      }
    }
  }
</style>
