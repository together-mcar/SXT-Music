<template>
  <div class="about-mv">
    <sxt-album-list
      :item-arr="artistDetailMvList"
      :list-length="getMvListLength"
      :song-type="songType"
      :is-more="getMvIsMore">
    </sxt-album-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SxtAlbumList from '~/components/common/sxtAlbumList'
export default {
  name: 'AboutMv',
  data () {
    return {
      songType: 2
    }
  },
  components: {
    SxtAlbumList
  },
  computed: {
    ...mapState('artistList', ['artistDetailMvObj', 'artistDetailMvList']),
    getMvList () {
      return this.artistDetailMvObj.mvs
    },
    getMvListLength () {
      if (this.artistDetailMvList) {
        return this.artistDetailMvList.length
      } else {
        return 0
      }
    },
    getMvIsMore () {
      return this.artistDetailMvObj.hasMore
    }
  },
  methods: {

  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  .about-mv {
  }
</style>
