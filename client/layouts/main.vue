<template>
  <div class="main-container">
    <nav-bar></nav-bar>
    <nuxt class="base-class" />
    <footer-bar></footer-bar>
    <sxt-go-top></sxt-go-top>
    <sxt-music-play></sxt-music-play>
  </div>
</template>
<script>
import NavBar from '~/components/common/navbar'
import FooterBar from '~/components/common/footerBar'
import SxtGoTop from '~/components/common/sxtGoTop'
import SxtMusicPlay from '~/components/common/sxtMusicPlay'
export default {
  name: 'Main',
  layout: 'major',
  components: {
    NavBar,
    FooterBar,
    SxtGoTop,
    SxtMusicPlay
  },
  computed: {
  },
  methods: {

  }
}
</script>
<style lang="scss">
$centerWidth: 65%;
  .main-container {
    background: #ccc;
    .base-class {
      height: 100%;
      width: $centerWidth;
      margin: 0 calc(17%);
    }
  }
  @media screen and (max-width: 960px) {
    .main-container {
      .base-class {
        width: 100%;
        margin: 0;
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

