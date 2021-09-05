<template>
  <v-app light>
    <Navbar />
    <v-fade-transition appear>
      <Nuxt keep-alive :keep-alive-props="{ max: 10 }" />
    </v-fade-transition>
    <Snackbar />
    <div
      v-if="
        !checkRoute('index') &&
        !checkRoute('signup') &&
        !checkRoute('login') &&
        !checkRoute('orders')
      "
      class="container"
    >
      <Categories class="pb-120" />
      <About v-if="!checkRoute('cart')" />
    </div>

    <footer>
      <Footer />
    </footer>
  </v-app>
</template>

<script>
import '~/styles/app.scss'
import { mapActions } from 'vuex'
import Navbar from './Navigation/Navbar.vue'
import Snackbar from '~/components/Layout/UI/Snackbar.vue'
import Footer from '~/components/Footer/Footer.vue'
import userApiMixin from '~/mixins/userApiMixin'
export default {
  name: 'Default',
  components: { Navbar, Footer, Snackbar },
  mixins: [userApiMixin],

  async mounted() {
    if (localStorage.getItem('cart')) {
      this.setCart(JSON.parse(localStorage.getItem('cart')))
    }
    if (JSON.parse(localStorage.getItem('user'))) {
      this.$axios.setHeader(
        'Authorization',
        JSON.parse(localStorage.getItem('user'))._id
      )

      this.saveUser(await this.getUserData())
    }
  },

  methods: {
    ...mapActions({
      setCart: 'products/setCart',
      saveUser: 'user/saveUser',
    }),
    checkRoute(route) {
      return this.$route.name === route
    },
  },
}
</script>

<style lang="scss"></style>
