<template>
  <nav>
    <div class="navbar">
      <v-app-bar absolute color="black" height="80" elevation="2">
        <v-btn icon @click.stop="drawer = !drawer">
          <InlineSvg
            :src="getImageUrl('shared/tablet/icon-hamburger.svg')"
            alt="Menu"
            title="Menu"
            aria-label="Menu"
          />
        </v-btn>
        <InlineSvg :src="getImageUrl('logo.svg')" />
        <v-btn icon>
          <InlineSvg
            :src="getImageUrl('shared/desktop/icon-cart.svg')"
            alt="Cart"
            title="Cart"
            aria-label="Cart"
          />
        </v-btn>
      </v-app-bar>
    </div>
    <v-bottom-sheet v-model="drawer" @keydown.esc="drawer = false" absolute>
      <div class="mobile__menu">
        <Categories />
      </div>
    </v-bottom-sheet>
    <v-divider />
  </nav>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>

<style lang="scss">
nav {
  .navbar {
    height: 80px;

    .v-toolbar__content {
      display: flex !important;
      align-items: center !important;
      width: 100% !important;
      justify-content: space-between;
      padding: 1.5rem;
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
