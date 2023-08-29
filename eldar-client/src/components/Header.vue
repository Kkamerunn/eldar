<template>
  <nav class="navbar">
    <button @click.prevent="handleClickLogout" class="btn">Logout</button>
  </nav>
</template>

<script>
import { logoutAPI } from "../api/user";

export default {
  name: "HeaderComponent",
  methods: {
    async handleClickLogout() {
      await logoutAPI();
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
$light-blue: #34b7eb;

.navbar {
  padding: 5px;
  background-color: $light-blue;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .btn {
    background-color: transparent;
    border: 0;
    color: white;
    padding: 3px;
    text-transform: uppercase;
    cursor: pointer;
  }
}
</style>
