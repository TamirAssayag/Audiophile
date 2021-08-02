<template>
  <p class="rich__p"><slot></slot></p>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Paragraph',
})
</script>

<style></style>
