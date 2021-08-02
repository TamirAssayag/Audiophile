<template>
  <v-app light>
    <Navbar />
    <Nuxt />
    <div v-if="!checkRoute('index')" class="container">
      <Categories />
      <About />
    </div>
    <footer>
      <Footer />
    </footer>
  </v-app>
</template>

<script>
import '~/styles/app.scss'
import Footer from '../components/Footer/Footer.vue'
import Navbar from './Navigation/Navbar.vue'
export default {
  components: { Navbar, Footer },

  methods: {
    checkRoute(route) {
      return this.$route.name === route
    },
  },
}
</script>

<style lang="scss"></style>
