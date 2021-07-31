<template>
  <section class="category__navigation">
    <div v-for="item in items" :key="item.title">
      <Card :bg-color="'#f1f1f1'">
        <template #image>
          <img
            :src="getImageUrl(item.image)"
            :class="`img ${item._class}`"
            :alt="item.title"
            :aria-label="item.title"
            :title="item.title"
          />
        </template>
        <template #title>
          <h4>{{ item.title }}</h4>
        </template>
        <template #btn>
          <v-btn class="btn btn--text"
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
        _class: 'headphones',
      },
      {
        title: 'Speakers',
        image: 'shared/desktop/image-speakers.png',
        _class: 'speakers',
      },
      {
        title: 'Earphones',
        image: 'shared/desktop/image-earphones.png',
        _class: 'earphones',
      },
    ],
  }),
}
</script>

<style lang="scss"></style>
