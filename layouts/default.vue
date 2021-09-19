<template>
  <v-app light>
    <Navbar />

    <div class="content">
      <Hero v-if="$route.meta.hasHero" />
    </div>

    <PageHeader :title="$route.name" />
    <v-scroll-y-transition appear>
      <Nuxt keep-alive :keep-alive-props="{ max: 10 }" />
    </v-scroll-y-transition>

    <Snackbar />
    <div v-if="!$route.meta.hideLayout" :class="'container'">
      <Categories :class="!checkRoute('index') ? 'mt-0' : ''" />
      <About v-if="!$route.meta.hideAbout" />
    </div>

    <footer>
      <Footer />
    </footer>
  </v-app>
</template>

<script>
import '~/styles/app.scss'
import { mapActions } from 'vuex'
import PageHeader from '../components/Layout/UI/PageHeader.vue'
import Hero from '../components/Hero/Hero.vue'
import Navbar from './Navigation/Navbar.vue'
import Snackbar from '~/components/Layout/UI/Snackbar.vue'
import Footer from '~/components/Footer/Footer.vue'
import userApiMixin from '~/mixins/api/userApiMixin'
export default {
  name: 'Default',
  components: { Navbar, Footer, Snackbar, PageHeader, Hero },
  mixins: [userApiMixin],

  watch: {
    loggedIn(isLogged) {
      this.$axios.setHeader(
        'Authorization',
        isLogged ? this.getUser._id : false
      )
    },
  },

  async mounted() {
    if (this.loggedIn) {
      this.$axios.setHeader('Authorization', this.getUser._id)
      this.saveUser(await this.getUserData())
    }
  },

  methods: {
    ...mapActions({
      setCart: 'cart/setCart',
      saveUser: 'user/saveUser',
    }),

    checkRoute(route) {
      return this.$route.name === route
    },
  },
}
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.2s cubic-bezier(0.08, 0.48, 0.14, 0.53);
}
.page-enter,
.page-leave-to {
  opacity: 0.3;
}
</style>
