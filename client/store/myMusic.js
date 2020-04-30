/**
 * @file 我的音乐数据状态 / ES module
 * @module store/myMusic
 */
import { LOCAL_API } from '~/utils/localApi.js'
import Vue from 'vue'

export const state = () => ({
  loveMusicSheetSimple: {},
  musicSheetListSimple: [],
  collectionSheetListSimple: [],
  musicSheetDetailSimple: {},
  musicSheetTypeTag: [],
  musicSheetDetail: {},
  musicIdList: []
})

export const mutations = {
  MODIFY_LOVE_MUSIC_SHEET_SIMPLE (state, data) {
    state.loveMusicSheetSimple = Object.assign({}, state.loveMusicSheetSimple, data)
  },
  MODIFY_MUSIC_SHEET_LIST_SIMPLE (state, data) {
    state.musicSheetListSimple = []
    state.collectionSheetListSimple = []
    data.map(item => {
      if (item.isCollection) {
        state.collectionSheetListSimple.push(item)
      } else {
        state.musicSheetListSimple.push(item)
      }
    })
  },
  MODIFY_MUSIC_SHEET_DETAIL_SIMPLE (state, obj) {
    state.musicSheetDetailSimple = obj
  },
  MODIFY_MUSIC_SHEET_TYPE_TAG (state, list) {
    state.musicSheetTypeTag = list
  },
  MODIFY_MUSIC_SHEET_DETAIL (state, obj) {
    state.musicSheetDetail = obj
  },
  MODIFY_MUSIC_ID_LIST (state, list) {
    state.musicIdList = list
  }
}

export const actions = {
  async createMusicSheet ({ commit }, params) {
    console.log('myMusic - createMusicSheet - params', params)
    await this.$axios.$post(LOCAL_API.CREATE_MUSIC_SHEET, { params }).then(res => {
      if (res.code === 200) {
        Vue.prototype.$message({
          type: 'success',
          message: res.msg
        })
      } else if (res.code === 400) {
        Vue.prototype.$message({
          type: 'error',
          message: res.msg
        })
      }
    })
    .catch(err => {
      console.log(`Error · ${LOCAL_API.CREATE_MUSIC_SHEET} : ${err}`)
    })
  },
  async getMusicLoveSheet ({ commit }, params) {
    await this.$axios.$get(LOCAL_API.GET_MUSIC_LOVE_SHEET, { params }).then(res => {
      if (res.code === 200) {
        console.log('myMusic - getMusicLoveSheet - res: ', res)
        commit('MODIFY_LOVE_MUSIC_SHEET_SIMPLE', res.musicSheet)
      } else if (res.code === 400) {
        Vue.prototype.$message({
          type: 'error',
          message: res.msg
        })
      }
    })
    .catch(err => {
      console.log(`Error · ${LOCAL_API.GET_MUSIC_LOVE_SHEET} : ${err}`)
    })
  },
  async getMusicSheetListSimple ({ commit }, params) {
    await this.$axios.$get(LOCAL_API.GET_MUSIC_SHEET, { params }).then(res => {
      if (res.code === 200) {
        commit('MODIFY_MUSIC_SHEET_LIST_SIMPLE', res.musicSheet)
      } else if (res.code === 400) {
        Vue.prototype.$message({
          type: 'error',
          message: res.msg
        })
      }
    })
    .catch(err => {
      console.log(`Error · ${LOCAL_API.GET_MUSIC_SHEET} : ${err}`)
    })
  },
  async delMusicSheet ({ commit }, params) {
    console.log('myMusic - delMusicSheet - params:', params)
    await this.$axios.$get(LOCAL_API.DEL_MUSIC_SHEET, { params }).then(res => {
      if (res.code === 200) {
        Vue.prototype.$message({
          type: 'success',
          message: res.msg
        })
      } else if (res.code === 400) {
        Vue.prototype.$message({
          type: 'error',
          message: res.msg
        })
      }
    })
    .catch(err => {
      console.log(`Error · ${LOCAL_API.DEL_MUSIC_SHEET} : ${err}`)
    })
  },
  async initMusicSheetTagType ({ commit }, params) {
    await this.$axios.$get(LOCAL_API.INIT_MUSIC_SHEET_TAG, { params })
    .catch(err => {
      console.log(`Error · ${LOCAL_API.INIT_MUSIC_SHEET_TAG} : ${err}`)
    })
  },
  async getMusicSheetTagType ({ commit }) {
    await this.$axios.$get(LOCAL_API.GET_MUSIC_SHEET_TAG).then(res => {
      if (res.code === 200) {
        commit('MODIFY_MUSIC_SHEET_TYPE_TAG', res.data)
      }
    })
    .catch(err => {
      console.log(`Error · ${LOCAL_API.GET_MUSIC_SHEET_TAG} : ${err}`)
    })
  },
  async getMusicSheetDetailBySheetId ({ commit }, params) {
    console.log('myMusic - getMusicSheetDetailBySheetId - params:', params)
    await this.$axios.$get(LOCAL_API.GET_MUSIC_SHEET_DETAIL, { params }).then(res => {
      if (res.code === 200) {
        commit('MODIFY_MUSIC_SHEET_DETAIL', res.data)
      }
    })
    .catch(err => {
      console.log(`Error · ${LOCAL_API.GET_MUSIC_SHEET_DETAIL} : ${err}`)
    })
  },
  async modifyMusicSheetDetailSimple ({ commit }, params) {
    console.log('myMusic - modifyMusicSheetDetailSimple - params:', params)
    await this.$axios.$get(LOCAL_API.MODIFY_MUSIC_SHEET_DETAIL, { params }).then(res => {
      if (res.code === 200) {
        Vue.prototype.$message({
          type: 'success',
          message: res.msg
        })
      } else {
        Vue.prototype.$message({
          type: 'error',
          message: res.msg
        })
      }
    })
    .catch(err => {
      console.log(`Error · ${LOCAL_API.MODIFY_MUSIC_SHEET_DETAIL} : ${err}`)
    })
  },
  async getMusicListBySheetIdActions ({ commit }, params) {
    console.log('myMusic - getMusicListBySheetIdActions - params:', params)
    await this.$axios.$get(LOCAL_API.GET_MUSIC_LIST_BY_SHEET_ID, { params }).then(res => {
      console.log('myMusic - getMusicListBySheetIdActions - res: ', res)
      if (res.code === 200) {
        let idList = []
        if (res.data.length !== 0) {
          res.data.forEach(el => {
            idList.push(el.musicId)
          })
          commit('MODIFY_MUSIC_ID_LIST', idList)
        } else {
          commit('MODIFY_MUSIC_ID_LIST', [])
        }
      }
    })
    .catch(err => {
      console.log(`Error · ${LOCAL_API.GET_MUSIC_LIST_BY_SHEET_ID} : ${err}`)
    })
  },
  async addMusicToMusicSheetActions ({ commit }, params) {
    console.log('myMusic - addMusicToMusicSheetActions - params:', params)
    await this.$axios.$get(LOCAL_API.ADD_MUSIC_TO_MUSIC_SHEET, { params }).then(res => {
      console.log('myMusic addMusicToMusicSheetActions - res:', res)
      if (res.code === 200) {
        Vue.prototype.$message({
          type: 'success',
          message: res.msg
        })
      } else {
        Vue.prototype.$message({
          type: 'error',
          message: res.msg
        })
      }
    })
    .catch(err => {
      console.log(`Error · ${LOCAL_API.ADD_MUSIC_TO_MUSIC_SHEET} : ${err}`)
    })
  },
  async addArtistToDbActions ({ commit }, params) {
    console.log('myMusic - addArtistToDbActions - params:', params)
    await this.$axios.$post(LOCAL_API.ADD_ARTIST_TO_DB, { params }).then(res => {
      if (res.code === 200) {
        Vue.prototype.$message({
          type: 'success',
          message: res.msg
        })
      } else if (res.code === 400) {
        Vue.prototype.$message({
          type: 'error',
          message: res.msg
        })
      }
    })
    .catch(err => {
      console.log(`Error · ${LOCAL_API.ADD_ARTIST_TO_DB} : ${err}`)
    })
  },
  async collectionMusicSheetActions ({ commit }, params) {
    console.log('myMusic - collectionMusicSheetActions - params:', params)
    await this.$axios.$get(LOCAL_API.COLLECTION_MUSIC_SHEET, { params }).then(res => {
      console.log('myMusic - collectionMusicSheetActions - res:', res)
      if (res.code === 200) {
        Vue.prototype.$message({
          type: 'success',
          message: res.msg
        })
      } else if (res.code === 400) {
        Vue.prototype.$message({
          type: 'error',
          message: res.msg
        })
      }
    })
    .catch(err => {
      console.log(`Error · ${LOCAL_API.COLLECTION_MUSIC_SHEET} : ${err}`)
    })
  }
}
