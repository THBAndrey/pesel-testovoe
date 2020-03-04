<template>
  <div
    class="switch"
    :class="active ? 'active' : ''"
    @click="$emit('change', !active)"
  >
    <span class="title">{{ title }}</span>
    <div class="switch-btn"></div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'active',
    event: 'change'
  },
  props: {
    title: {
      type: String,
      required: false
    },
    active: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.switch {
  display: flex;
  align-items: center;
  cursor: pointer;

  .title {
    margin-right: 15px;
  }

  .switch-btn {
    display: inline-block;
    width: 29px;
    height: 14px;
    border-radius: 10px;
    border: 2px solid currentColor;
    position: relative;
    transition: 0.3s;

    &::after {
      content: '';
      height: 10px;
      width: 10px;
      border-radius: 50%;
      background: currentColor;
      top: 2px;
      left: 2px;
      transition: left 0.3s;
      position: absolute;
      z-index: 1;
    }
  }

  &.active {
    color: #3c59f0;

    .switch-btn::after {
      left: 16px;
    }
  }
}
</style>
