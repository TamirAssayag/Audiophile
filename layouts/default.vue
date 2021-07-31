<template>
  <v-app light>
    <Navbar />
    <Nuxt />
  </v-app>
</template>

<script>
import '~/styles/app.scss'
import Navbar from './Navigation/Navbar.vue'
export default {
  components: { Navbar },
}
</script>

<style lang="scss"></style>
