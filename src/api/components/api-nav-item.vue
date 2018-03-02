<template>
  <div class="nav-list">
    <ul>
      <li v-for="(val, key) in treeData" :key="key">
        <span
          v-if="val.type === 'folder'"
          class="icon"
          :class="{'expand': !val.open, 'collapse': val.open}"
          @click="toggle(val)">
        </span>
        <router-link
          :to="{name: $route.name, query: {path: val.path}}"
          v-if="val.type === 'file'"
          class="name"
          :class="{'selected': val.path === $route.query.path}">{{val.name}}</router-link>
        <span class="name" v-else>{{val.name}}</span>
        <api-nav-item :treeData="val.children" v-show="val.open"></api-nav-item>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'api-nav-item',
  props: {
    treeData: {
      type: Array
    }
  },
  methods: {
    toggle: function (item) {
      item.open = !item.open
    }
  }
}
</script>

<style lang='scss' scoped>
  .nav-list {
    li {
      padding-left: 20px;
      list-style: none;
    }
    .name {
      display: inline-block;
      padding: 7px 5px;
      color: #666;
      vertical-align: middle;
    }
    a {
      text-decoration: none;
      transition: color .3s;
      &.selected, &:hover {
        color: #42b983;
      }
    }
    .icon {
      display: inline-block;
      width: 15px;
      height: 15px;
      background-repeat: no-repeat;
      background-size: contain;
      vertical-align: middle;
      &.expand {
        background-image: url(~@/assets/images/expand.png)
      }
      &.collapse {
        background-image: url(~@/assets/images/collapse.png)
      }
    }
  }
</style>
