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
import Products from '../components/Products/Products.vue'
import Categories from '../components/Categories/Categories.vue'
import Hero from '../components/Hero/Hero.vue'
export default {
  components: { Categories, Products, Hero },
}
</script>

<style lang="scss"></style>
