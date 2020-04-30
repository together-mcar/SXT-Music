<template>
  <div class="album-page">
    <sxt-album-list
      :item-arr="searchAlbumList"
      :list-length="getAlbumTotal"
      :song-type="songType"
      :is-more="getAlbumIsMore">
    </sxt-album-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SxtAlbumList from '~/components/common/sxtAlbumList'
export default {
  name: 'AlbumPage',
  data () {
    return {
      songType: 10
    }
  },
  components: {
    SxtAlbumList
  },
  computed: {
    ...mapState('search', ['searchAlbumObj', 'searchAlbumList']),
    getAlbumResult () {
      return this.searchAlbumObj.result
    },
    getAlbumListLength () {
      if (this.searchAlbumList) {
        return this.searchAlbumList.length
      } else {
        return 0
      }
    },
    getAlbumTotal () {
      return this.getAlbumResult.albumCount
    },
    getAlbumIsMore () {
      return this.getAlbumListLength < this.getAlbumTotal
    }
  },
  methods: {

  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  .album-page {
  }
</style>
