import { mapper } from '~/utils/mapping.js'
export default ({ route, res, redirect, store }) => {
  // If nuxt generate, pass this middleware
  let navbarIndex = mapper.NAV_BAR_LIST.find(el => {
    if (route.path.search(el.url) !== -1) {
      if (el.url === '/') {
        if (route.path === '/') {
          return el
        }
      } else {
        return el
      }
    }
  })
  if (route.path.search('/MyMusic') !== -1) {
    // MyMusic页面特殊处理
    if (store.state.loginStatus) {
      navbarIndex = mapper.NAV_BAR_LIST.find(el => el.title === '我的音乐')
    } else {
      redirect('/Login')
    }
  }
  if (navbarIndex) {
    store.commit('global/MODIFY_NAV_BAR_INDEX', Number(navbarIndex.value))
  }
}
