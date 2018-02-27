<template>
  <div class="api-modal" :style="{display: viewShow}" @click="clickEvent">
    <div class="modal-cont">
      <div class="modal-body">
        <span class="close-icon" @click="hide">×</span>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'api-modal',
  data () {
    return {
      isShow: this.visible
    }
  },
  watch: {
    visible: function (newValue) {
      this.isShow = newValue
    }
  },
  computed: {
    viewShow () {
      if (this.isShow) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'inherit'
      }
      return this.isShow ? 'block' : 'none'
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    show () {
      this.isShow = true
    },
    hide () {
      this.$emit('hide')
    },
    clickEvent (event) {
      if (event.target.className === 'modal-cont') {
        this.$emit('hide')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .api-modal {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .2);
    z-index: 9000;
    display:none;
    & > .modal-cont {
      display: flex;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      align-items: center;
      & > .modal-body {
        position: relative;
        margin: 0 auto;
        padding: 30px 20px;
        min-width: 600px;
        background: #fff;
      }
      .close-icon {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 30px;
        cursor: pointer
      }
    }
  }
</style>
