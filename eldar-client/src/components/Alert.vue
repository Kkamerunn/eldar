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

<style lang="scss" scoped>
$light-blue: #34b7eb;

.alert-success,
.alert-error {
  padding: 4px;
  border-radius: 10px;

  p {
    color: white;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    text-transform: uppercase;
  }
}

.alert-success {
  background-color: $light-blue;
}

.alert-error {
  background-color: red;
}
</style>
