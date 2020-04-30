<template>
  <div class="music-sheet-page">
    <div class="list-desc">
      <div>
        <span class="desc">歌单列表</span>
        <span class="desc-number">共{{ musicListLength }}张歌单</span>
      </div>
    </div>
    <div class="music-content" v-if="musicListLength !== 0">
      <div v-for="item in musicList" :key="item.id" class="music-item" @click.stop="jumpToMusicSheetDetail(item.id)">
        <music-sheet :item-obj="item"></music-sheet>
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
import MusicSheet from '../songSheet/musicSheet'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
export default {
  name: 'MusicSheetPage',
  mixins: [jumpUrlMixin],
  data () {
    return {
      loading: false,
      musicList: [],
      hasMore: false,
      musicListLength: 0,
      currentPage: 1,
      maxLimit: 16
    }
  },
  components: {
    MusicSheet
  },
  computed: {
    ...mapState('search', ['searchMusicSheetObj', 'searchStoreKey', 'searchMusicSheetList']),
    getMusicSheetResult () {
      return this.searchMusicSheetObj.result
    },
    getMusicSheetListLength () {
      if (this.searchMusicSheetList) {
        return this.searchMusicSheetList.length
      } else {
        return 0
      }
    },
    getMusicSheetTotal () {
      if (this.getMusicSheetResult) {
        return this.getMusicSheetResult.playlistCount
      } else {
        return 0
      }
    },
    getMusicSheetIsMore () {
      return this.getMusicSheetListLength < this.getMusicSheetTotal
    }
  },
  methods: {
    ...mapActions('search', ['getSearchObj']),
    init () {
      this.musicList = this.searchMusicSheetList
      this.hasMore = this.getMusicSheetIsMore
      this.musicListLength = this.getMusicSheetTotal
    },
    searchParams () {
      this.currentPage += 1
      const params = {
        keywords: this.searchStoreKey,
        limit: this.maxLimit,
        type: 1000,
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
  .music-sheet-page {
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
      min-height: 500px;
      border-top: 3px #FF0000 solid;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin: 0 0 20px;
      .music-item {
        margin: 0 20px;
      }
    }
    .list {
      border-top: 3px #FF0000 solid;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .mv-list {
        margin: 20px 0;
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
