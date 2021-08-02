<template>
  <div class="goback">
    <v-btn text class="btn btn--goback" @click="goBack()"> Go Back </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      return this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss">
.goback {
  padding: 1rem 1.5rem;

  .v-btn:not(.v-btn--round).v-size--default {
    padding: 0 !important;
  }
}
</style>
