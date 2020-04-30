/**
 * @file 歌单设置数据状态 / ES module
 * @module store/musicSheet
 */
import { API } from '~/utils/api.js'

export const state = () => ({
  musicSheetTypeObj: {},
  musicSheetObj: {},
  musicSheetDetailObj: {}
})

export const mutations = {
  MODIFY_MUSIC_SHEET_TYPE_OBJ (state, typeObj) {
    state.musicSheetTypeObj = typeObj
  },
  MODIFY_MUSIC_SHEET_OBJ (state, listObj) {
    state.musicSheetObj = listObj
  },
  MODIFY_MUSIC_SHEET_DETAIL_OBJ (state, detailObj) {
    state.musicSheetDetailObj = detailObj
  }
}

export const actions = {
  async getMusicSheetTypeObj ({ commit }) {
    await this.$axios.$get(API.GET_MUSIC_SHEET_TYPE).then(res => {
      if (res.code === 200) {
        commit('MODIFY_MUSIC_SHEET_TYPE_OBJ', res)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_MUSIC_SHEET_TYPE} : ${err}`) })
  },
  async getMusicSheetObj ({ commit }, params) {
    await this.$axios.$get(API.GET_MUSIC_SHEET, { params }).then(res => {
      if (res.code === 200) {
        commit('MODIFY_MUSIC_SHEET_OBJ', res)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_MUSIC_SHEET} : ${err}`) })
  },
  async getMusicSheetDetailObj ({ commit }, musicId) {
    const params = {
      id: Number(musicId)
    }
    await this.$axios.$get(API.GET_MUSIC_SHEET_DETAIL, { params }).then(res => {
      if (res.code === 200) {
        commit('MODIFY_MUSIC_SHEET_DETAIL_OBJ', res)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_MUSIC_SHEET_DETAIL} : ${err}`) })
  }
}
