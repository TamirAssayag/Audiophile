export default {
  methods: {
    getImageUrl(imagePath, options = {}) {
      const { width, height, full } = {
        width: 0,
        height: 0,
        full: null,
        ...options,
      }
      const urlRegexp =
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/

      try {
        if (
          urlRegexp.test(imagePath) ||
          imagePath.startsWith('//a.storyblok.com')
        ) {
          if (full) {
            return (
              '//img2.storyblok.com' +
              full +
              imagePath.replace('//a.storyblok.com', '')
            )
          } else if (width || height)
            return (
              '//img2.storyblok.com' +
              `/${width}x${height}` +
              imagePath.replace('//a.storyblok.com', '')
            )
          else {
            return imagePath.replace(
              '//a.storyblok.com',
              '//img2.storyblok.com'
            )
          }
        }
        return require(`~/assets/images/${imagePath}`)
      } catch (err) {
        return ''
      }
    },
  },
}
