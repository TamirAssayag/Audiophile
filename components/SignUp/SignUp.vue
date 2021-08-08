<template>
  <div class="sign-up container mb-5">
    <h1 class="mb-5 title--uppercase">Sign Up</h1>
    <v-form @submit.prevent="handleRegistration">
      <v-text-field
        v-model="user.email"
        label="Email"
        type="text"
        name="email"
      />
      <v-text-field
        v-model="user.password"
        label="Password"
        type="password"
        name="password"
      />
      <v-btn type="submit" class="mt-5 btn btn--orange" elevation="0">
        Sign Up
      </v-btn>
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
