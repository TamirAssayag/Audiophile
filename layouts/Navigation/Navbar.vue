<template>
  <nav>
    <div
      v-if="$screen.desktop"
      :class="[
        'navbar navbar--desktop',
        { 'z-index--150': $route.name === 'checkout' },
      ]"
    >
      <v-app-bar absolute color="black" height="80" elevation="2" width="100%">
        <div class="navbar__left">
          <client-only>
            <NuxtLink to="/"> <AudiophileLogo /> </NuxtLink>
          </client-only>

          <ul class="nav__menu">
            <li
              v-for="nav in navigation"
              :key="nav.link"
              class="nav__menu--item"
            >
              <NuxtLink :to="nav.link">{{ nav.name }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="navbar__right d-flex align-center">
          <v-scroll-y-reverse-transition appear hide-on-leave group>
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
          </v-scroll-y-reverse-transition>

          <v-scroll-y-reverse-transition appear leave-absolute>
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
          </v-scroll-y-reverse-transition>
        </div>

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
      </v-app-bar>
    </div>
    <div
      v-else
      :class="['navbar', { 'z-index--150': $route.name === 'checkout' }]"
    >
      <v-app-bar absolute color="black" height="80" elevation="2" width="100%">
        <v-btn icon title="Menu" aria-label="Menu" @click="drawer = !drawer">
          <MenuSvg />
        </v-btn>
        <NuxtLink to="/">
          <AudiophileLogo />
        </NuxtLink>
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
      </v-app-bar>
    </div>
    <v-bottom-sheet v-model="drawer" @keydown.esc="drawer = false">
      <div
        v-if="!loggedIn"
        class="sign-up__login d-flex align-center flex-column pt-5"
      >
        <clien-only>
          <NuxtLink to="/signup">
            <v-btn class="btn btn--text" title="Sign up" aria-label="Sign up">
              Sign Up
            </v-btn>
          </NuxtLink>
          <NuxtLink to="/login">
            <v-btn class="btn btn--text mt-1" title="Login" aria-label="Login">
              Login
            </v-btn>
          </NuxtLink>
        </clien-only>
      </div>
      <v-slide-y-transition v-else appear mode="in-out">
        <div class="menu">
          <client-only>
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
          </client-only>
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

<style lang="scss">
nav {
  position: relative;
  height: 80px;
  .navbar {
    position: fixed;
    inset: 0;
    max-height: 80px;
    z-index: 300;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 0.0625rem;
      width: 100%;
      opacity: 0.1;
      background-color: #fff;
      z-index: 250;
      left: 50%;
      transform: translate(-50%, 0);
      max-width: $lg-width !important;

      @include media('<=lg') {
        width: 100%;
        max-width: unset !important;
      }
    }

    .v-toolbar__content {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      padding: 1.5rem;

      @include media('>=md') {
        justify-content: unset !important;
        gap: 1.6rem;

        .cart__icon {
          margin-left: auto;
        }
      }

      @include media('>=lg') {
        width: $lg-width;

        .cart__icon {
          margin-left: unset;
        }
        justify-content: unset !important;
        margin: auto;
        padding: 1.5rem;
      }
    }

    &__left {
      display: flex;

      .nav__menu {
        margin-left: 197px;
        display: flex;
        list-style-type: none;
        padding: 0;
        gap: 2.12rem;
        a {
          transition: color 0.2s ease;
          color: white !important;

          &:hover {
            color: $orange !important;
          }
        }
        &--item {
          font-size: 13px;
          font-weight: bold;
          line-height: 1.92;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: white;
        }
      }
    }

    &__right {
      margin-left: auto;
    }

    .cart__icon {
      position: relative;
    }
    .cart__amount {
      position: absolute;
      height: 20px;
      width: 20px;
      background-color: $orange;
      border-radius: 50%;
      top: 0px;
      left: -8px;
      font-weight: bold;
      z-index: 2;
    }
  }
}
.v-bottom-sheet {
  .mobile__menu {
    background-color: white;
    border-bottom-right-radius: 8px !important;
    border-bottom-left-radius: 8px !important;
    height: 100%;
    max-height: 100%;
    padding: 0 1.5rem;
  }

  .sign-up__login {
    padding: 0 1rem;
    background-color: white;
    min-height: 150px;

    @include media('>=md') {
      min-height: 110px;
    }
  }
}

.logout {
  .v-list-item {
    transition: all 0.2s ease !important;
    &:hover {
      color: white !important;
      background-color: black !important;
      font-weight: bold;
    }
  }
}
</style>
