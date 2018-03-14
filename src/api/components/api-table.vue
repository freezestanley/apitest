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
              <a v-for="(item, _key) in val[key]" :key="_key" @mouseenter="show(item)" @mouseleave="hide()">{{item.name}}</a>
            </div>
            <ul class="obj-info" v-else-if="Object.prototype.toString.call(val[key]) === '[object Object]'" >
              <li v-for="(value, _key) in val[key]" :key="_key">
                <span>{{_key}}:</span>
                <api-type v-if="_key === 'type'" :type="value" class="label-text"></api-type>
                <a v-else-if="_key === 'descript'" @mouseenter="show({'descript': value})" @mouseleave="hide()">descript</a>
                <div v-else class="label-text">
                  {{value}}
                </div>
              </li>
            </ul>
            <api-type v-else-if="key === 'type'" :type="val[key]"></api-type>
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
    show (item) {
      this.$emit('show', item)
    },
    hide () {
      this.$emit('hide')
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
        &:nth-child(2n) {
          background-color: #f8f8f8
        }
      }
      th, td {
        padding: 6px 13px;
        max-width: 320px;
        line-height: 24px;
        border: 1px solid #ddd;
        vertical-align: middle;
      }
      th {
        font-weight: bold;
        text-align: center;
      }
    }
    a {
      color: #4078c0;
      cursor: pointer;
      &:hover {
        color: #288af0;
      }
    }
    .params-list a {
      display: inline-block;
      margin-right: 10px;
      /*color: #4078c0;*/
      /*text-decoration: underline;*/
      /*cursor: pointer;*/
      transition: color .3s;
      /*&:hover {*/
        /*color: #288af0;*/
      /*}*/
    }
    .obj-info {
      padding: 3px 0;
      list-style: none;
      line-height: 24px;
      li > span {
        color: #d95353;
        vertical-align: top;
      }
    }
    .label-text {
      display: inline-block;
    }
  }
</style>
