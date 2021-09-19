<template>
  <section class="container">
    <Categories />
    <Products />
    <About />
  </section>
</template>

<script>
import Products from '../components/Products/Products.vue'
import Categories from '../components/Categories/Categories.vue'
export default {
  components: { Categories, Products },
  meta: {
    hideLayout: true,
    hasHero: true,
    routeName: 'index',
  },
}
</script>
