<template>
  <div class="play-list">
    <div class="play-head">
      <div class="img">
        <img :src="this.getHeadImg" width="200" height="200" />
      </div>
      <div class="desc">
        <div class="title">
          <div class="title-name">
            {{ getHeadTitle }}
          </div>
          <div v-if="this.sheetId !== 2" class="title-edit" @click.stop="jumpToEdit">
            <i class="iconfont icon-bianji"></i>
            编辑
          </div>
        </div>
        <div class="artist">
          <div class="name">
            作者: {{ getHeadArtist.name }}
          </div>
          <div class="create">
            {{ getCreateDate | initDjangoDate }}
            创建
          </div>
        </div>
        <div class="opts">
          <el-button type="primary" icon="el-icon-video-play" @click.stop="getMoreMusicPlay(getSongList)">播放</el-button>
          <el-button type="warning" icon="el-icon-star-off" v-if="getMusicSheetIsLove">喜爱</el-button>
        </div>
        <div class="tag" v-if="getMusicTagList.length !== 0">
          标签: &nbsp;
          <span>
            <span v-for="item in getMusicTagList" :key="item" class="tag-name" @click.stop="jumpToMusicSheetOfTag(item.name)">
              {{ item.name }}
            </span>
          </span>
        </div>
        <div class="desc-sheet" v-if="getMusicTagList.length !== 0">
          <el-tooltip effect="dark" :content="getMusicDesc" placement="top">
            <div slot="content">{{ getMusicDesc | lineFeed }}</div>
            <span v-if="getMusicDesc">desc: &nbsp;{{ getMusicDesc }}</span>
            <span v-else>desc: &nbsp;暂无介绍</span>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="music-list">
      <sxt-music-list
        :item-arr="getSongList"
        :list-length="getSongListLength"
        :is-love-sheet='!getMusicSheetIsLove'>
      </sxt-music-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SxtMusicList from '~/components/common/sxtMusicList'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
import playMusicMixin from '~/mixins/playMusicMixin'
export default {
  name: 'PlayList',
  layout: 'myMusic',
  mixins: [jumpUrlMixin, playMusicMixin],
  async asyncData({app, store, query}) {
    const userId = store.state.userInfo.userId
    const params = {
      love: 1,
      userId: userId
    }
    try {
      await Promise.all([
        // 首次进入我的音乐页面加载喜爱音乐
        store.dispatch('myMusic/getMusicLoveSheet', params),
        // 首次加载左侧歌单列表
        store.dispatch('myMusic/getMusicSheetListSimple', { userId })
      ])
    } catch (err) {
      app.context.$errorHandler(err)
    }
  },
  data () {
    return {
      currentMusicSheetPosition: -1,
      sheetId: 0,
      getMusicDetail: {}
    }
  },
  components: {
    SxtMusicList
  },
  watch: {
    $route: {
      immediate: true,
      handler () {
        this.init()
      }
    }
  },
  computed: {
    ...mapState('myMusic', ['musicSheetDetail', 'loveMusicSheetSimple', 'musicSheetListSimple', 'musicIdList']),
    ...mapState('music', ['musicDetailListObj']),
    getHeadImg () {
      const coverUrl = this.getMusicDetail.cover.split('?')[0]
      return coverUrl
    },
    getHeadTitle () {
      return this.getMusicDetail.sheetName
    },
    getHeadArtist () {
      return this.getMusicDetail.artist
    },
    getCreateDate () {
      return this.getMusicDetail.createTime
    },
    getMusicSheetIsLove () {
      return this.currentMusicSheetPosition !== -1
    },
    getMusicTagList () {
      if (this.musicSheetDetail && this.musicSheetDetail.tagList) {
        return this.musicSheetDetail.tagList
      } else {
        return ''
      }
    },
    getMusicDesc () {
      if (this.musicSheetDetail && this.musicSheetDetail.desc) {
        return this.musicSheetDetail.desc
      } else {
        return ''
      }
    },
    isHaveMusicList () {
      return this.musicIdList.length !== 0
    },
    getSongList () {
      if (this.isHaveMusicList && this.musicDetailListObj) {
        return this.musicDetailListObj.songs
      } else {
        return []
      }
    },
    getSongListLength () {
      if (this.getSongList) {
        return this.getSongList.length
      } else {
        return 0
      }
    }
  },
  methods: {
    ...mapActions('myMusic', ['getMusicListBySheetIdActions', 'getMusicSheetDetailBySheetId']),
    ...mapActions('music', ['getMusicDetailListObj']),
    init () {
      this.currentMusicSheetPosition = Number(this.$route.query.index)
      if (Number(this.currentMusicSheetPosition) === -1) {
        this.getMusicDetail = this.loveMusicSheetSimple
      } else {
        this.getMusicDetail = this.musicSheetListSimple[this.currentMusicSheetPosition]
      }
      this.sheetId = this.getMusicDetail.id
      this.loadMusicList()
      this.loadMusicSheetDetail()
    },
    async loadMusicList () {
      await this.getMusicListBySheetIdActions({ sheetId: this.sheetId }).then(() => {
        if (this.musicIdList.length !== 0) {
          const musicIdListStr = this.musicIdList.join(',')
          this.getMusicDetailListObj(musicIdListStr)
        }
      })
    },
    async loadMusicSheetDetail () {
      await this.getMusicSheetDetailBySheetId({ sheetId: this.sheetId })
      console.log('musicSheetDetail: ', this.musicSheetDetail)
    },
    jumpToEdit () {
      this.jumpToMyMusicEdit(this.currentMusicSheetPosition)
    }
  },
  created () {
    console.log('loveMusicSheetSimple: ', this.loveMusicSheetSimple)
    console.log('musicSheetListSimple: ', this.musicSheetListSimple)
    console.log('musicSheetDetail: ', this.musicSheetDetail)
  }
}
</script>

<style scoped lang="scss">
  @import "assets/styles/font.scss";
  .play-list {
    .play-head {
      display: flex;
      flex-wrap: nowrap;
      padding: 30px;
      .img {
        width: 208px;
        height: 208px;
        padding: 3px;
        border: 1px solid #999;
      }
      .desc {
        width: 100%;
        padding: 10px 20px;
        .title {
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          line-height: 40px;
          .title-name {
            text-shadow: 2px 2px 2px rgb(204, 51, 51);
            font-size: 24px;
            width: 270px;
            @include ellipsisSingleText(270px);
          }
          .title-edit {
            cursor: pointer;
            font-size: 14px;
            color: #666;
            .iconfont {
              font-size: 12px;
            }
          }
        }
        .artist {
          display: flex;
          flex-wrap: nowrap;
          line-height: 40px;
          font-size: 14px;
          color: #333;
          .name {
            @include ellipsisSingleText(215px);
          }
          .create {
            color: #666;
            margin-left: 16px;
          }
        }
        .opts {
          line-height: 60px;
        }
        .tag {
          margin: 10px 0 0 0;
          .tag-name {
            cursor: pointer;
            display: inline-block;
            margin: 0 5px;
            background: rgb(78, 62, 62);
            height: 35px;
            color: #fff;
            border: 1px #ddd solid;
            border-radius: 15px;
            padding: 0 15px;
            line-height: 35px;
          }
        }
        .desc-sheet {
          margin: 20px 0 0 0;
          width: 95%;
          cursor: pointer;
          @include ellipsisMoreText();
        }
      }
    }
    .music-list {
      padding: 0 15px 30px;
    }
  }
</style>
