<template>
  <div class="sign-up container mb-5">
    <h1 class="mb-5">Sign Up</h1>
    <v-form @submit.prevent="handleRegistration">
      <label for="email">Email</label>
      <v-text-field v-model="user.email" type="text" name="email" />
      <label for="password">Password</label>
      <v-text-field v-model="user.password" type="password" name="password" />
      <v-btn type="submit"> Sign Up </v-btn>
    </v-form>
  </div>
</template>

<script>
import API from '~/services/api'
export default {
  name: 'SignUp',

  data: () => ({
    user: {
      email: null,
      password: null,
    },
  }),

  methods: {
    async handleRegistration() {
      const formData = {
        email: this.user.email,
        password: this.user.password,
      }
      await API.createUser(formData)
    },
  },
}
</script>

<style></style>
