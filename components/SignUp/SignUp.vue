<template>
  <div class="user-form mb-5">
    <div class="user-form__form">
      <h1 class="mb-5 title--uppercase">
        {{ signUpRoute ? 'Sign Up' : 'Login' }}
      </h1>
      <v-form @submit.prevent="handleRegistration">
        <v-text-field
          v-model="user.email"
          label="Email"
          type="email"
          name="email"
          color="black"
          prepend-inner-icon="mdi-email"
          :error-messages="emailErrors"
          @focus="$v.user.email.$reset()"
          @blur="$v.user.email.$touch()"
        />
        <v-text-field
          v-model="user.password"
          label="Password"
          type="password"
          name="password"
          color="black"
          prepend-inner-icon="mdi-lock"
          :error-messages="passwordErrors"
          @focus="$v.user.password.$reset()"
          @blur="$v.user.password.$touch()"
        />

        <p v-if="errorMsg" class="text--error">
          {{ errorMsg }}
        </p>

        <v-btn type="submit" class="mt-5 btn btn--orange" elevation="0">
          {{ signUpRoute ? 'Sign Up' : 'Login' }}
        </v-btn>
      </v-form>
      <div class="mt-5">
        <span class="">{{
          loginRoute ? "Don't have an account? " : 'Already have an account?'
        }}</span>
        <NuxtLink :to="loginRoute ? '/signup' : '/login'">
          <span class="text--bold text--underline">
            {{ loginRoute ? 'Sign Up Now' : 'Login' }}
          </span>
        </NuxtLink>
      </div>
    </div>
    <v-btn v-if="getUser._id" @click.prevent="logOut()"> Logout </v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import API from '~/services/api'
export default {
  name: 'SignUp',
  mixins: [validationMixin],

  validations: {
    user: {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    },
  },

  data: () => ({
    user: {
      email: null,
      password: null,
    },
    errorMsg: '',
  }),

  computed: {
    loginRoute() {
      return this.$route.name === 'login'
    },
    signUpRoute() {
      return this.$route.name === 'signup'
    },
    dataForm() {
      const formData = {
        email: this.user.email,
        password: this.user.password,
      }
      return formData
    },
    emailErrors() {
      const errors = []
      if (!this.$v.user.email.$dirty) return errors
      !this.$v.user.email && errors.push('Must be valid e-mail')
      !this.$v.user.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.user.password.$dirty) return errors
      !this.$v.user.password.minLength &&
        errors.push('Password must have at least 6 characters')
      !this.$v.user.password.required && errors.push('Password is required')
      return errors
    },
  },

  methods: {
    ...mapActions({
      saveUser: 'user/saveUser',
      logoutUser: 'user/logoutUser',
    }),
    async handleRegistration() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      if (this.$route.name === 'signup') {
        const newUser = await API.createUser(this.dataForm)
        this.$router.push({
          name: 'index',
        })
        this.saveUser(newUser)
      }
      if (this.$route.name === 'login') {
        const userLogin = await API.userLogin(this.dataForm)
        if (userLogin) {
          this.$router.push({
            name: 'index',
          })
        } else {
          this.errorMsg = 'Please provide a valid email address and password.'
        }
        await this.saveUser(userLogin)
      }
    },
    logOut() {
      return this.logoutUser()
    },
  },
}
</script>

<style lang="scss">
.user-form {
  padding: 1.5rem;
  width: 100%;
  min-height: 50vh;
  position: relative;
  z-index: 1;
  background-color: rgb(255, 255, 255);
  margin: 1rem auto;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    inset: 0;
    background-image: url('~/static/images/shared/mobile/image-best-gear.jpg');
    background-size: cover;
    opacity: 0.1;
    z-index: -1;
    filter: blur(5px);

    @include media('>=md') {
      background-image: url('~/static/images/shared/tablet/image-best-gear.jpg');
    }
  }

  &__form {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @include media('>=md') {
      width: 568px;
      margin: 0 auto;
    }

    .v-form {
      width: 100%;
      .btn {
        width: 100% !important;
        text-align: center;
      }
    }
  }
}
</style>
