<template>
  <div class="search-content">
    <div class="nav-bar">
      <sxt-tab v-model="currentIndex" :nav-list="mapper.SEARCH_TAB"></sxt-tab>
    </div>
    <div class="content">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import SxtTab from '../common/sxtTab'
import { mapper } from '~/utils/mapping'

import MusicPage from './musicPage'
import AlbumPage from './albumPage'
import ArtistPage from './artistPage'
import MusicSheetPage from './musicSheetPage'
export default {
  name: 'SearchContent',
  data () {
    return {
      mapper,
      currentIndex: 1
    }
  },
  components: {
    SxtTab,
    MusicPage,
    AlbumPage,
    ArtistPage,
    MusicSheetPage
  },
  computed: {
    currentComponent () {
      switch (this.currentIndex) {
        case 1:
          return MusicPage
        case 10:
          return AlbumPage
        case 100:
          return ArtistPage
        case 1000:
          return MusicSheetPage
        default:
          return MusicPage
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
  .search-content {
    .nav-bar {

    }
    .content {
      border-top: 3px #FF0000 solid;
      padding: 0 20px 0;
    }
  }
</style>
