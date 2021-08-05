<template>
  <div class="text-center">
    <v-snackbar v-model="snackbar" height="50" width="300" color="#d87d4a">
      <p class="text--uppercase text--bold">{{ msg.message }} ...</p>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'Snackbar',
  data: () => ({
    snackbar: false,
  }),
  watch: {
    msg(value) {
      if (value.message) {
        this.snackbar = true
      }
    },
  },
}
</script>

<style></style>
