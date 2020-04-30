<template lang="html">
  <a v-show="showTopButton" class="silk-go-top" :class="{ 'small-bottom': bottom === 'true' }" @click="goToTop">
    <img src="https://globalcdn.feijing88.com/webpc/img/silk/1.3/icon_top.png"/>
    <p>Top</p>
  </a>
</template>

<script>
import jump from 'jump.js'
export default {
  name: 'SxtGoTop',
  data () {
    return {
      showTopButton: false
    }
  },
  props: {
    topElement: {
      type: String,
      default: '.main-container'
    },
    bottom: {
      type: String,
      default: 'false'
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollFun, false)
  },
  computed: {
    getHeaderHeight () {
      return this.isMobile ? this.$store.state.noticeHeight + 60 : 0
    }
  },
  methods: {
    scrollFun (event) {
      const height = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
      if (height > 300) {
        this.showTopButton = true
      } else {
        this.showTopButton = false
      }
    },
    goToTop () {
      jump(this.topElement, {
        offset: -this.getHeaderHeight
      })
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollFun, false)
  }
}
</script>

<style lang="scss" scoped>
.silk-go-top {
  position: fixed;
  z-index: 998;
  right: 13%;
  bottom: 100px;
  height: 68px;
  width: 64px;
  background-color: #7a7a7a;
  text-align: center;
  cursor: pointer;
  border: 1px solid #7a7a7a;
  &:hover {
    background: #999999;;
  }

  > img {
    width: 24px;
    height: 24px;
    margin-top: 13px;
  }

  > p {
    margin-top: 3px;
    font-size: 12px;
    font-family: Helvetica;
    line-height: 14px;
    color: #fff;
  }
}
.small-bottom {
  bottom: 50px;
}

@media screen and (max-width: 960px) {
  .silk-go-top {
    height: 48px;
    width: 44px;
    right: 10px;
    bottom: 20px;
    > img {
      width: 20px;
      height: 20px;
      margin-top: 5px;
    }
  }
}
</style>
