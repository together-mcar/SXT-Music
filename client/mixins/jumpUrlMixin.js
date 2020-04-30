import { mapState, mapMutations } from 'vuex'
import { mapper } from '~/utils/mapping.js'

export default {
  data: () => ({
    mapper
  }),
  methods: {
    ...mapMutations('global', ['MODIFY_NAV_BAR_INDEX']),
    // 已弃用
    jumpRouter (linkUrl, params=null) {
      this.$router.push({ path: linkUrl, params: { params } })
      this.getNavbarIndex(linkUrl)
    },
    // 已弃用
    getNavbarIndex (linkUrl) {
      const isHttpUrl = linkUrl.search(/(http|https):\/\//g)
      if (isHttpUrl !== -1) {
        linkUrl = linkUrl.replace(/(http|https):\/\//g, '')
      }
      const navbarIndex = mapper.NAV_BAR_LIST.find(el => {
        if (el.url === linkUrl) {
          return el
        }
      })
      this.MODIFY_NAV_BAR_INDEX(Number(navbarIndex.value))
    },
    windowReload () {
      window.location.reload()
    },
    windowLocation (linUrl = '/auth/register?type=mobile') {
      window.location.href = linUrl
    },
    // 根据歌手id跳转到歌手详情页
    jumpToArtistDetail (artistId) {
      this.$router.push({ path: '/Artist/detail', query: { id: artistId } })
      this.windowLocation(`/Artist/detail?id=${artistId}`)
    },
    // 通过歌单id跳转到歌单详情
    jumpToMusicSheetDetail (musicSheetId) {
      this.$router.push({ path: '/SongSheet/detail', query: { id: Number(musicSheetId) } })
    },
    // 根据标签跳转到歌单筛选
    jumpToMusicSheetOfTag (tagName) {
      this.$router.push({ path: '/SongSheet', query: { cat: tagName } })
    },
    // 根据搜索关键词跳转到搜索页面
    jumpToSearch (searchKey) {
      this.$router.push({ path: '/Search', query: { key: searchKey } })
      this.windowLocation(`/Search?key=${searchKey}`)
    },
    // 根据歌曲id跳转到歌曲详情
    jumpToMusicDetail (musicId, isAblum = false) {
      this.$router.push({ path: '/RankList/detail', query: { id: Number(musicId), isAblum } })
    },
    jumpToNewDishDetail (mvId) {
      this.$router.push({ path: '/NewDish/detail', query: { id: Number(mvId) } })
      this.windowLocation(`/NewDish/detail?id=${mvId}`)
    },
    jumpToMyMusic () {
      // 不用
      this.$router.push({ path: '/MyMusic/playList', query: { id: 2 } })
    },
    jumpToLogin () {
      this.$router.push({ path: '/Login' })
    },
    jumpToRegister () {
      this.$router.push({ path: '/Register' })
    },
    jumpToMyMusicPlayList (index = -1) {
      this.$router.push({ path: '/MyMusic/playList', query: { index } })
    },
    jumpToMyMusicCollection (index) {
      this.$router.push({ path: '/MyMusic/collection', query: { index } })
    },
    jumpToMyMusicEdit (index) {
      this.$router.push({ path: '/MyMusic/edit', query: { index } })
    },
    jumpToHomePage () {
      this.$router.push({ path: '/' })
    }
  }
}
