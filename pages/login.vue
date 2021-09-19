<template>
  <SignInForm v-if="isLoggedIn()" />
</template>

<script>
import SignInForm from '../components/SignInForm/SignInForm.vue'

export default {
  name: 'Login',
  components: { SignInForm },
  middleware: ['guest'],

  head: {
    title: 'Login',
  },

  meta: {
    hideLayout: true,
    hasPageHeader: true,
    routeName: 'login',
  },
}
</script>

<style></style>
