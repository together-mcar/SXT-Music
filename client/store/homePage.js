/**
 * @file 首页设置数据状态 / ES module
 * @module store/homePage
 */
import { API } from '~/utils/api.js'

export const state = () => ({
  homePageMusicList: [],
  homePageMvList: [],
  homePageSingerList: []
})

export const mutations = {
  MODIFY_HOME_PAGE_MUSIC_LIST (state, musicList) {
    state.homePageMusicList = musicList
  },
  MODIFY_HOME_PAGE_MV_LIST (state, mvList) {
    state.homePageMvList = mvList
  },
  MODIFY_HOME_PAGE_SINGER_LIST (state, singerList) {
    state.homePageSingerList = singerList
  },
}

export const actions = {
  // 推荐歌曲
  async getHomePageRecommendMusicList ({ commit }) {
    await this.$axios.$get(API.GET_RECOMMEND_NEW_MUSIC).then(res => {
      if (res.code === 200) {
        if (res.result.length > 8) {
          res.result = res.result.filter((item, index) => { return index < 8 })
        }
        commit('MODIFY_HOME_PAGE_MUSIC_LIST', res.result)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_RECOMMEND_NEW_MUSIC} : ${err}`) })
  },
  // 推荐MV
  async getHomePageRecommendMvList ({ commit }) {
    await this.$axios.$get(API.GET_RECOMMEND_MV).then(res => {
      if (res.code === 200) {
        commit('MODIFY_HOME_PAGE_MV_LIST', res.result)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_RECOMMEND_MV} : ${err}`) })
  },
  // 推荐歌手
  async getHomePageRecommendSingerList ({ commit }, params) {
    await this.$axios.$get(API.GET_RECOMMEND_SINGER, { params }).then(res => {
      if (res.code === 200) {
        commit('MODIFY_HOME_PAGE_SINGER_LIST', res.artists)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_RECOMMEND_SINGER} : ${err}`) })
  }
}
