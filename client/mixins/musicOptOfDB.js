import { mapState, mapMutations, mapActions } from 'vuex'
import { mapper } from '~/utils/mapping.js'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'

export default {
  mixins: [jumpUrlMixin],
  data: () => ({
    mapper,
    dialogVisible: false,
    musicIdList: []
  }),
  computed: {
    ...mapState(['userInfo', 'loginStatus'])
  },
  methods: {
    ...mapActions('myMusic', ['addMusicToMusicSheetActions', 'getMusicLoveSheet', 'getMusicSheetListSimple', 'collectionMusicSheetActions']),
    async addMusicToSheet (musicId = [], sheetId = 2) {
      // 向创建歌单中添加歌曲
      if (this.loginStatus && this.userInfo.userName) {
        this.initMusicIdList(musicId)
        const params = {
          sheetId: sheetId,
          musicIdList: this.musicIdList
        }
        await this.addMusicToMusicSheetActions(params).then(() => {
          if (this.$route.path.search('/MyMusic') !== -1) {
            const userId = this.userInfo.userId
            this.getMusicLoveSheet({ userId, love: 1 })
            this.getMusicSheetListSimple({userId})
          }
        })
      } else {
        this.$router.push({ path: '/Login' })
      }
    },
    initMusicIdList (musicId) {
      this.musicIdList = []
      if (Array.isArray(musicId)) {
        this.musicIdList = [...musicId]
      } else {
        this.musicIdList.push(musicId)
      }
    },
    getMusicList (musicObjList) {
      if (this.loginStatus && this.userInfo.userName) {
        const musicIdList = []
        musicObjList.map(el => {
          musicIdList.push(el.id)
        })
        return musicIdList
      } else {
        this.$router.push({ path: '/Login' })
      }
    },
    selectMusicSheet (musicId) {
      if (this.loginStatus && this.userInfo.userName) {
        this.initMusicIdList(musicId)
        this.dialogVisible = true
      } else {
        this.$router.push({ path: '/Login' })
      }
    },
    handleAddMusicToSheetChange (sheetIdList) {
      this.dialogVisible = false
      const idList = [...this.musicIdList]
      if (sheetIdList.length === 1) {
        this.addMusicToSheet(idList, sheetIdList[0])
      } else if (sheetIdList.length > 1) {
        sheetIdList.map(el => {
          this.addMusicToSheet(idList, el)
        })
      }
    },
    async collectionMusicSheet (sheetObj) {
      if (this.loginStatus && this.userInfo.userName) {
        const params = {
          sheetId: sheetObj.id,
          userId: this.userInfo.userId,
          sheetName: sheetObj.name,
          musicNum: sheetObj.tracks.length,
          isCollection: 1,
          cover: sheetObj.coverImgUrl
        }
        await this.collectionMusicSheetActions(params)
      } else {
        this.$router.push({ path: '/Login' })
      }
    }
  }
}
