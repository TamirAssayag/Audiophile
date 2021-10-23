<template>
  <nav>
    <div :class="['navbar', { 'z-index--150': $route.name === 'checkout' }]">
      <v-app-bar absolute color="black" height="80" elevation="2" width="100%">
        <v-btn
          class="navbar__menu--btn"
          icon
          title="Menu"
          aria-label="Menu"
          @click="drawer = !drawer"
        >
          <MenuSvg />
        </v-btn>

        <div class="navbar__left">
          <NuxtLink to="/" aria-label="Audiophile">
            <AudiophileLogo />
          </NuxtLink>

          <ul class="nav__menu">
            <li
              v-for="nav in navigation"
              :key="nav.link"
              class="nav__menu--item"
            >
              <NuxtLink
                :to="nav.link"
                :title="nav.name"
                :aria-label="nav.name"
                >{{ nav.name }}</NuxtLink
              >
            </li>
          </ul>
        </div>

        <div class="navbar__right">
          <v-scroll-y-reverse-transition appear hide-on-leave group>
            <client-only>
              <div v-if="!loggedIn" :key="loggedIn">
                <NuxtLink
                  class="v-btn btn btn--signup mr-2"
                  title="Sign up"
                  aria-label="Sign up"
                  to="/signup"
                  >Sign Up</NuxtLink
                >
                <NuxtLink
                  class="v-btn btn btn--login mr-5"
                  title="Login"
                  aria-label="Login"
                  to="/login"
                  >Login</NuxtLink
                >
              </div>
            </client-only>
          </v-scroll-y-reverse-transition>

          <v-scroll-y-reverse-transition appear leave-absolute>
            <client-only>
              <div v-if="loggedIn" class="logout mr-5">
                <v-menu
                  transition="scroll-y-reverse-transition"
                  attach
                  offset-y
                  :top="false"
                >
                  <template #activator="{ on, attrs }">
                    <v-btn
                      v-if="getUser._id"
                      class="btn btn--account"
                      elevation="0"
                      v-bind="attrs"
                      :aria-label="displayName"
                      :title="displayName"
                      v-on="on"
                    >
                      {{ displayName }}
                    </v-btn>
                  </template>
                  <v-list>
                    <NuxtLink
                      v-for="(item, index) in userActions"
                      :key="index"
                      class="user--aciton"
                      :to="item.link"
                    >
                      <v-list-item>
                        <v-list-item-title>{{ item.title }} </v-list-item-title>
                      </v-list-item>
                    </NuxtLink>
                    <v-list-item style="cursor: pointer">
                      <v-list-item-title @click="logOut"
                        >Logout
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </client-only>
          </v-scroll-y-reverse-transition>
        </div>
        <client-only>
          <v-btn
            :disabled="$route.name !== 'checkout' ? false : true"
            icon
            text
            title="Cart"
            aria-label="Cart"
            class="cart__icon"
            @click="toggleCartDialog"
          >
            <CartSvg />
            <v-slide-x-reverse-transition v-if="cart.length" appear>
              <div v-if="$route.name !== 'checkout'" class="cart__amount">
                <h4 class="text--bold text--white">{{ getTotalCartItems }}</h4>
              </div>
            </v-slide-x-reverse-transition>
          </v-btn>
        </client-only>
      </v-app-bar>
    </div>
    <v-bottom-sheet v-model="drawer" @keydown.esc="drawer = false">
      <div
        v-if="!loggedIn"
        class="sign-up__login d-flex align-center flex-column pt-5"
      >
        <client-only>
          <div class="user__buttons">
            <v-btn
              class="btn btn--text"
              title="Sign up"
              aria-label="Sign up"
              to="/signup"
            >
              Sign Up
            </v-btn>
            <v-btn
              class="btn btn--text"
              title="Login"
              aria-label="Login"
              to="/login"
            >
              Login
            </v-btn>
          </div>
        </client-only>
      </div>
      <v-slide-y-transition v-else appear mode="in-out">
        <div class="menu">
          <v-avatar size="40px" color="primary">
            <p class="text--white text--bold">{{ userCapitalLetters }}</p>
          </v-avatar>
          <div class="menu__actions">
            <v-btn
              v-for="(item, index) in userActions"
              :key="index"
              elevation="0"
              class="btn btn--border"
              title="Logout"
              aria-label="Logout"
              :to="item.link"
            >
              {{ item.title }}
            </v-btn>
          </div>
          <v-btn
            class="btn btn--text"
            title="Logout"
            aria-label="Logout"
            @click="logOut"
          >
            Logout
          </v-btn>
        </div>
      </v-slide-y-transition>
      <div class="mobile__menu">
        <Categories />
      </div>
    </v-bottom-sheet>
    <CartModal :is-open="cartModal" @onClose="closeCartDialog" />
  </nav>
</template>
<script>
import './Navbar.scss'
import { mapActions } from 'vuex'
import AudiophileLogo from '~/static/images/logo.svg?inline'
import CartSvg from '~/static/images/shared/desktop/icon-cart.svg?inline'
import MenuSvg from '~/static/images/shared/tablet/icon-hamburger.svg?inline'
import CartModal from '~/components/Modals/CartModal/CartModal.vue'
export default {
  name: 'Navbar',

  components: { CartModal, AudiophileLogo, CartSvg, MenuSvg },

  data: () => ({
    drawer: false,
    group: null,
    cartModal: false,
    scrollPosBeforeLock: 0,
  }),

  computed: {
    userActions() {
      return [
        { title: 'Cart', link: '/cart' },
        { title: 'Orders', link: '/orders' },
      ]
    },
  },

  watch: {
    group() {
      this.drawer = false
    },

    $route() {
      this.drawer = false
    },

    '$screen.desktop'(desktopView) {
      if (desktopView) {
        this.drawer = false
        this.cartModal = false
      }
    },

    cartModal(modal) {
      if (modal) {
        this.drawer = false
      }
    },

    cart(value) {
      if (!value.length) {
        this.closeCartDialog()
      }
    },
  },

  methods: {
    ...mapActions({
      logoutUser: 'user/logoutUser',
    }),
    toggleCartDialog() {
      this.cartModal = !this.cartModal
      if (this.cartModal) {
        this.scrollPosBeforeLock = window.scrollY
        document.querySelector('body').classList.add('modal-open')
      } else {
        document.querySelector('body').classList.remove('modal-open')
        window.scrollTo(0, this.scrollPosBeforeLock)
      }
    },
    closeCartDialog() {
      this.cartModal = false
      document.querySelector('body').classList.remove('modal-open')
      window.scrollTo(0, this.scrollPosBeforeLock)
    },
    logOut() {
      this.logoutUser()
      this.drawer = false
    },
  },
}
</script>
