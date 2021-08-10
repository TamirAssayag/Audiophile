<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      height="50"
      width="300"
      color="#d87d4a"
      elevation="1"
    >
      <p class="text--uppercase text--bold">{{ config.text }} ...</p>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'Snackbar',
  data: () => ({
    snackbar: false,
    config: {},
  }),

  mounted() {
    this.$root.$on('snackbar', this.openSnackbar)
  },

  beforeDestroy() {
    this.$root.$off('snackbar', this.openSnackbar)
  },

  methods: {
    openSnackbar(config) {
      this.snackbar = true
      this.config = config
    },
  },
}
</script>

<style></style>
