<template>
  <div class="layout">
    <slot />
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
  components: {},
};
</script>

<style lang="scss" scoped>
.layout {
  min-width: 100%;
  min-height: 100vh;
}
</style>
