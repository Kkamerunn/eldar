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

<style lang="scss" scoped></style>
