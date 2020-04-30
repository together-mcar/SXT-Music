<template>
  <div class="sxt-swiper">
    <div class="bg-panel">
      <div v-swiper:mySwiper="swiperOption" @slideChange="swiperCallBack">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
            v-for="(swiper, index) in swiperList"
            :key="index"
            :class="[index == indicator ? 'slide-active' : 'slide-unactive']">
            <div class="pc-swiper" :style="getSwiperImg(swiper.imageUrl, true)"></div>
            <div class="android-swiper" :style="getSwiperImg(swiper.imageUrl, false)"></div>
          </div>
        </div>
        <!-- <div class="swiper-pagination swiper-pagination-bullets"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
export default {
  name: 'SxtSwiper',
  props: {
    swiperList: {
      type: Array,
      defulat: () => []
    }
  },
  data () {
    return {
      indicator: 0,
      swiperOption: {
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        preventClicksPropagetion: false,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        }
      },
    }
  },
  components: {

  },
  methods: {
    selectIndex (index) {
      this.indicator = index
      this.mySwiper.slideTo(index, 300, false)
      this.mySwiper.autoplay.start()
    },
    swiperCallBack () {
      this.indicator = this.mySwiper.activeIndex
    },
    getSwiperImg (imgUrl, isPc = true) {
      return `
        height: ${isPc ? '550px' : '250px'};
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: center;
        background-size: cover;
        background-image: url(${imgUrl});
      `
    }
  },
  mounted () {
    this.selectIndex(this.indicator)
  }
}
</script>

<style scoped lang="scss">
  .slide-active {
    opacity: 1 !important;
    text-align: center;
  }
  .slide-unactive {
    opacity: 0 !important;
  }
  .android-swiper {
    display: none;
  }
  .pc-swiper {
    display: block;
  }
  .sxt-swiper {
    min-height: 550px;
    text-align: center;
    cursor: pointer;
    .bg-panel {
      cursor: pointer;
      position: absolute;
      z-index: -10;
      width: 100%;
      .img_bg {
        vertical-align: middle;
        width: 100%;
        overflow: hidden;
        margin: 0 calc(50% - 960px);
      }
    }
  }
</style>
<style lang="scss" scoped>
  @media screen and (max-width: 960px) {
    .sxt-swiper {
      min-height: 250px;
    }
    .pc-swiper {
      display: none;
    }
    .android-swiper {
      display: block;
    }
  }
</style>
