<template>
  <AuthLayout>
    <Form :isRegisterForm="true" />
  </AuthLayout>
</template>

<script>
import AuthLayout from "../layouts/AuthLayout.vue";
import Form from "../components/Form.vue";

export default {
  name: "LoginView",
  components: {
    AuthLayout,
    Form,
  },
};
</script>
