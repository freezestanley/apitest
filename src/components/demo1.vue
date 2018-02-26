<template>
  <div>
  </div>
</template>

<script>
/**
 * @function test - descript
 * @params {string} a - descript
 * @return {Number} [default = 123123] - descript
 */
function test (a = 'adfas', b = '123123') {
  /**
   * @function test1 - descript
   * @params {string} a1 - descript
   * @return {Number} [default = 123123] - descript
   */
  return 123123
}
test()
/**
 * @class asdfasdfafsf - class 描述
 * @mixins asdfaf, asdf
 * @extends asdfasd
 */
export default {
  name: 'test-component',
  mixins: [],
  /**
   * @components childComponent, fatherComponent
   */
  components: {
    // ChildComponent, fatherComponent
  },
  watch: {
    /**
     * @watch prA - 描述applicant
     * @attr [deep = true]
     * @attr [immediate = true]
     */
    'prA': {
      deep: true,
      handler () {
      }
    },
    /**
     * @watch prB - 描述applicant
     * @attr [deep = true]
     * @attr [immediate = true]
     */
    'prB': function (newValue, oldvalue) {
    }
  },
  props: {
    /**
     * @props propA - asdfadfadf
     * @attr [required = true]
     * @attr [validator = asfddaf]
     */
    propA: Number,
    propB: [String, Number],
    propC: {
      type: String,
      required: true
    },
    propD: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    propE: {
      validator: function (value) {
        return value > 10
      }
    }
  },
  computed: {
    /**
     * @computed aPlus - adfasdfsffs
     * @attr [get = 1231]
     * @attr [set = 1231]
     */
    aDouble: function () {
      return this.a * 2
    },
    /**
     * @computed aPlus1 - adfasdf
     * @attr [get = 1231]
     */
    // 读取和设置
    aPlus: {
      get: function () {
        return this.a + 1
      },
      set: function (v) {
        this.a = v - 1
      }
    }
  },
  methods: {
    /**
     * @methods doit - descript
     * @params {String|Number} [a = 10] - descript
     * @return {Number} - descript
     */
    doit (a = 10) {
      /**
       * @event name - descript
       */
      this.$emit('on', 'asdfsf')
      return 'asf'
    },
    /**
     * @methods doit1 - descript
     * @params {String|Number} [a = 10] - descript
     * @return {Number} - descript
     */
    doit1 (a = 10) {
      /**
       * @event name - descript
       */
      this.$emit('on', 'asdfsf')
      return 'asf'
    }
  }
}
</script>
<style>
</style>
