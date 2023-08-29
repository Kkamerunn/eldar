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

      if (this.formError !== null) {
        setTimeout(() => {
          this.formError = null;
        }, 8000);
      }
    },
    async login() {
      this.loading = true;

      try {
        const user = await loginAPI(this.formData);
        this.$store.dispatch("addCurrentUser", user);
        if (getTokenApi()) return this.$router.push("/home");
      } catch (error) {
        console.log(error);
        this.formError = error.message;
        this.loading = false;
      }

      if (this.formError !== null) {
        setTimeout(() => {
          this.formError = null;
        }, 8000);
      }
    },
  },
  mounted() {
    if (getTokenApi()) return this.$router.push("/home");
  },
};
</script>

<style lang="scss" scoped>
$light-blue: #34b7eb;
$m-auto: 0 auto;
$xs: 0.5rem;
$md: 1.5rem;
$b-radius-xs: 0.6rem;
$b-radius-base: 1.3rem;
$white: white;

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .form {
    padding: $xs $md;
    border: 2px solid $light-blue;
    border-radius: $b-radius-base;
    width: 25%;
    margin: $m-auto;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

    .flex {
      display: flex;
      margin: 1.5rem 0;
    }

    .flex-col {
      flex-direction: column;
    }

    .label {
      color: $light-blue;
      font-weight: bold;
      margin-bottom: $xs;
      text-align: start;
    }

    .input,
    .submit {
      padding: $xs;
      border: 1px solid $light-blue;
      border-radius: $b-radius-xs;
    }

    .input:focus,
    .input:active {
      border: 2px solid $light-blue;
      outline-width: 0;
    }

    .submit {
      width: 100%;
      color: $white;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: $md;
      background-color: $light-blue;
      cursor: pointer;
    }
  }

  .link,
  p {
    color: $light-blue;
  }

  .link {
    font-weight: bold;
  }
}
</style>
