<template>
  <SignInForm v-if="isLoggedIn()" />
</template>

<script>
import SignInForm from '~/components/SignInForm/SignInForm.vue'
export default {
  components: { SignInForm },
  middleware: ['guest'],
}
</script>

<style></style>
