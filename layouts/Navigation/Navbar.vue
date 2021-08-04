<template>
  <nav>
    <div class="navbar">
      <v-app-bar absolute color="black" height="80" elevation="2" width="100%">
        <v-btn icon @click="drawer = !drawer">
          <InlineSvg
            :src="getImageUrl('shared/tablet/icon-hamburger.svg')"
            alt="Menu"
            title="Menu"
            aria-label="Menu"
          />
        </v-btn>
        <NuxtLink to="/">
          <InlineSvg :src="getImageUrl('logo.svg')" />
        </NuxtLink>
        <v-btn icon @click="toggleCartDialog">
          <InlineSvg
            :src="getImageUrl('shared/desktop/icon-cart.svg')"
            alt="Cart"
            title="Cart"
            aria-label="Cart"
            class="cart__icon"
          />
          <div class="cart__amount">
            <h4 class="text--bold text--white">3</h4>
          </div>
        </v-btn>
      </v-app-bar>
    </div>
    <v-bottom-sheet v-model="drawer" @keydown.esc="drawer = false">
      <div class="mobile__menu">
        <Categories />
      </div>
    </v-bottom-sheet>
    <CartModal :is-open="dialog" @onClose="closeCartDialog" />
    <v-divider />
  </nav>
</template>
<script>
import CartModal from '~/components/Modals/CartModal/CartModal.vue'
export default {
  name: 'Navbar',

  components: { CartModal },

  data: () => ({
    drawer: false,
    group: null,
    dialog: false,
  }),

  watch: {
    group() {
      this.drawer = false
    },

    $route() {
      this.drawer = false
    },
  },

  methods: {
    toggleCartDialog() {
      this.dialog = !this.dialog
      if (this.dialog === true) {
        return document.querySelector('body').classList.add('modal-open')
      } else {
        return document.querySelector('body').classList.remove('modal-open')
      }
    },
    closeCartDialog() {
      this.dialog = false
      return document.querySelector('body').classList.remove('modal-open')
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
      justify-content: space-between;
      padding: 1.5rem;
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
    }
  }
}
.v-bottom-sheet {
  .mobile__menu {
    padding-top: 3.8rem;
    background-color: white;
    border-bottom-right-radius: 8px !important;
    border-bottom-left-radius: 8px !important;
  }
}
</style>
