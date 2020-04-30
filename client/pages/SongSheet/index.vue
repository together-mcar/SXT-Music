<template>
  <div class="song-sheet">
    <h2>
      <span class="music-table">Music</span>
      <pop-box :item-obj="musicSheetTypeObj" v-model="currentMusicType" @input="reload"></pop-box>
    </h2>
    <div class="music-content">
      <div v-for="item in getMusicSheetList" :key="item.id" class="music-item" @click.stop="jumpToMusicSheetDetail(item.id)">
        <music-sheet :item-obj="item"></music-sheet>
      </div>
    </div>
    <div class="music-footer">
      <el-pagination
        :page-size="maxPageSize"
        background
        :current-page.sync="currentPage"
        layout="prev, pager, next"
        :total="total"
        @prev-click="changePage"
        @next-click="changePage"
        @current-change="load">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MusicSheet from '~/components/songSheet/musicSheet'
import PopBox from '~/components/common/popBox'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
export default {
  name: 'SongSheet',
  layout: 'main',
  mixins: [jumpUrlMixin],
  async asyncData({app, store, query}) {
    const currentMusicType = query.cat || '全部'
    try {
      await Promise.all([
        store.dispatch('musicSheet/getMusicSheetObj', { limit: 40, cat: currentMusicType }),
        store.dispatch('musicSheet/getMusicSheetTypeObj'),
      ])
      return {
        currentMusicType
      }
    } catch (err) {
      app.context.$errorHandler(err)
    }
  },
  data () {
    return {
      maxPageSize: 40,
      total: 40,
      currentPage: 1
    }
  },
  components: {
    MusicSheet,
    PopBox
  },
  computed: {
    ...mapState('musicSheet', ['musicSheetObj', 'musicSheetTypeObj']),
    getMusicSheetList () {
      return this.musicSheetObj.playlists
    }
  },
  methods: {
    ...mapActions('musicSheet', ['getMusicSheetObj']),
    ...mapActions('myMusic', ['initMusicSheetTagType']),
    initQuery () {
      return {
        limit: this.maxPageSize,
        cat: this.currentMusicType,
        offset: (this.currentPage - 1) * this.maxPageSize
      }
    },
    init () {
      this.reinit()
      this.getMusicSheetType()
    },
    async getMusicSheetType () {
      // await this.musicSheetTypeObj.sub.forEach(el => {
      //   this.initMusicSheetTagType(el)
      // })
    },
    async load () {
      await this.getMusicSheetObj(this.initQuery())
    },
    reinit () {
      this.total = this.musicSheetObj.total
      this.currentPage = 1
    },
    async reload () {
      this.reinit()
      await this.getMusicSheetObj(this.initQuery()).then(() => {
        this.reinit()
      })
    },
    changePage (index) {
      this.currentPage = index
      this.load()
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped lang="scss">
  .song-sheet {
    padding: 0 0 30px 0;
    h2 {
      margin: 50px 0 0 0;
      .music-table {
        margin: 0 20px 0 0;
      }
    }
    .music-content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 20px 0;
    }
    .music-footer {
      margin: 10px 0 0;
      text-align: center;
    }
  }
</style>
<style lang="scss" scoped>
  @media screen and (max-width: 960px) {
    .song-sheet {
      padding: 0 0 10px 0;
      h2 {
        font-size: 16px;
        margin: 5px 0 0 5px;
        .music-table {
          margin: 0 10px 0 0;
        }
      }
      .music-content {
        margin: 10px 0;
      }
      .music-footer {
        margin: 10px 0 0;
        text-align: center;
      }
      .music-footer {
        /deep/.el-pagination {
          button, .number, .more {
            min-width: 24px !important;
          }
        }
      }
    }
  }
</style>
