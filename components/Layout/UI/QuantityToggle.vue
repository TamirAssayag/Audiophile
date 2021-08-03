<template>
  <div class="quantity-toggle">
    <button @click="decrement()">-</button>
    <input type="text" :value="quantity" readonly pattern="[0-9]*" />
    <button @click="increment()">+</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    quantity: 1,
  }),

  methods: {
    increment() {
      this.quantity++
    },
    decrement() {
      if (this.quantity === 1) return
      this.quantity--
    },
  },
}
</script>
