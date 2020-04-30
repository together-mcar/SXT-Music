import { mapState, mapMutations } from 'vuex'
import { mapper } from '~/utils/mapping.js'

export default {
  data: () => ({
    mapper,
    dialogVisible: false
  }),
  methods: {
    loginUser () {
      this.dialogVisible = true
    }
  }
}
