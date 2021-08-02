<template>
  <div class="content">
    <Hero />
    <section class="container">
      <Categories />
      <Products />
      <About />
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Products from '../components/Products/Products.vue'
import Categories from '../components/Categories/Categories.vue'
import Hero from '../components/Hero/Hero.vue'
export default {
  components: { Categories, Products, Hero },

  mounted() {
    if (localStorage.getItem('products')) {
      this.setProducts(JSON.parse(localStorage.getItem('products')))
    }
  },

  methods: {
    ...mapActions({
      setProducts: 'products/setProducts',
    }),
  },
}
</script>

<style lang="scss"></style>
