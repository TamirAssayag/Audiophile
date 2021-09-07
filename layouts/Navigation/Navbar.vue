<template>
  <nav>
    <div v-if="$screen.desktop" class="navbar navbar--desktop">
      <v-app-bar absolute color="black" height="80" elevation="2" width="100%">
        <div class="navbar__left">
          <NuxtLink to="/">
            <AudiophileLogo />
          </NuxtLink>

          <ul class="nav__menu">
            <NuxtLink to="/">
              <li class="nav__menu--item" :to="'/'">Home</li>
            </NuxtLink>
            <NuxtLink to="/headphones">
              <li class="nav__menu--item">Headphones</li>
            </NuxtLink>
            <NuxtLink to="/speakers">
              <li class="nav__menu--item">Speakers</li>
            </NuxtLink>
            <NuxtLink to="/earphones">
              <li class="nav__menu--item">Earphones</li>
            </NuxtLink>
          </ul>
        </div>

        <div class="navbar__right d-flex align-center">
          <v-scroll-y-reverse-transition appear hide-on-leave group>
            <div v-if="!loggedIn" :key="loggedIn">
              <NuxtLink to="/signup">
                <v-btn class="btn btn--signup mr-2">Sign Up</v-btn>
              </NuxtLink>
              <NuxtLink to="/login">
                <v-btn class="btn btn--login mr-5">Login</v-btn>
              </NuxtLink>
            </div>
          </v-scroll-y-reverse-transition>
          <v-scroll-y-reverse-transition appear leave-absolute>
            <div v-if="loggedIn" class="logout mr-5">
              <v-menu
                transition="scroll-y-reverse-transition"
                attach
                offset-y
                :top="false"
                open-on-hover
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-if="getUser._id"
                    class="btn btn--account"
                    elevation="0"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Account
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
    <div v-else class="navbar">
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
        <NuxtLink to="/signup">
          <v-btn class="btn btn--text"> Sign Up </v-btn>
        </NuxtLink>
        <NuxtLink to="/login">
          <v-btn class="btn btn--text mt-1"> Login </v-btn>
        </NuxtLink>
      </div>
      <v-slide-y-transition v-else appear mode="in-out">
        <div class="logout">
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
                v-on="on"
              >
                Account
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
                <v-list-item-title @click="logOut">Logout </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-slide-y-transition>
      <div class="mobile__menu">
        <Categories />
      </div>
    </v-bottom-sheet>
    <CartModal :is-open="dialog" @onClose="closeCartDialog" />
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
    dialog: false,

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
      removeAllCartItems: 'cart/removeAllCartItems',
      logoutUser: 'user/logoutUser',
    }),
    toggleCartDialog() {
      this.dialog = !this.dialog
      if (this.dialog) {
        this.scrollPosBeforeLock = window.scrollY
        document.querySelector('body').classList.add('modal-open')
      } else {
        document.querySelector('body').classList.remove('modal-open')
        setTimeout(() => {
          window.scrollTo(0, this.scrollPosBeforeLock)
        })
      }
    },
    closeCartDialog() {
      this.dialog = false
      document.querySelector('body').classList.remove('modal-open')
      setTimeout(() => {
        window.scrollTo(0, this.scrollPosBeforeLock)
      })
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
    z-index: 999;
    inset: 0;
    max-height: 80px;

    .v-toolbar__content {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      padding: 1.5rem;

      @include media('>=lg') {
        width: 1110px;
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
        &--item {
          font-size: 13px;
          font-weight: bold;
          line-height: 1.92;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: white;
          transition: color 0.2s ease;

          &:hover {
            color: $orange;
          }
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
    padding-top: 3.8rem;
    background-color: white;
    border-bottom-right-radius: 8px !important;
    border-bottom-left-radius: 8px !important;
    height: 100%;
    padding-bottom: 2.5rem;
    max-height: 100%;
  }

  .sign-up__login {
    padding: 0 1rem;
    background-color: white;
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
