<template>
  <section class="category__navigation">
    <div v-for="item in items" :key="item.title">
      <Card :bg-color="'#f1f1f1'">
        <template #image>
          <img
            :src="getImageUrl(item.image)"
            :class="`img ${item.slug}`"
            :alt="item.title"
            :aria-label="item.title"
            :title="item.title"
          />
        </template>
        <template #title>
          <h4>{{ item.title }}</h4>
        </template>
        <template #btn>
          <v-btn class="btn btn--text" :to="item.slug"
            >SHOP &nbsp;
            <InlineSvg
              :src="getImageUrl('shared/desktop/icon-arrow-right.svg')"
          /></v-btn>
        </template>
      </Card>
    </div>
  </section>
</template>

<script>
import Card from '../Layout/UI/Card.vue'
import './Categories.scss'
export default {
  components: { Card },
  data: () => ({
    items: [
      {
        title: 'Headphones',
        image: 'shared/desktop/image-headphones.png',
        slug: 'headphones',
      },
      {
        title: 'Speakers',
        image: 'shared/desktop/image-speakers.png',
        slug: 'speakers',
      },
      {
        title: 'Earphones',
        image: 'shared/desktop/image-earphones.png',
        slug: 'earphones',
      },
    ],
  }),
}
</script>

<style lang="scss"></style>
