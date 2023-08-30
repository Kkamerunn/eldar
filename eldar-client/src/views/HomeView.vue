<template>
  <BasicLayout>
    <div class="home">
      <h1 v-if="currentAuthUser">Welcome {{ currentAuthUser.name }}!</h1>
      <Alert
        v-if="loading"
        type="success"
        title="Loading..."
        class="w-25 mx-auto"
      />
      <template v-if="users.length > 0">
        <Card v-for="user in users" :key="user.id" :user="user" />
      </template>
    </div>
  </BasicLayout>
</template>

<script>
import axiosClient from "../config/axios";
import BasicLayout from "../layouts/BasicLayout.vue";
import Alert from "../components/Alert.vue";
import { getTokenApi } from "../api/token";
import Card from "../components/Card.vue";
import { getUserApi } from "../api/user";

export default {
  name: "HomeView",
  components: {
    BasicLayout,
    Alert,
    Card,
  },
  data() {
    return {
      users: [],
      loading: false,
    };
  },
  methods: {
    async getUsers() {
      this.loading = true;
      try {
        const { data } = await axiosClient("/users", {
          headers: {
            Authorization: `Bearer ${getTokenApi()}`,
          },
        });
        this.users = data;
        this.$store.dispatch("addUsers", data);
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
  },
  computed: {
    currentAuthUser() {
      return getUserApi();
    },
  },
  mounted() {
    if (!getTokenApi()) return this.$router.push("/");
    this.getUsers();
  },
};
</script>

<style lang="scss" scoped>
.home {
  h1 {
    text-align: center;
  }
}
</style>
