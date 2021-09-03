<template>
  <div class="container">
    <v-btn :to="`order/${$route.params.slug}`">Proceed To Checkout</v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({}),
}
</script>

<style></style>
