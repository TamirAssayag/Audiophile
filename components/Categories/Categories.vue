<template>
  <section class="category__navigation">
    <div v-for="item in items" :key="item.title">
      <NuxtLink :to="'/' + item.slug">
        <Card :bg-color="'#f1f1f1'">
          <client-only>
            <template #image>
              <NuxtImg
                provider="static"
                :src="item.image"
                :class="`img ${item.slug}`"
                :alt="item.title"
                :aria-label="item.title"
                :title="item.title"
              />
            </template>
          </client-only>
          <template #title>
            <h4>{{ item.title }}</h4>
          </template>
          <template #btn>
            <v-btn class="btn btn--text"
              >SHOP &nbsp;
              <IconRight />
            </v-btn>
          </template>
        </Card>
      </NuxtLink>
    </div>
  </section>
</template>

<script>
import Card from '../Layout/UI/Card.vue'
import IconRight from '~/static/images/shared/desktop/icon-arrow-right.svg?inline'
import './Categories.scss'
export default {
  components: { Card, IconRight },
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
