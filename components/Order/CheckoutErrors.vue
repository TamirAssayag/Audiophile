<template>
  <section class="error__container">
    <div v-if="!loggedIn" class="container">
      <div class="checkout__cant-proceed">
        <span><strong>Dear Customer</strong>, our apologies,</span>
        <p class="mt-1 mb-4">
          If you have an account please
          <NuxtLink to="login" aria-label="Login" title="Login">
            <strong class="text--underline">Login</strong></NuxtLink
          >
          to proceed your purchase,
        </p>
        <h3>
          Don't have an account?
          <NuxtLink to="signup" aria-label="Sign up" title="Sign up">
            <strong class="text--underline">Sign Up</strong></NuxtLink
          >
          here
        </h3>
      </div>
    </div>
    <div v-else class="container">
      <div class="checkout__cant-proceed">
        <span
          ><strong>Dear {{ displayName }}</strong
          >,</span
        >
        <h3 class="mt-1 mb-4">Your cart is empty,</h3>
        <p class="text--gray text--sm">Please come back when it's not 😉</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CheckoutErrors',
}
</script>

<style lang="scss">
.error__container {
  height: calc(100vh - 28.8rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
