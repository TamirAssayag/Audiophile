import Vue from 'vue'
import InlineSvg from 'vue-inline-svg'
import VueScreen from 'vue-screen'
import ImageUrlMixin from './../mixins/ImageUrlMixin'

Vue.use(VueScreen, {
  sm: 480, // will be converted to 480px
  md: '768px', //
  lg: '1440px',
})

Vue.mixin(ImageUrlMixin)
Vue.component('InlineSvg', InlineSvg)
