<template>
  <div class="music-page">
    <sxt-music-list
      :item-arr="getSongsList"
      :list-length="getSongsTotal"
      :current-page="currentPage"
      :max-page-size="maxPageSize"
      class="music-list">
    </sxt-music-list>
    <div class="mv-footer">
      <el-pagination
        :page-size="maxPageSize"
        background
        :current-page.sync="currentPage"
        layout="prev, pager, next"
        :total="getSongsTotal"
        @prev-click="changePage"
        @next-click="changePage"
        @current-change="load">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import SxtMusicList from '../common/sxtMusicList'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'MusicPage',
  data () {
    return {
      maxPageSize: 30,
      currentPage: 1
    }
  },
  components: {
    SxtMusicList
  },
  computed: {
    ...mapState('search', ['searchMusicObj', 'searchStoreKey', 'searchMusicCurrentPage']),
    getSongsList () {
      return this.searchMusicObj.result.songs
    },
    getSongsListLength () {
      return this.getSongsList.length
    },
    getSongsTotal () {
      return this.searchMusicObj.result.songCount
    }
  },
  methods: {
    ...mapActions('search', ['getSearchObj']),
    ...mapMutations('search', ['MODIFY_CURRENT_PAGE']),
    async load () {
      this.MODIFY_CURRENT_PAGE(this.currentPage)
      const params = {
        keywords: this.searchStoreKey,
        limit: this.maxPageSize,
        type: 1,
        offset: (Number(this.currentPage) - 1) * this.maxPageSize
      }
      await this.getSearchObj(params)
    },
    changePage (index) {
      this.currentPage = index
      this.load()
    }
  },
  created () {
    this.currentPage = this.searchMusicCurrentPage || 1
  }
}
</script>

<style scoped lang="scss">
  .music-page {
    .music-list {
      margin: 25px 0 0;
    }
    .mv-footer {
      margin: 10px 0;
      text-align: center;
    }
  }
</style>
