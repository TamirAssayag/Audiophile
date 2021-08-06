<template>
  <div class="quantity-toggle disable-dbl-tap-zoom">
    <button @click="$emit('decrement')">-</button>
    <input type="text" :value="quantity" readonly pattern="[0-9]*" />
    <button @click="$emit('increment')">+</button>
  </div>
</template>

<script>
export default {
  props: {
    quantity: {
      type: String,
      default: null,
    },
  },
}
</script>
