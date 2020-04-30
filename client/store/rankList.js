import { API } from "../utils/api"

/**
 * @file 排行榜数据设置 / ES module
 * @module store/rankList
 */

export const state = () => ({
  rankPageList: [],
  rankTableList: []
})

export const mutations = {
  MODIFY_RANK_PAGE_LIST (state, rankObj) {
    state.rankPageList = rankObj
  },
  MODIFY_RANK_TABLE_LIST (state, rankTable) {
    state.rankTableList = rankTable
  }
}

export const actions = {
  async getTopList ({ commit }, id) {
    const params = {
      idx: id
    }
    await this.$axios.$get(API.GET_TOP_MUSIC, { params }).then(res => {
      if (res.code === 200) {
        commit('MODIFY_RANK_PAGE_LIST', res)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_TOP_MUSIC} : ${err}`) })
  },
  async getTopTableList ({ commit }) {
    await this.$axios.$get(API.GET_TOP_ALL_LIST).then(res => {
      if (res.code === 200) {
        commit('MODIFY_RANK_TABLE_LIST', res.list)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_TOP_ALL_LIST} : ${err}`) })
  }
}
