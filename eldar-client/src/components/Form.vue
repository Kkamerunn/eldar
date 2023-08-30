<template>
  <div class="container">
    <form class="form" @submit.prevent="formSubmitHandler">
      <template v-if="loading">
        <Alert type="success" title="Loading..." />
      </template>
      <div v-if="formError">
        <Alert type="error" :title="formError" />
      </div>
      <div v-if="isRegister" class="flex flex-col">
        <label for="name" class="label">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your name"
          class="input"
          v-model="formData.name"
        />
      </div>
      <div class="flex flex-col">
        <label for="email" class="label">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your email"
          class="input"
          v-model="formData.email"
        />
      </div>
      <div class="flex flex-col">
        <label for="password" class="label">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Your password"
          class="input"
          v-model="formData.password"
        />
      </div>
      <div v-if="isRegister" class="flex flex-col">
        <label for="password_confirmation" class="label"
          >Confirm password</label
        >
        <input
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          placeholder="Repeat password"
          class="input"
          v-model="formData.password_confirmation"
        />
      </div>
      <input type="submit" class="submit" :value="submitBtnText" />
    </form>
    <p>{{ ctaTextContent }}</p>
    <router-link class="link" :to="routeCTADirection">{{
      ctaBtnTextContent
    }}</router-link>
  </div>
</template>

<script>
import { registerAPI, loginAPI } from "../api/user";
import { getTokenApi } from "../api/token";
import Alert from "./Alert.vue";

export default {
  name: "FormComponent",
  components: {
    Alert,
  },
  props: {
    isRegisterForm: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {},
      formError: null,
      loading: false,
    };
  },
  watch: {
    formError() {
      setTimeout(() => {
        this.formError = "";
      }, 3000);
      clearTimeout(() => {
        this.formError = "";
      }, 3000);
    },
  },
  computed: {
    formSubmitHandler() {
      return this.isRegisterForm === true
        ? () => this.register()
        : () => this.login();
    },
    isRegister() {
      return this.isRegisterForm && true;
    },
    submitBtnText() {
      return this.isRegisterForm === true ? "Sign up" : "Sign in";
    },
    routeCTADirection() {
      return this.isRegisterForm === true ? "/" : "register";
    },
    ctaTextContent() {
      return this.isRegisterForm === true
        ? "Already have an account?"
        : "Don't have an account yet?";
    },
    ctaBtnTextContent() {
      return this.isRegisterForm === true ? "login" : "create account";
    },
  },
  methods: {
    async register() {
      this.loading = true;

      try {
        const user = await registerAPI(this.formData);
        this.$store.dispatch("addCurrentUser", user);
        if (getTokenApi()) return this.$router.push("/home");
      } catch (error) {
        this.formError = error.message;
        this.loading = false;
      }

      this.loading = false;
      this.formData = {};
    },
    async login() {
      this.loading = true;

      try {
        const user = await loginAPI(this.formData);
        this.$store.dispatch("addCurrentUser", user);
        if (getTokenApi()) return this.$router.push("/home");
      } catch (error) {
        this.formError = error.message;
        this.loading = false;
      }

      this.loading = false;
      this.formData = {};
    },
  },
  mounted() {
    if (getTokenApi()) return this.$router.push("/home");
  },
};
</script>

<style lang="scss" scoped></style>
