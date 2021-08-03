import { mapGetters } from 'vuex'

export default {
  methods: {
    logConsole(param) {
      console.log(param)
    },
  },
  computed: {
    ...mapGetters({
      products: 'products/products',
    }),
  },
}
