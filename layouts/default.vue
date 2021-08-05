<template>
  <v-app light>
    <Navbar />
    <v-fade-transition appear>
      <Nuxt keep-alive :keep-alive-props="{ max: 10 }" />
    </v-fade-transition>
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
import { mapActions } from 'vuex'
import Footer from '../components/Footer/Footer.vue'
import Navbar from './Navigation/Navbar.vue'
export default {
  name: 'Default',
  components: { Navbar, Footer },

  mounted() {
    if (localStorage.getItem('cart')) {
      this.setCart(JSON.parse(localStorage.getItem('cart')))
    }
  },
  methods: {
    ...mapActions({
      setCart: 'products/setCart',
    }),
    checkRoute(route) {
      return this.$route.name === route
    },
  },
}
</script>

<style lang="scss"></style>
