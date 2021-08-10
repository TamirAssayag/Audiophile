<template>
  <SignInForm v-if="isLoggedIn()" />
</template>

<script>
import SignInForm from '../components/SignInForm/SignInForm.vue'

export default {
  name: 'Login',
  components: { SignInForm },
  middleware: ['guest'],
}
</script>

<style></style>
