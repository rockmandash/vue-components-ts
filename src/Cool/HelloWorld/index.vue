<template>
  <div>
    <p>Hello {{ text }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "World"
    };
  }
};
</script>

<style scoped>
div {
  background-color: red;
  color: white;
}
</style>
