<template>
  <div class="album-list">
    <div class="list-desc">
      <div>
        <span class="desc">{{ getTitleName }}</span>
        <span class="desc-number" v-if="isSearchAlbum">共{{ musicListLength }}首歌</span>
        <span class="desc-number" v-else>当前共{{ musicListLength }}首歌</span>
      </div>
    </div>
    <div class="list" v-if="musicListLength !== 0">
      <div v-for="item in musicList" :key="item.id" class="mv-list" @click.stop="choiceJumpUrl(item.id)">
        <album-card v-if="item" :is-album="judgeAlbum" :item-obj="item" :song-type="songType" class="mv-item"></album-card>
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
import AlbumCard from '../artist/detail/albumCard'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SxtAlbumList',
  mixins: [jumpUrlMixin],
  props: {
    songType: {
      type: Number,
      default: 1
    },
    listLength: {
      type: Number,
      default: 0
    },
    itemArr: {
      type: Array,
      default: () => []
    },
    isMore: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      musicList: [],
      hasMore: false,
      musicListLength: 0,
      currentPage: 1,
      maxLimit: 12
    }
  },
  components: {
    AlbumCard
  },
  computed: {
    ...mapState('artistList', ['artistDetailMvObj', 'artistDetailAlbumObj']),
    ...mapState('search', ['searchStoreKey', 'searchAlbumObj']),
    getTitleName () {
      if (this.isAlbum || this.isSearchAlbum) {
        return '专辑列表'
      } else if (this.isMv) {
        return '推荐MV'
      } else {
        return '专辑列表'
      }
    },
    isMv () {
      return this.songType === 2
    },
    isAlbum () {
      return this.songType === 1
    },
    isSearchAlbum () {
      return this.songType === 10
    },
    judgeAlbum () {
      return this.isAlbum || this.isSearchAlbum
    }
  },
  methods: {
    ...mapActions('artistList', ['getArtistDetailMvObj', 'getArtistDetailAlbumObj']),
    ...mapActions('search', ['getSearchObj']),
    init () {
      this.musicList = this.itemArr
      this.hasMore = this.isMore
      this.musicListLength = this.listLength
      console.log('sxtAlbumList - init - musicList: ', this.musicList)
    },
    initParams () {
      const artistId = window.location.href.split('?')[1].split('=')[1]
      this.currentPage += 1
      const params = {
        id: Number(artistId),
        limit: this.maxLimit,
        offset: (this.currentPage - 1) * this.maxLimit
      }
      return params
    },
    searchParams () {
      this.currentPage += 1
      const params = {
        keywords: this.searchStoreKey,
        limit: this.maxLimit,
        type: this.songType,
        offset: (this.currentPage - 1) * this.maxLimit
      }
      return params
    },
    async reload () {
      this.loading = !this.loading
      if (this.isMv) {
        await this.getArtistDetailMvObj(this.initParams()).then(() => {
          this.musicList = [...this.musicList, ...this.artistDetailMvObj.mvs]
          this.hasMore = this.artistDetailMvObj.hasMore
          this.musicListLength = this.musicList.length
          this.loading = !this.loading
        })
      }
      if (this.isAlbum) {
        await this.getArtistDetailAlbumObj(this.initParams()).then(() => {
          this.musicList = [...this.musicList, ...this.artistDetailAlbumObj.hotAlbums]
          this.hasMore = this.artistDetailAlbumObj.more
          this.musicListLength = this.musicList.length
          this.loading = !this.loading
        })
      }
      if (this.isSearchAlbum) {
        await this.getSearchObj(this.searchParams()).then(() => {
          this.musicList = [...this.musicList, ...this.searchAlbumObj.result.albums]
          this.hasMore = this.musicListLength > this.musicList.length
          this.loading = !this.loading
        })
      }
    },
    choiceJumpUrl (id) {
      if (this.isAlbum) {
        this.jumpToMusicDetail(id, true)
      } else if (this.isMv) {
        this.jumpToNewDishDetail(id)
      }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped lang="scss">
  .album-list {
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
    .list {
      border-top: 3px #FF0000 solid;
      min-height: 500px;
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
