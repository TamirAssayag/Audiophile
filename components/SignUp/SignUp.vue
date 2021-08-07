<template>
  <div class="sign-up">
    <h1>SignUp</h1>
    <v-form>
      <label for="email">Email</label>
      <v-text-field type="text" name="email" />
      <label for="password">Password</label>
      <v-text-field type="password" name="password" />
    </v-form>
  </div>
</template>

<script>
import API from '~/services/api'
export default {
  name: 'SignUp',

  data: () => ({
    users: null,
  }),

  async created() {
    this.users = await API.getAllUsers()
  },
}
</script>

<style></style>
