import { API } from "../utils/api"

/**
 * @file mv数据设置 / ES module
 * @module store/newDish
 */

export const state = () => ({
  newDishObj: {},
  mvDetailObj: {},
  mvUrlObj: {}
})

export const mutations = {
  MODIFY_NEW_DISH_LIST (state, dishList) {
    state.newDishObj = dishList
  },
  MODIFY_MV_DETAIL_OBJ (state, detailObj) {
    state.mvDetailObj = detailObj
  },
  MODIFY_MV_URL_OBJ (state, urlData) {
    state.mvUrlObj = urlData
  }
}

export const actions = {
  async getTopMv ({ commit }, params) {
    params = { ...params, limit: 9 }
    await this.$axios.$get(API.GET_TOP_MV, { params }).then(res => {
      if (res.code === 200) {
        commit('MODIFY_NEW_DISH_LIST', res)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_TOP_MV} : ${err}`) })
  },
  async getMvDetailObj ({ commit }, mvId) {
    const params = {
      mvid: mvId
    }
    await this.$axios.$get(API.GET_MV_DETAIL, { params }).then(res => {
      if (res.code === 200) {
        commit('MODIFY_MV_DETAIL_OBJ', res)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_MV_DETAIL} : ${err}`) })
  },
  async getMvUrlObj ({ commit }, mvId) {
    const params = {
      id: mvId
    }
    this.$axios.$get(API.GET_MV_URL, { params }).then(res => {
      if (res.code === 200) {
        commit('MODIFY_MV_URL_OBJ', res.data)
      }
    })
    .catch(err => { console.log(`Error · ${API.getMvUrlObj} : ${err}`) })
  }
}
