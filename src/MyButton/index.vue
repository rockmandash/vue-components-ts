<template>
  <button class="button is-primary" @click="onClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'my-button',
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
});
</script>

<style lang="scss" scoped>
button {
  border: 1px solid #eee;
  border-radius: 3px;
  background-color: #ffffff;
  cursor: pointer;
  font-size: 15pt;
  padding: 3px 10px;
  margin: 10px;

  span {
    font-size: 30px;
  }
}
</style>
