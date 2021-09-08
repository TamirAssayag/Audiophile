<template>
  <section v-if="loggedIn && cart.length" class="container">
    <OrderForm />
    <Summary />
  </section>
  <section v-else>
    <CheckoutErrors />
  </section>
</template>

<script>
import Summary from '../components/Order/Summary.vue'
import OrderForm from '../components/Order/OrderForm/OrderForm.vue'
import CheckoutErrors from '../components/Order/CheckoutErrors.vue'
export default {
  components: { Summary, OrderForm, CheckoutErrors },
  middleware: ['hasCartItems'],
}
</script>
