<template>
  <div class="content">
    <Hero />
    <section class="container">
      <Categories class="pb-120" />
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
  meta: {
    hideLayout: true,
    routeName: 'index',
  },
}
</script>

<style lang="scss"></style>
