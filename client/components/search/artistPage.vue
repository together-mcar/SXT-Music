<template>
  <div class="artist-page">
    <div class="list-desc">
      <div>
        <span class="desc">艺人列表</span>
        <span class="desc-number">共{{ artistListLength }}位</span>
      </div>
    </div>
    <div class="music-content" v-if="artistListLength !== 0">
      <div v-for="item in artistList" :key="item.id" class="music-item" @click.stop="jumpToArtistDetail(item.id)">
        <head-portrait :item-obj="item"></head-portrait>
      </div>
    </div>
    <div v-if="hasMore" class="footer">
      <p v-if="!loading" class="loading" @click="reload">点击加载</p>
      <p v-else v-loading="loading" class="loading">加载中...</p>
    </div>
    <div v-else class="footer">
      <p class="ending">没有更多了</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HeadPortrait from '../artist/headPortrait'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
export default {
  name: 'ArtistPage',
  mixins: [jumpUrlMixin],
  data () {
    return {
      loading: false,
      artistList: [],
      hasMore: false,
      artistListLength: 0,
      currentPage: 1,
      maxLimit: 16
    }
  },
  components: {
    HeadPortrait
  },
  computed: {
    ...mapState('search', ['searchArtistObj', 'searchStoreKey', 'searchArtistList']),
    getArtistResult () {
      return this.searchArtistObj.result
    },
    getArtistListLength () {
      if (this.searchArtistList) {
        return this.searchArtistList.length
      } else {
        return 0
      }
    },
    getArtistTotal () {
      if (this.getArtistResult) {
        return this.getArtistResult.artistCount
      } else {
        return 0
      }
    },
    getArtistIsMore () {
      return this.getArtistListLength < this.getArtistTotal
    }
  },
  methods: {
    ...mapActions('search', ['getSearchObj']),
    init () {
      this.artistList = this.searchArtistList
      this.hasMore = this.getArtistIsMore
      this.artistListLength = this.getArtistTotal
    },
    searchParams () {
      this.currentPage += 1
      const params = {
        keywords: this.searchStoreKey,
        limit: this.maxLimit,
        type: 100,
        offset: (this.currentPage - 1) * this.maxLimit
      }
      return params
    },
    async reload () {
      this.loading = !this.loading
      await this.getSearchObj(this.searchParams()).then(() => {
        this.init()
        this.loading = !this.loading
      })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped lang="scss">
  .artist-page {
    .list-desc {
      padding: 25px 0 5px 0;
      .desc {
        font-size: 24px;
      }
      .desc-number {
        margin-left: 20px;
        font-size: 14px;
        color: #666;
      }
    }
    .music-content {
      border-top: 3px #FF0000 solid;
      min-height: 500px;
      display: flex;
      flex-wrap: wrap;
      margin: 0 0 20px;
      .music-item {
        margin: 20px 0;
      }
      .music-item + .music-item {
        margin-left: 20px;
      }
    }
    .footer {
      margin: 10px 0;
    }
  }
  .loading {
    text-align: center;
    height: 50px;
    cursor: pointer;
    line-height: 50px;
    border-radius: 5px;
    background: rgba(161, 170, 32, 0.822);
  }
  .ending {
    cursor: unset;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    background-color: rgba(209, 49, 49, 0.822);
  }
</style>
