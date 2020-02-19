<template>
  <p>👋 Hello {{ to }}</p>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    to: String
  }
});
</script>

<style lang="scss" scoped>
p {
  font-size: 30px;
  color: royalblue;
}
</style>
