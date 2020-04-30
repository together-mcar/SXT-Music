/**
 * @file 全局设置数据状态 / ES module
 * @module store/global
 */

export const state = () => ({
  navBarIndex: 0
})

export const mutations = {
  MODIFY_NAV_BAR_INDEX (state, index) {
    state.navBarIndex = index
  }
}
