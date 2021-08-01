<template>
  <div class="content">
    <Hero />
    <section class="container">
      <Categories />
      <Products />
      <About />
    </section>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import Products from '../components/Products/Products.vue'
import Categories from '../components/Categories/Categories.vue'
import Hero from '../components/Hero/Hero.vue'
import Footer from '../components/Footer/Footer.vue'
export default {
  components: { Categories, Products, Hero, Footer },
}
</script>

<style lang="scss"></style>
