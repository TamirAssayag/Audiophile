<template>
  <div class="products">
    <div class="products__container">
      <template v-for="item in cardProducts.slice(0, 2)">
        <Card :key="item.title" :bg-color="item.cardColor" :class="item._class">
          <template #image>
            <NuxtImg
              v-if="item.image"
              provider="static"
              :src="item.image"
              alt="ZX9 Speaker"
              title="ZX9 Speaker"
              aria-label="ZX9 Speaker"
            />
          </template>
          <template #title>
            <header>
              <h1>{{ item.title }}</h1>
            </header>
          </template>
          <template v-if="item.description" #description>
            <p>
              {{ item.description }}
            </p>
          </template>
          <template #btn>
            <NuxtLink v-if="item.link" :to="item.link">
              <v-btn
                elevation="0"
                aria-label="See Product"
                title="See Product"
                :class="`btn ${item.btnStyle}`"
                >SEE PRODUCT</v-btn
              >
            </NuxtLink>
          </template>
        </Card>
      </template>
      <div class="container__earphones">
        <template v-for="item in cardProducts.slice(2, 4)">
          <Card
            :key="item.title"
            :bg-color="item.cardColor"
            :class="item._class"
          >
            <template #title>
              <header>
                <h1>{{ item.title }}</h1>
              </header>
            </template>
            <template #btn>
              <NuxtLink v-if="item.link" :to="item.link">
                <v-btn
                  elevation="0"
                  :class="`btn ${item.btnStyle}`"
                  aria-label="See Product"
                  title="See Product"
                  >SEE PRODUCT</v-btn
                >
              </NuxtLink>
            </template>
          </Card>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../Layout/UI/Card.vue'
import './Products.scss'
export default {
  components: { Card },
  data: () => ({
    cardProducts: [
      {
        title: 'ZX9 SPEAKER',
        description:
          'Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.',
        image: 'home/desktop/image-speaker-zx9.png',
        _class: 'audiophile-product-1',
        link: '/speakers/zx9-speaker',
        cardColor: '#d87d4a',
        btnStyle: 'btn--black',
        wrap: 'Card',
      },
      {
        title: 'ZX7 SPEAKER',
        _class: 'audiophile-product-2',
        cardColor: '#f1f1f1',
        link: '/speakers/zx7-speaker',
        btnStyle: 'btn--border',
        wrap: 'Card',
      },
      {
        _class: 'audiophile-product-3',
        wrap: 'component',
      },
      {
        title: 'YX1 EARPHONES',
        _class: 'audiophile-product-4',
        cardColor: '#f1f1f1',
        link: '/earphones/yx1-wireless-earphones',
        btnStyle: 'btn--border',
        wrap: 'component',
      },
    ],
    cardColors: ['#d87d4a', '#f1f1f1'],
  }),
}
</script>
