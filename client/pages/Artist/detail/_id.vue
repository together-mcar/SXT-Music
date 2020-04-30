<template>
  <div class="artist-detail">
    <div class="detail-header">
      <detail-header></detail-header>
    </div>
    <div class="detail-content">
      <detail-content></detail-content>
    </div>
  </div>
</template>

<script>
import DetailContent from '~/components/artist/detail/detailContent'
import DetailHeader from '~/components/artist/detail/detailHeader'
export default {
  name: 'ArtistDetail',
  layout: 'main',
  async asyncData({app, store, query}) {
    const artistId = query.id
    const params = {
      id: artistId
    }
    const albumParams = {
      id: artistId,
      limit: 12,
      offset: 0
    }
    try {
      store.commit('artistList/LIST_INIT')
      await Promise.all([
        store.dispatch('artistList/getArtistDetailObj', params),
        store.dispatch('artistList/getArtistDetailMvObj', albumParams),
        store.dispatch('artistList/getArtistDetailAlbumObj', albumParams)
      ])
      return {
        artistId
      }
    } catch (err) {
      app.context.$errorHandler(err)
    }
  },
  data () {
    return {

    }
  },
  components: {
    DetailContent,
    DetailHeader
  },
  computed: {
  },
  methods: {

  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  .artist-detail {
    padding: 50px 30px 40px;
  }
</style>
