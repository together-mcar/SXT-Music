<template>
  <div class="home-page">
    <sxt-swiper :swiper-list="homePageWheel" class="swiper"></sxt-swiper>
    <div class="recommend-content">
      <div class="content">
        <div class="recommend-new-music"
          v-for="item in mapper.HOME_PAGE_RECOMMEND"
          :key="item.value">
          <div class="table-content">
            <component :is="currentTabComponent(item.value)"></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { mapper } from '~/utils/mapping.js'

import SxtSwiper from '~/components/common/sxtSwiper'
import MusicTable from '~/components/homePage/musicTable'
import MvTable from '~/components/homePage/mvTable'
import SingerTable from '~/components/homePage/singerTable'
import TopTable from '~/components/homePage/topTable'
export default {
  name: 'Home',
  components: {
    SxtSwiper,
    MusicTable,
    MvTable,
    SingerTable,
    TopTable
  },
  data () {
    return {
      mapper
    }
  },
  async asyncData({app, store, params}) {
    try {
      const singerParams = {
        limit: 15,
        offset: 0
      }
      await Promise.all([
        store.dispatch('getHomePageWheel'),
        store.dispatch('homePage/getHomePageRecommendMusicList'),
        store.dispatch('homePage/getHomePageRecommendMvList'),
        store.dispatch('homePage/getHomePageRecommendSingerList', singerParams),
      ])
    } catch (err) {
      app.context.$errorHandler(err)
    }
  },
  computed: {
    ...mapState(['homePageWheel'])
  },
  methods: {
    currentTabComponent (index) {
      switch (index) {
        case 1:
          return MusicTable
        case 2:
          return MvTable
        case 3:
          return SingerTable
        case 4:
          return TopTable
        default:
          return MusicTable
      }
    }
  },
  created () {
    // console.log('this is swiper list: ', this.homePageWheel)
  }
}
</script>

<style lang="scss" scoped>
$centerWidth: 65%;
.home-page {
  .recommend-content {
    width: 100%;
    background: #ccc;
    .content {
      height: 100%;
      width: $centerWidth;
      margin: 0 calc(17%);
      .recommend-new-music {
        padding: 10px 0 0 0;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
  @media screen and (max-width: 960px) {
    .home-page {
      .recommend-content {
        width: 100%;
        background: #ccc;
        .content {
          height: 100%;
          width: 100%;
          margin: 0;
          .recommend-new-music {
            padding: 10px 0 0 0;
          }
        }
      }
    }
  }
</style>
