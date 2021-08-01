<template>
  <v-app light>
    <Navbar />
    <Nuxt />
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
}
</script>

<style lang="scss"></style>
