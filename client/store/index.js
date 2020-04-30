/**
 * @file store 首页相关数据加载
 * @module $store
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { API } from '~/utils/api.js'
import { LOCAL_API } from '~/utils/localApi.js'
import { cookieToJson, longToNumber, initCookie } from '@/utils'
import jwtDecode from 'jwt-decode'
Vue.use(Vuex)

export const state = () => ({
  homePageWheel: [],
  loginStatus: false,
  userInfo: {}
})

export const mutations = {
  MODIFY_HOME_PAGE_WHEEL (state, data) {
    state.homePageWheel = data
  },
  IS_MODIFY_LOGIN_STATUS (state, status) {
    state.loginStatus = status
  },
  MODIFY_USER_INFO (state, info) {
    state.userInfo = info
  },
  LOG_OUT (state) {
    state.loginStatus = false
    state.userInfo = {}
    Vue.prototype.$cookies.set('LOGIN_STATUS', state.loginStatus)
    Vue.prototype.$cookies.set('USER_INFO', state.userInfo)
  }
}

export const actions = {
  async getHomePageWheel ({ commit }) {
    const params = {
      '/api/v2/banner/get': {"clientType":"pc"}
    }
    await this.$axios.$get(API.GET_BATCH_FOR_BANNER_URL, { params })
    .then(res => {
      if (res.code === 200 && res['/api/v2/banner/get'].code === 200) {
        commit('MODIFY_HOME_PAGE_WHEEL', res['/api/v2/banner/get'].banners)
      }
    })
    .catch(err => { console.log(`Error · ${API.GET_BATCH_FOR_BANNER_URL} : ${err}`) })
  },
  async getLoginStatus ({ commit }, params) {
    console.log('getLoginStatus: params: ', params)
    await this.$axios.$get(LOCAL_API.LOGIN, { params }).then(res => {
      if (res.code === 200) {
        commit('IS_MODIFY_LOGIN_STATUS', true)
        commit('MODIFY_USER_INFO', res.user)
        console.log('getLoginStatus: ', res.user)
        Vue.prototype.$cookies.set('LOGIN_STATUS', true)
        Vue.prototype.$cookies.set('USER_INFO', res.user)
        Vue.prototype.$message({
          type: 'success',
          message: res.msg
        })
      } else if (res.code !== 500) {
        commit('LOG_OUT')
        Vue.prototype.$message({
          type: 'error',
          message: res.msg
        })
      }
    })
    .catch(err => {
      console.log(`Error · ${LOCAL_API.LOGIN} : ${err}`)
      commit('LOG_OUT')
    })
  },
  async registerUser ({ commit }, params) {
    console.log('registerUser - params: ', params)
    await this.$axios.$post(LOCAL_API.REGISTER, { params }).then(res => {
      if (res.code === 200) {
        commit('IS_MODIFY_LOGIN_STATUS', true)
        commit('MODIFY_USER_INFO', res.user)
        Vue.prototype.$cookies.set('LOGIN_STATUS', true)
        Vue.prototype.$cookies.set('USER_INFO', res.user)
        console.log('registerUser - res: ', res.user)
        Vue.prototype.$message({
          type: 'success',
          message: res.msg
        })
      } else if (res.code !== 500) {
        commit('LOG_OUT')
        Vue.prototype.$message({
          type: 'error',
          message: res.msg
        })
      }
    })
    .catch(err => {
      console.log(`Error · ${LOCAL_API.REGISTER} : ${err}`)
      commit('LOG_OUT')
    })
  },
  async nuxtServerInit ({ dispatch, commit }, { req, error }) {
    try {
      const cookieObj = cookieToJson(req.headers.cookie)
      if (cookieObj.LOGIN_STATUS && cookieObj.USER_INFO) {
        const userInfo = initCookie(cookieObj.USER_INFO)
        commit('IS_MODIFY_LOGIN_STATUS', cookieObj.LOGIN_STATUS)
        commit('MODIFY_USER_INFO', userInfo)
      }
    } catch (err) {
      console.log(`Error · Load : ${err}`)
      error(err)
    }
  }
}
