import Vue from 'vue'

Vue.config.errorHandler = function (err, vm) {
  console.log(`Catch something error：${err}`)
}
