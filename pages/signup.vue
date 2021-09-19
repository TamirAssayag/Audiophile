<template>
  <SignInForm v-if="isLoggedIn()" />
</template>

<script>
import SignInForm from '~/components/SignInForm/SignInForm.vue'
export default {
  components: { SignInForm },
  middleware: ['guest'],
  head: {
    title: 'Sign Up',
  },

  meta: {
    hideLayout: true,
    hasPageHeader: true,
    routeName: 'signup',
  },
}
</script>

<style></style>
