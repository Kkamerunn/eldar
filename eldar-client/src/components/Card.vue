<template>
  <div class="card">
    <div class="flex">
      <p>{{ user.name }}</p>
      <p>{{ user.credits }}</p>
    </div>
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
    <div v-if="isAdmin" class="flex">
      <label for="credits">Credits</label>
      <input type="number" name="credits" id="credits" v-model="counter" />
      <button @click="setOrIncrementCredits(Number(counter), user.id)">
        Increment/decrement
      </button>
      <button @click="setOrIncrementCredits(Number(counter), user.id, true)">
        Set credits
      </button>
    </div>
  </div>
</template>

<script>
import { setUserCreditsApi } from "../api/user";

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
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters.getCurrentUser.rol === "admin";
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
          await setUserCreditsApi(newAmountOfCredits, id);
        } catch (error) {
          console.log(error);
        }
      }
    },
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

.card {
  background-color: $light-blue;
  border-radius: $b-radius-xs;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 25%;
  margin: 1rem auto;

  .flex {
    display: flex;
    justify-content: space-between;
    width: 90%;
  }

  .error {
    background-color: #e86d6d;
    padding: 5px;
    border-radius: 5px;
    color: white;
    font-size: 14px;
    font-weight: bold;
    margin: 5px 0;
  }

  p {
    color: $white;
    font-weight: bold;
  }
}
</style>
