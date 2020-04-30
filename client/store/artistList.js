/**
 * @file 歌手列表数据状态 / ES module
 * @module store/artistList
 */
import { API } from '~/utils/api.js'

export const state = () => ({
  artistPageObj: {},
  artistDetailObj: {},
  artistDetailMvObj: {},
  artistDetailAlbumObj: {},
  artistDetailSimiObj: {},
  artistDetailMvList: [],
  artistDetailAlbumList: []
})

export const mutations = {
  LIST_INIT (state) {
    state.artistDetailMvList = []
    state.artistDetailAlbumList = []
  },
  MODIFY_ARTIST_PAGE_LIST (state, artistObj) {
    state.artistPageObj = artistObj
  },
  MODIFY_ARTIST_DETAIL_OBJ (state, detailObj) {
    state.artistDetailObj = detailObj
  },
  MODIFY_ARTIST_DETAIL_MV_OBJ (state, mvObj) {
    state.artistDetailMvObj = mvObj
    console.log('state.artistDetailMvObj: ', state.artistDetailMvObj)
  },
  GET_ARTIST_DETAIL_MV_LIST (state, mvList) {
    state.artistDetailMvList = [...state.artistDetailMvList, ...mvList]
  },
  MODIFY_ARTIST_DETAIL_ALBUM_OBJ (state, albumObj) {
    state.artistDetailAlbumObj = albumObj
  },
  GET_ARTIST_DETAIL_ALBUM_LIST (state, albumList) {
    state.artistDetailAlbumList = [...state.artistDetailAlbumList, ...albumList]
  },
  MODIFY_ARTIST_DETAIL_SIMI_OBJ (state, simiObj) {
    state.artistDetailSimiObj = simiObj
  }
}

export const actions = {
  async getArtistPageObj ({ commit }, params) {
    await this.$axios.$get(API.GET_ARTIST_LIST, { params }).then(res => {
      if (res.code === 200) {
        commit('MODIFY_ARTIST_PAGE_LIST', res)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_ARTIST_LIST} : ${err}`) })
  },
  async getArtistDetailObj ({ commit }, params) {
    await this.$axios.$get(API.GET_ARTIST_DETAIL, { params }).then(res => {
      if (res.code === 200) {
        commit('MODIFY_ARTIST_DETAIL_OBJ', res)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_ARTIST_DETAIL} : ${err}`) })
  },
  async getArtistDetailMvObj ({ commit }, params) {
    await this.$axios.$get(API.GET_ARTIST_MV, { params }).then(res => {
      if (res.code === 200) {
        commit('MODIFY_ARTIST_DETAIL_MV_OBJ', res)
        commit('GET_ARTIST_DETAIL_MV_LIST', res.mvs)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_ARTIST_MV} : ${err}`) })
  },
  async getArtistDetailAlbumObj ({ commit }, params) {
    await this.$axios.$get(API.GET_ARTIST_ALBUM, { params }).then(res => {
      if (res.code === 200 ) {
        commit('MODIFY_ARTIST_DETAIL_ALBUM_OBJ', res)
        commit('GET_ARTIST_DETAIL_ALBUM_LIST', res.hotAlbums)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_ARTIST_ALBUM} : ${err}`) })
  },
  async getArtistDetailSimiObj ({ commit }, params) {
    await this.$axios.$get(API.GET_ARTIST_SIMI, { params }).then(res => {
      if (res.code === 200) {
        commit('MODIFY_ARTIST_DETAIL_SIMI_OBJ', res)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_ARTIST_SIMI} : ${err}`) })
  }
}
