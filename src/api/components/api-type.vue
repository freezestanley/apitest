<template>
  <div class="api-type">
    <span v-for="(val, index) of type.split('|')" :key="index" :class="['type', 'type-' + upperCase(val)]">{{upperCase(val)}}</span>
  </div>
</template>

<script>
export default {
  name: 'api-type',
  props: {
    type: {
      type: String
    }
  },
  methods: {
    upperCase: function (val) {
      return val[0].toUpperCase() + val.substring(1)
    }
  }
}
</script>

<style lang='scss' scoped>
  .api-type {
    display: inline-block;
    width: 70px;
    .type {
      height: 18px;
      line-height: 18px;
      font-size: 12px;
      width: 60px;
      color: #fff;
      border-radius: 2px;
      text-align: center;
      display: inline-block;
      padding: 0 3px;
    }
    .type-Object {
      background-color: #33ab70;
    }
    .type-String {
      background-color: #27394c;
    }
    .type-Boolean {
      background-color: #d95353;
    }
    .type-Function {
      background-color: #f4a358;
    }
    .type-Number {
      background-color: #288af0;
    }
    .type-Array {
      background-color: #eb1ac1;
    }
  }
</style>
