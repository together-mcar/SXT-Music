<template>
  <div class="detail-content">
    <div class="tab">
      <sxt-tab v-model="currentIndex" :nav-list="mapper.ARTIST_DETAIL_TAB"></sxt-tab>
    </div>
    <div class="content">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import SxtTab from '~/components/common/sxtTab'
import HotSongs from './hotSongs'
import AllAlbum from './allAlbum'
import AboutMv from './aboutMv'
import { mapper } from '~/utils/mapping.js'

export default {
  name: 'ArtistDetailContent',
  data () {
    return {
      mapper,
      currentIndex: 0
    }
  },
  components: {
    SxtTab,
    HotSongs,
    AllAlbum,
    AboutMv
  },
  computed: {
    currentComponent () {
      switch (this.currentIndex) {
        case 0:
          return HotSongs
        case 1:
          return AllAlbum
        case 2:
          return AboutMv
        default:
          return HotSongs
      }
    }
  },
  methods: {
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  .detail-content {
  }
</style>
