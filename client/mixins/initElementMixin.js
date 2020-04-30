import { mapState, mapMutations } from 'vuex'
import { mapper } from '~/utils/mapping.js'

export default {
  data: () => ({
    mapper
  }),
  methods: {
    initLyric (str) {
      if (str) {
        return str.toString().replace(/(\[.*\])/g, '<br />')
      } else {
        return ''
      }
    },
    initLyricInMusicPlay (str) {
      if (str) {
        return str.toString().replace(/(\[.*\])/g, '')
      } else {
        return ''
      }
    }
  }
}
