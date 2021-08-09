<template>
  <SignUp />
</template>

<script>
import SignUp from '~/components/SignUp/SignUp.vue'
export default {
  components: { SignUp },

  created() {
    return this.getUser._id ? this.$router.push('/') : true
  },
}
</script>

<style></style>
