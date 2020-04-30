import { mapState, mapMutations, mapActions } from 'vuex'
import { mapper } from '~/utils/mapping.js'

export default {
  data: () => ({
    mapper,
    musicPlayList: [],
    musicPlayPosition: 0
  }),
  methods: {
    ...mapMutations('music', ['MODIFY_PLAY_MUSIC_LIST', 'MODIFY_PLAY_MUSIC_LIST_POSITION']),
    ...mapActions('music', ['getCurrentMusicUrl']),
    commitPlayMusic () {
      this.MODIFY_PLAY_MUSIC_LIST(this.musicPlayList)
      this.MODIFY_PLAY_MUSIC_LIST_POSITION(this.musicPlayPosition)
    },
    clearMusicPlayList () {
      this.musicPlayList = []
    },
    getSingleMusicPlay (musicObj) {
      console.log('getSingleMusicPlay: ', musicObj)
      this.clearMusicPlayList()
      this.musicPlayList.push(musicObj)
      this.loadMusicUrl()
      this.commitPlayMusic()
    },
    getMoreMusicPlay (musicObjList, index = 0) {
      console.log('============>', musicObjList, index)
      this.musicPlayList = [...musicObjList]
      this.loadMusicUrl()
      this.musicPlayPosition = index
      this.commitPlayMusic()
    },
    async loadMusicUrl () {
      let idList = []
      this.musicPlayList.forEach(el => {
        idList.push(el.id)
      })
      const params = {
        id: idList.join(',')
      }
      await this.getCurrentMusicUrl(params)
    }
  }
}
