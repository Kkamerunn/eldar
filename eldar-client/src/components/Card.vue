<template>
  <div class="card">
    <div class="flex">
      <p>{{ user.name }}</p>
      <p>{{ credits }}</p>
    </div>
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    <p v-if="successfullMsg" class="success">{{ successfullMsg }}</p>
    <div v-if="isAdmin" class="flex max-w-100 gap-5">
      <div class="group">
        <label for="credits">Credits</label>
        <input
          type="number"
          name="credits"
          id="credits"
          v-model="counter"
          class="input"
        />
      </div>
      <button
        class="btn"
        @click="setOrIncrementCredits(Number(counter), user.id)"
      >
        Increment
      </button>
      <button
        class="btn"
        @click="setOrIncrementCredits(Number(counter), user.id, true)"
      >
        Set
      </button>
    </div>
  </div>
</template>

<script>
import { setUserCreditsApi, getUserApi } from "../api/user";

export default {
  name: "CardComponent",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      counter: 0,
      errorMsg: "",
      successfullMsg: "",
      credits: this.user.credits,
    };
  },
  computed: {
    isAdmin() {
      const currentAuthUser = getUserApi();
      return currentAuthUser.rol === "admin";
    },
  },
  watch: {
    errorMsg() {
      setTimeout(() => {
        this.errorMsg = "";
      }, 3000);
      clearTimeout(() => {
        this.errorMsg = "";
      }, 3000);
    },
    successfullMsg() {
      setTimeout(() => {
        this.successfullMsg = "";
      }, 3000);
      clearTimeout(() => {
        this.successfullMsg = "";
      }, 3000);
    },
  },
  methods: {
    async setOrIncrementCredits(credits, id, set = false) {
      const userCredits = this.$store.getters.getUsers.filter(
        (user) => user.id === id
      )[0].credits;

      if (userCredits + credits < 0) {
        this.errorMsg = "Credits can't be negative";
        this.counter = 0;
        return;
      } else {
        const newAmountOfCredits =
          set === false ? userCredits + credits : credits;
        try {
          const { message, credits } = await setUserCreditsApi(
            newAmountOfCredits,
            id
          );
          this.credits = credits;
          this.successfullMsg = message;
        } catch (error) {
          console.log(error);
        }
      }
      this.counter = 0;
    },
  },
};
</script>

<style lang="scss" scoped></style>
