import Vue from 'vue'
import InlineSvg from 'vue-inline-svg'
import VueScreen from 'vue-screen'
import ImageUrlMixin from './../mixins/ImageUrlMixin'
import helpers from './../mixins/helpers'

Vue.use(VueScreen, {
  mobile: 480, // will be converted to 480px
  tablet: '768px', //
  desktop: '1440px',
})

Vue.mixin(ImageUrlMixin)
Vue.mixin(helpers)
Vue.component('InlineSvg', InlineSvg)
