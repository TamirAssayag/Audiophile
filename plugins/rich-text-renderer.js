import Vue from 'vue'
import { Block } from '@marvr/storyblok-rich-text-types'
import VueRichTextRenderer from '@marvr/storyblok-rich-text-vue-renderer'
import Paragraph from '../components/RichTextEditor/Paragraph'
import Body from '../components/RichTextEditor/Body'

Vue.use(VueRichTextRenderer, {
  resolvers: {
    blocks: {
      [Block.PARAGRAPH]: Paragraph,
      [Block.DOCUMENT]: Body,
    },
  },
})
