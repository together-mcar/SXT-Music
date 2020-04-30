<template>
  <div id="artist-content">
    <div class="artist-content"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabledLoad">
      <h2>
        <span class="artist-table">Artist</span>
        <table-bar class="tab-bar" :current-tab.sync="currentTab" @change="reload" :area-list="mapper.ARTIST_AREA_NAME"></table-bar>
      </h2>
      <div class="search" v-if="currentTab !== 0">
        <sxt-select v-model="currentArtistType" :list-obj="mapper.ARTIST_AREA_TYPE" @input="reload"></sxt-select>
      </div>
      <div class="infinite-list-wrapper">
        <div class="artist-list">
          <div v-for="item in artistList" :key="item.id" class="artist-item" @click.stop="jumpToArtistDetail(item.id)">
            <head-portrait :item-obj="item"></head-portrait>
          </div>
        </div>
        <p v-if="loading" v-loading="loading" class="loading">加载中...</p>
        <p v-if="noMore" class="ending">没有更多了</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapper } from '~/utils/mapping.js'
import TableBar from '~/components/common/tableBar'
import HeadPortrait from '~/components/artist/headPortrait'
import SxtSelect from '~/components/common/sxtSelect'
import { mapState, mapActions } from 'vuex'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'

export default {
  name: 'Artist',
  layout: 'main',
  mixins: [jumpUrlMixin],
  async asyncData({app, store}) {
    try {
      await store.dispatch('artistList/getArtistPageObj', { cat: 5001, limit: 20 })
    } catch (err) {
      app.context.$errorHandler(err)
    }
  },
  data () {
    return {
      mapper,
      currentTab: 0,
      currentArtistType: '男',
      loading: false,
      artistList: [],
      isMore: true,
      limit: 20,
      currentPage: 1
    }
  },
  components: {
    TableBar,
    SxtSelect,
    HeadPortrait
  },
  computed: {
    ...mapState('artistList', ['artistPageObj']),
    disabledLoad () {
      return this.loading || this.noMore
    },
    noMore () {
      return !this.isMore
    },
    getCode () {
      return mapper.ARTIST_AREA_NAME.find(el => {
        if (this.currentTab === el.value) {
          return el
        }
      }).code
    },
    getCatId () {
      if (this.currentTab === 0) {
        return this.getCode
      } else {
        return this.getCode * 10 + mapper.ARTIST_AREA_TYPE.find(el => {
          if (this.currentArtistType === el.text) {
            return el
          }
        }).value
      }
    }
  },
  methods: {
    ...mapActions('artistList', ['getArtistPageObj']),
    initQuery () {
      const catId = this.getCatId
      return {
        cat: catId,
        limit: this.limit,
        offset: (Number(this.currentPage) - 1) * this.limit
      }
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.currentPage += 1
        this.getArtistPageObj(this.initQuery()).then(res => {
          this.init()
          this.loading = false
        })
      }, 2500)
    },
    init () {
      this.artistList = [...this.artistList, ...this.artistPageObj.artists]
      this.isMore = this.artistPageObj.more
    },
    reinit () {
      this.currentPage = 1
      this.artistList = this.artistPageObj.artists
      this.isMore = this.artistPageObj.more
    },
    async reload () {
      this.currentPage = 1
      await this.getArtistPageObj(this.initQuery()).then(res => {
        this.reinit()
      })
    }
  },
  created () {
    this.reinit()
  }
}
</script>

<style scoped lang="scss">
  #artist-content {
    height: 100%;
    overflow-y: auto;
  }
  .artist-content {
    height: 100%;
    padding: 0 0 30px 0;
    h2 {
      margin: 50px 0 0 0;
      .artist-table {
        margin: 0 20px 0 0;
      }
      .tab-bar {
        vertical-align: middle;
      }
    }
    .search {
      margin: 10px 0 0 30px;
    }
    .infinite-list-wrapper {
      height: 100%;
      width: 100%;
      .artist-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 20px 0 0 0;
        .artist-item {
          margin: 20px 0;
        }
      }
    }
    .loading {
      text-align: center;
      height: 50px;
      line-height: 50px;
      border-radius: 5px;
    }
    .ending {
      text-align: center;
      height: 50px;
      line-height: 50px;
      border-radius: 5px;
      background-color: rgba(209, 49, 49, 0.822);
    }
  }
</style>
<style lang="scss" scoped>
  @media screen and (max-width: 960px) {
    .artist-content {
      height: 100%;
      padding: 0 0 20px 0;
      h2 {
        margin: 10px 0 0 10px;
        font-size: 16px;
        .artist-table {
          margin: 0 5px 0 0;
        }
      }
      .search {
        margin: 15px 0 0 10px;
      }
      .infinite-list-wrapper {
        .artist-list {
          margin: 5px 10px 0;
          .artist-item {
            margin: 10px 0;
          }
        }
      }
      .loading {
        height: 30px;
        line-height: 30px;
      }
      .ending {
        height: 30px;
        line-height: 30px;
      }
    }
  }
</style>
