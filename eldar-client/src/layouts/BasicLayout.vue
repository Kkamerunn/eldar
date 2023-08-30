<template>
  <div class="layout">
    <Header />
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "BasicLayout",
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped></style>
