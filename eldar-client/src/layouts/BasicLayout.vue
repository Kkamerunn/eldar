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

<style lang="scss" scoped>
.layout {
  min-width: 100%;
  min-height: 100vh;

  .container {
    padding: 1.5rem;
  }
}
</style>
