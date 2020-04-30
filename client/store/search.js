import { API } from "../utils/api"

/**
 * @file 搜索数据设置 / ES module
 * @module store/search
 */

export const state = () => ({
  searchMusicObj: {},
  searchAlbumObj: {},
  searchArtistObj: {},
  searchMusicSheetObj: {},
  searchStoreKey: '',
  searchMusicCurrentPage: 1,
  searchAlbumList: [],
  searchArtistList: [],
  searchMusicSheetList: []
})

export const mutations = {
  SEARCH_INIT (state) {
    state.searchAlbumList = []
    state.searchArtistList = []
    state.searchMusicSheetList = []
  },
  MODIFY_SEARCH_MUSIC_OBJ (state, data) {
    state.searchMusicObj = data
  },
  MODIFY_SEARCH_ALBUM_OBJ (state, data) {
    state.searchAlbumObj = data
  },
  GET_SEARCH_ALBUM_LIST (state, data) {
    state.searchAlbumList = [...state.searchAlbumList, ...data]
  },
  MODIFY_SEARCH_ARTIST_OBJ (state, data) {
    state.searchArtistObj = data
  },
  GET_SEARCH_ARTIST_LIST (state, data) {
    state.searchArtistList = [...state.searchArtistList, ...data]
  },
  MODIFY_SEARCH_MUSIC_SHEET_OBJ (state, data) {
    state.searchMusicSheetObj = data
  },
  GET_SEARCH_MUSIC_SHEET_LIST (state, data) {
    state.searchMusicSheetList = [...state.searchMusicSheetList, ...data]
  },
  MODIFY_SEARCH_KEY (state, newKey) {
    state.searchStoreKey = newKey
  },
  MODIFY_CURRENT_PAGE (state, index) {
    state.searchMusicCurrentPage = Number(index)
  }
}

export const actions = {
  async getSearchObj ({ commit }, params) {
    await this.$axios.$get(API.GET_SEARCH_DETAIL, {params}).then(res => {
      if (res.code === 200) {
        if (params.type === 1) {
          commit('MODIFY_SEARCH_MUSIC_OBJ', res)
        }
        if (params.type === 10) {
          commit('MODIFY_SEARCH_ALBUM_OBJ', res)
          commit('GET_SEARCH_ALBUM_LIST', res.result.albums)
        }
        if (params.type === 100) {
          commit('MODIFY_SEARCH_ARTIST_OBJ', res)
          commit('GET_SEARCH_ARTIST_LIST', res.result.artists)
        }
        if (params.type === 1000) {
          commit('MODIFY_SEARCH_MUSIC_SHEET_OBJ', res)
          commit('GET_SEARCH_MUSIC_SHEET_LIST', res.result.playlists)
        }
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_SEARCH_DETAIL} : ${err}`) })
  }
}
