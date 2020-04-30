<template>
  <div class="music-detail">
    <div class="left-title">
      <div class="left-content">
        <div class="head-img">
          <img :src="getMusicImg.picUrl">
        </div>
        <div class="music-desc">
          <div class="music-name">
            {{ getSong.name }}
          </div>
          <div class="music-artist">
            歌手:
            <span v-for="item in getArtist" :key="item.id" class="artist-name" @click.stop="jumpToArtistDetail(item.id)">
              {{ item.name }} &nbsp;
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="rigth-content">
      <div class="head-title">
        <div class="title">
          {{ getSong.name }}
        </div>
        <div class="update-time">
          歌手:
          <span v-for="item in getArtist" :key="item.id" class="artist-name" @click.stop="jumpToArtistDetail(item.id)">
            {{ item.name }} &nbsp;
          </span>
        </div>
        <div class="update-time">
          时长: {{ getSong.dt | date('mm:ss') }}
        </div>
        <div class="option">
          <el-button type="primary" icon="el-icon-video-play">播放</el-button>
          <el-button v-if="getSong.mv" type="danger" icon="el-icon-video-play">MV</el-button>
          <el-button type="success" icon="el-icon-plus">收藏</el-button>
          <el-button type="warning" icon="el-icon-star-off">喜爱</el-button>
        </div>
      </div>
      <div class="music-desc">
        <div class="music-lyric-box">
          <div class="music-lyric" v-html="initLyric(getMusicLyric)" :style="lyricHeigth">
          </div>
        </div>
        <div class="more-desc" @click.stop="triggerShowDesc" v-if="isHasLyric">
          {{ isShowDescDetail ? '收起' : '展开' }}
          <i v-if="isShowDescDetail" class="iconfont icon-weimingmingwenjianjia_jiantou-copy-copy"></i>
          <i v-else class="iconfont icon-weimingmingwenjianjia_jiantou-copy"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
import initElementMixin from '~/mixins/initElementMixin'
export default {
  name: 'MusicDetail',
  layout: 'main',
  mixins: [jumpUrlMixin, initElementMixin],
  async asyncData({app, store, query, error}) {
    try {
      const musicId = query.id
      const isAblum = query.isAblum
      console.log('isAblum : ', isAblum)
      if (isAblum) {
        await store.dispatch('music/getAblumDetailObj', musicId)
      } else {
        await store.dispatch('music/getMusicDetailObj', musicId)
        await store.dispatch('music/getMusicDetailLyric', musicId)
      }
      return {
        isAblum
      }
    } catch (err) {
      app.context.$errorHandler(err)
    }
  },
  data () {
    return {
      isShowDescDetail: false,
      lyricHeigth: 'height: 480px;'
    }
  },
  components: {

  },
  computed: {
    ...mapState('music', ['musicDetailObj', 'musicDetailLyric']),
    getSong () {
      return this.musicDetailObj.songs[0]
    },
    getArtist () {
      return this.getSong.ar
    },
    getMusicImg () {
      return this.getSong.al
    },
    isHasLyric () {
      return this.musicDetailLyric.lrc
    },
    getMusicLyric () {
      if (this.isHasLyric) {
        return this.musicDetailLyric.lrc.lyric
      } else {
        return '暂无歌词'
      }
    }
  },
  methods: {
    ...mapActions('music', ['getMusicDetailLyric']),
    triggerShowDesc () {
      this.isShowDescDetail = !this.isShowDescDetail
      this.lyricHeigth = this.isShowDescDetail ? 'min-height: 480px;' : 'height: 480px;'
    },
    async init () {
      if (this.isAblum) {
        await this.getMusicDetailLyric(this.getSong.id).then(() => {
          console.log('rankList/detail - created - musicDetailLyric: ', this.musicDetailLyric)
        })
      }
    }
  },
  created () {
    this.init()
    console.log('rankList/detail - created - musicDetailObj: ', this.musicDetailObj)
  }
}
</script>

<style scoped lang="scss">
$border: 1px #999 solid;
  .music-detail {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    overflow: hidden;
    .left-title {
      height: 700px;
      width: 30%;
      padding: 20px 0;
      .left-content {
        width: 20%;
        position: fixed;
        .head-img {
          img {
            width: 100%;
            height: 100%;
          }
        }
        .music-desc {
          padding: 0 20px;
          text-align: center;
          .music-name {
            font-size: 20px;
            margin: 10px 0;
          }
          .music-artist {
            .artist-name {
              cursor: pointer;
              color: rgb(13, 40, 114);
              &:hover {
                color: #f00;
              }
            }
          }
        }
      }
    }
    .rigth-content {
      width: 70%;
      .head-title {
        margin: 15px 0 0 40px;
        .title {
          font-size: 24px;
          font-weight: 700;
          text-shadow: 5px 5px 3px rgb(204, 51, 51);
        }
        .update-time {
          line-height: 35px;
          color: #666;
          font-size: 14px;
          .artist-name {
            cursor: pointer;
            color: rgb(13, 40, 114);
            &:hover {
              color: #f00;
            }
          }
        }
        .option {
          margin: 15px 0 0 0;
        }
      }
      .music-desc {
        position: relative;
        .music-lyric-box {
          margin: 0 0 100px 0;
          overflow: hidden;
          .music-lyric {
            margin: 30px 0 0 40px;
            color: #333;
          }
        }
        .more-desc {
          font-size: 14px;
          color: #3178F2;
          cursor: pointer;
          line-height: 20px;
          position: absolute;
          left: 40px;
          bottom: -25px;
          &:hover {
            color: dodgerblue;
          }
        }
      }
    }
  }
</style>
