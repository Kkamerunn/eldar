<template>
  <div :class="[type === 'success' ? 'alert-success' : 'alert-error']">
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: "AlertComponent",
  props: ["type", "title"],
};
</script>

<style lang="scss" scoped></style>
