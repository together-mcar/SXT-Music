/**
 * @file 单曲设置数据状态 / ES module
 * @module store/music
 */
import { API } from '~/utils/api.js'

export const state = () => ({
  musicDetailObj: {},
  musicDetailListObj: {},
  musicDetailLyric: {},
  playMusicList: [],
  playMusicListPosition: 0,
  isShowPlayMusic: false,
  currentMusicUrlList: []
})

export const mutations = {
  MODIFY_MUSIC_DETAIL_OBJ (state, detailObj) {
    state.musicDetailObj = detailObj
  },
  MODIFY_MUSIC_DETAIL_LIST_OBJ (state, detailListObj) {
    state.musicDetailListObj = detailListObj
    console.log('musicDetailListObj: ', state.musicDetailListObj)
  },
  MODIFY_MUSIC_DETAIL_LYRIC (state, lyric) {
    state.musicDetailLyric = lyric
  },
  MODIFY_PLAY_MUSIC_LIST (state, musicList) {
    state.playMusicList = musicList
    state.isShowPlayMusic = true
  },
  MODIFY_PLAY_MUSIC_LIST_POSITION (state, position) {
    state.playMusicListPosition = position
  },
  MODIFY_MUSIC_URL (state, musicUrlList) {
    state.currentMusicUrlList = musicUrlList
  },
  COLSE_PLAY_MUSIC (state) {
    state.isShowPlayMusic = false
  }
}

export const actions = {
  async getMusicDetailObj ({ commit }, musicId) {
    const params = {
      ids: musicId
    }
    await this.$axios.$get(API.GET_MUSIC_DETAIL, { params }).then(res => {
      if (res.code === 200) {
        commit('MODIFY_MUSIC_DETAIL_OBJ', res)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_MUSIC_DETAIL} : ${err}`) })
  },
  async getAblumDetailObj ({ commit }, ablumId) {
    const params = {
      id: ablumId
    }
    await this.$axios.$get(API.GET_ABLUM_DETAIL, { params }).then(res => {
      if (res.code === 200) {
        console.log('getAblumDetailObj - res: ', res)
        commit('MODIFY_MUSIC_DETAIL_OBJ', res)
      }
    })
  },
  async getMusicDetailListObj ({ commit }, musicIdList) {
    const params = {
      ids: musicIdList
    }
    console.log('getMusicDetailListObj - params: ', params)
    await this.$axios.$get(API.GET_MUSIC_DETAIL, { params }).then(res => {
      if (res.code === 200) {
        console.log('getMusicDetailListObj - res: ', res)
        commit('MODIFY_MUSIC_DETAIL_LIST_OBJ', res)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_MUSIC_DETAIL} : ${err}`) })
  },
  async getMusicDetailLyric ({ commit }, musicId) {
    const params = {
      id: musicId
    }
    await this.$axios.$get(API.GET_MUSIC_LYRIC, { params }).then(res => {
      if (res.code === 200) {
        commit('MODIFY_MUSIC_DETAIL_LYRIC', res)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_MUSIC_LYRIC} : ${err}`) })
  },
  async getCurrentMusicUrl ({ commit }, params) {
    await this.$axios.$get(API.GET_MUSIC_URL, { params }).then(res => {
      if (res.code === 200) {
        console.log('getCurrentMusicUrl: ', res.data)
        commit('MODIFY_MUSIC_URL', res.data)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_MUSIC_URL} : ${err}`) })
  }
}
