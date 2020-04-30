<template>
  <div class="all-album">
    <sxt-album-list
      :item-arr="artistDetailAlbumList"
      :list-length="getAlbumListLength"
      :song-type="songType"
      :is-more="getAlbumIsMore">
    </sxt-album-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SxtAlbumList from '~/components/common/sxtAlbumList'
export default {
  name: 'AllAlbum',
  data () {
    return {
      songType: 1
    }
  },
  components: {
    SxtAlbumList
  },
  computed: {
    ...mapState('artistList', ['artistDetailAlbumObj', 'artistDetailAlbumList']),
    getAlbumList () {
      return this.artistDetailAlbumObj.hotAlbums
    },
    getAlbumListLength () {
      if (this.artistDetailAlbumList) {
        return this.artistDetailAlbumList.length
      } else {
        return 0
      }
    },
    getAlbumIsMore () {
      return this.artistDetailAlbumObj.more
    }
  },
  methods: {

  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  .all-album {
  }
</style>
