<template>
  <div class="main-container">
    <nav-bar></nav-bar>
    <div class="my-music">
      <div class="left-side">
        <my-music-left></my-music-left>
      </div>
      <div class="right-side">
        <nuxt />
      </div>
    </div>
    <footer-bar></footer-bar>
    <sxt-music-play></sxt-music-play>
  </div>
</template>
<script>
import NavBar from '~/components/common/navbar'
import FooterBar from '~/components/common/footerBar'
import SxtMusicPlay from '~/components/common/sxtMusicPlay'
import MyMusicLeft from '~/components/myMusic/myMusicLeft'
export default {
  name: 'MyMusic',
  layout: 'major',
  components: {
    NavBar,
    FooterBar,
    SxtMusicPlay,
    MyMusicLeft
  },
  computed: {
  },
  methods: {

  }
}
</script>
<style lang="scss">
$centerWidth: 65%;
$border: 1px #999 solid;
  .main-container {
    background: #ccc;
    .my-music {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-around;
      width: $centerWidth;
      margin: 0 calc(17%);
      height: 641px;
      border-left: $border;
      border-right: $border;
      .left-side {
        width: 30%;
        height: 641px;
        overflow-y: auto;
        border-right: $border;
      }
      .right-side {
        width: 70%;
        height: 641px;
        overflow-y: auto;
      }
    }
  }

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

