<template>
  <div class="sxt-music-play" v-if="isShowPlayMusic">
    <div class="play-box">
      <div class="play-img">
        <img :src="getCurrentPic" :alt="getCurrentMusicObj.name">
      </div>
      <div class="play-title">
        <div class="music-title">
          {{ getCurrentMusicObj.name }}
        </div>
        <div class="artist-title">
          <span v-for="(el, index) in getCurrentArt" :key="el.id">
            <span class="artist-name" @click.stop="jumpToArtistDetail(el.id)">{{ el.name }}</span>
            <span v-if="isShowSep(index)">/&nbsp;</span>
          </span>
        </div>
      </div>
      <div class="music-play-btns">
        <div class="play-btns">
          <div class="btn-pre" @click.stop="switchMusicPre">
            <i class="iconfont icon-zuobofang"></i>
          </div>
          <div class="btn-play">
            <i class="iconfont icon-zanting" v-if="isPlayStatus" @click.stop="musicPause"></i>
            <i class="iconfont icon-bofanganniu" v-else @click.stop="musicPlay"></i>
          </div>
          <div class="btn-next" @click.stop="switchMusicNext">
            <i class="iconfont icon-youbofang"></i>
          </div>
        </div>
      </div>
      <div class="music-play-opt">
        <div class="play-opts">
          <div class="btn-mv" v-if="isMv">
            <i class="iconfont icon-MV" @click.stop="jumpToNewDishDetail(isMv)"></i>
          </div>
          <div class="btn-volume">
            <div class="volume-bar disable-select" id="volumeBg" @click.stop="volumeBarClick">
              <div class="bottom disable-select"></div>
              <div class="btn-con"
                id="volumeBtn"
                @mousedown.stop="volumeMouseDown"
                @mousemove.stop="volumeMouseMove"
                @mouseup.stop="volumeMouseUp"
                @mouseout.stop="volumeMouseOut">
                <div class="btn disable-select"></div>
              </div>
              <div class="bar disable-select" id="volumeProBar"></div>
            </div>
            <i class="iconfont icon-zuopinliebiao-zhengzaibofang" v-if="!isCloseVolume" @click.stop="isCloseVolume = !isCloseVolume"></i>
            <i class="iconfont icon-jingyin1" v-else @click.stop="isCloseVolume = !isCloseVolume"></i>
          </div>
          <div class="btn-play-order">
            <i class="iconfont icon-shunxubofang1"
              v-if="judgePlayOrder(PLAY_TAB_ORDER_MODEL.ORDER)"
              @click.stop="switchPlayOrder(PLAY_TAB_ORDER_MODEL.SINGLE)"
              ></i>
            <i class="iconfont icon-danquxunhuan"
              v-if="judgePlayOrder(PLAY_TAB_ORDER_MODEL.SINGLE)"
              @click.stop="switchPlayOrder(PLAY_TAB_ORDER_MODEL.RANDOM)"
              ></i>
            <i class="iconfont icon-suiji"
              v-if="judgePlayOrder(PLAY_TAB_ORDER_MODEL.RANDOM)"
              @click.stop="switchPlayOrder(PLAY_TAB_ORDER_MODEL.ORDER)"
              ></i>
          </div>
          <div class="btn-tool">
            <div class="tool">
              <div class="btn-add">
                <i class="iconfont icon-add" @click.stop="selectMusicSheet(getCurrentMusicObj.id)"></i>
              </div>
              <div class="btn-collection">
                <i class="iconfont icon-shoucang" @click.stop="addMusicToSheet(getCurrentMusicObj.id)"></i>
              </div>
              <div class="btn-download">
                <i class="iconfont icon-xiazai"></i>
              </div>
            </div>
            <i class="iconfont icon-gongju"></i>
          </div>
          <div class="btn-lyric" @click.stop="loadLyric">
            <div class="lyric" v-if="isShowLyric">
              <div class="title">
                <span>歌词</span>
                <div class="close-lyric" v-if="isShowLyric" @click.stop="isShowLyric = false">
                  <i class="iconfont icon-chacha"></i>
                </div>
              </div>
              <div v-html="initLyric(getMusicLyric)" class="lyric-text">
              </div>
              <div class="blank"></div>
            </div>
            <i class="iconfont icon-ci"></i>
          </div>
          <div class="btn-sheet" @click.stop="showMusicSheet">
            <div class="sheet-list" v-if="isShowMusicSheet">
              <div class="title">
                <span>歌曲列表</span>
                <div class="close-sheet" v-if="isShowMusicSheet" @click.stop="isShowMusicSheet = false">
                  <i class="iconfont icon-chacha"></i>
                </div>
              </div>
              <div class="music-sheet">
                <music-play-list></music-play-list>
              </div>
              <div class="blank"></div>
            </div>
            <i class="iconfont icon-gedan"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="play-bar" id="playBar" @click.stop="palyBarClick">
      <div class="time-bar disable-select"
        id="timeBar"
        @mousedown.stop="timeMouseDown"
        @mousemove.stop="timeMouseMove"
        @mouseup.stop="timeMouseUp"
        @mouseout.stop="timeMouseOut">
        <span class="disable-select">{{ getCurrentPlayTime | date('mm:ss') }}</span>
        /
        <span class="disable-select">{{ getCurrentMusicDt | date('mm:ss') }}</span>
      </div>
      <div class="process-bar" id="processBar">
      </div>
    </div>
    <sxt-no-copy-right :dialog-visible.sync="dialogVisible" @change="closeMusicPlay"></sxt-no-copy-right>
    <sxt-add-music-to-sheet v-if="dialogVisible" :dialogVisible.sync="dialogVisible" @change="handleAddMusicToSheetChange"></sxt-add-music-to-sheet>
    <div class="audio-box">
      <audio :src="getCurrentPlayMusicUrl" type="audio/mpeg" controls ref="audio" @timeupdate="updateTime"></audio>
    </div>
  </div>
</template>

<script>
// fixme: 是否增加音质
import { mapState, mapActions, mapMutations } from 'vuex'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
import initElementMixin from '~/mixins/initElementMixin'
import processMixin from '~/mixins/processMixin'
import { mapper } from '~/utils/mapping'
import { PLAY_TAB_ORDER_MODEL } from '~/utils/mapperModel'
import MusicPlayList from './musicPlayList'
import SxtNoCopyRight from '~/components/common/sxtNoCopyRight'
import musicOptOfDB from '~/mixins/musicOptOfDB'
import SxtAddMusicToSheet from '~/components/common/sxtAddMusicToSheet.vue'
import _ from 'lodash'
export default {
  name: 'SxtMusicPlay',
  mixins: [jumpUrlMixin, initElementMixin, processMixin, musicOptOfDB],
  data () {
    return {
      mapper,
      PLAY_TAB_ORDER_MODEL,
      playOrderStatus: PLAY_TAB_ORDER_MODEL.ORDER,
      isShowLyric: false,
      isShowMusicSheet: false,
      dialogVisible: false
    }
  },
  components: {
    MusicPlayList,
    SxtNoCopyRight,
    SxtAddMusicToSheet
  },
  computed: {
    ...mapState('music', ['playMusicList', 'playMusicListPosition', 'isShowPlayMusic', 'musicDetailLyric', 'currentMusicUrlList']),
    getPlayMusicListLength () {
      return this.playMusicList.length
    },
    getCurrentMusicObj () {
      return this.playMusicList[this.playMusicListPosition]
    },
    getCurrentMusicDt () {
      if (this.getCurrentMusicObj) {
        if (this.getCurrentMusicObj.dt) {
          return this.getCurrentMusicObj.dt
        } else if (this.getCurrentMusicObj.duration) {
          return this.getCurrentMusicObj.duration
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    getCurrentPic () {
      if (this.getCurrentMusicObj) {
        if (this.getCurrentMusicObj.al && this.getCurrentMusicObj.al.picUrl) {
          return this.getCurrentMusicObj.al.picUrl
        } else if (this.getCurrentMusicObj.album && this.getCurrentMusicObj.album.artist.img1v1Url) {
          return this.getCurrentMusicObj.album.artist.img1v1Url
        } else if (this.getCurrentMusicObj.blurPicUrl) {
          return this.getCurrentMusicObj.blurPicUrl
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    getCurrentArt () {
      if (this.getCurrentMusicObj) {
        if (this.getCurrentMusicObj.ar) {
          return this.getCurrentMusicObj.ar
        } else if (this.getCurrentMusicObj.artists) {
          return this.getCurrentMusicObj.artists
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    getCurrentMusicId () {
      return this.getCurrentMusicObj.id
    },
    getCurrentPlayMusicUrl () {
      let musicIndex = undefined
      this.currentMusicUrlList.forEach((el, index) => {
        if (this.getCurrentMusicId === el.id) {
          musicIndex = index
        }
      })
      if (this.currentMusicUrlList.length > 0 && this.getCurrentMusicId && musicIndex >= 0) {
        this.init(musicIndex)
        if (this.currentMusicUrlList[musicIndex]) {
          return this.currentMusicUrlList[musicIndex].url
        } else {
          this.init(undefined)
          return ''
        }
      } else {
        return ''
      }
    },
    isPositionGetMax () {
      return this.playMusicListPosition === this.getPlayMusicListLength - 1
    },
    isPositionGetMin () {
      return this.playMusicListPosition === 0
    },
    isMv () {
      return this.getCurrentMusicObj.mv
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
    ...mapMutations('music', ['MODIFY_PLAY_MUSIC_LIST_POSITION', 'COLSE_PLAY_MUSIC']),
    init (musicIndex) {
      if (this.currentMusicUrlList[musicIndex] && this.currentMusicUrlList[musicIndex].url) {
        if (this.isShowPlayMusic) {
          this.musicPlay()
        }
      } else {
        this.musicPause()
        this.dialogVisible = true
      }
    },
    async loadLyric () {
      this.isShowLyric = !this.isShowLyric
      this.isShowMusicSheet = false
      if (this.isShowLyric) {
        await this.getMusicDetailLyric(this.getCurrentMusicId)
      }
    },
    showMusicSheet () {
      this.isShowMusicSheet = !this.isShowMusicSheet
      this.isShowLyric = false
    },
    isShowSep (index) {
      return index + 1 < this.getCurrentArt.length
    },
    judgePlayOrder (playOrder) {
      return this.playOrderStatus === playOrder
    },
    switchPlayOrder (playOrder) {
      this.playOrderStatus = playOrder
    },
    switchMusicPre () {
      let currentPosition = this.playMusicListPosition
      const randomNum = Math.floor(Math.random() * (this.getPlayMusicListLength - 1))
      if (this.playOrderStatus === PLAY_TAB_ORDER_MODEL.RANDOM) {
        this.MODIFY_PLAY_MUSIC_LIST_POSITION(randomNum)
      } else {
        if (this.isPositionGetMin) {
          this.MODIFY_PLAY_MUSIC_LIST_POSITION(this.getPlayMusicListLength - 1)
        } else {
          this.MODIFY_PLAY_MUSIC_LIST_POSITION(--currentPosition)
        }
      }
      this.musicPlay()
    },
    switchMusicNext () {
      let currentPosition = this.playMusicListPosition
      const randomNum = Math.floor(Math.random() * (this.getPlayMusicListLength - 1))
      if (this.playOrderStatus === PLAY_TAB_ORDER_MODEL.RANDOM) {
        this.MODIFY_PLAY_MUSIC_LIST_POSITION(randomNum)
      } else {
        if (this.isPositionGetMax) {
          this.MODIFY_PLAY_MUSIC_LIST_POSITION(0)
        } else {
          this.MODIFY_PLAY_MUSIC_LIST_POSITION(++currentPosition)
        }
      }
      this.musicPlay()
    },
    closeMusicPlay () {
      this.dialogVisible = false
      if (this.currentMusicUrlList.length === 1) {
        this.COLSE_PLAY_MUSIC()
      } else {
        this.switchMusicNext()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/font.scss";
.iconfont {
  color: #333;
  &:hover {
    color: #FF0000;
  }
}
.icon-MV {
  color: #FF0000;
}
$centerWidth: 65%;
  .sxt-music-play {
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #ccc;
    z-index: 99;
    border-top: 2px #000 solid;
    .play-bar {
      cursor: pointer;
      height: 20px;
      width: 100%;
      position: absolute;
      // background: red;
      top: -10px;
      background: transparent;
      .time-bar {
        position: absolute;
        left: 0;
        height: 100%;
        width: 96px;
        border-radius: 10px;
        background: rgba(0, 0, 0, .75);
        > span {
          font-size: 12px;
          line-height: 20px;
        }
        color: #ccc;
        text-align: center;
      }
      .process-bar {
        position: absolute;
        left: 0;
        top: 8px;
        height: 2px;
        background: #FF0000;
        width: 0;
      }
    }
    .play-box {
      height: 72px;
      width: $centerWidth;
      margin: 0 calc(17%);
      padding: 0 20px;
      display: flex;
      flex-wrap: nowrap;
      .play-img {
        img {
          width: 72px;
          height: 72px;
        }
      }
      .play-title {
        margin: 10px 0 10px 25px;
        width: 260px;
        .music-title {
          @include ellipsisSingleText(200px);
          text-shadow: 2px 2px 2px rgb(204, 51, 51);
          line-height: 32px;
          font-size: 18px;
        }
        .artist-title {
          font-size: 14px;
          color: #333;
          .artist-name {
            cursor: pointer;
            &:hover {
              border-bottom: 2px #FF0000 solid;
            }
          }
        }
      }
      .music-play-btns {
        line-height: 72px;
        width: 300px;
        .play-btns {
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          .iconfont {
            font-size: 24px;
          }
          div {
            cursor: pointer;
          }
          div + div {
            margin-left: 12px;
          }
          .btn-pre {

          }
          .btn-play {
            width: 50px;
            height: 50px;
            margin: 11px 0 11px 12px;
            border: 1px #FF0000 solid;
            background: #FF0000;
            border-radius: 50%;
            text-align: center;
            position: relative;
            i {
              position: absolute;
              top: -25%;
              color: #ccc;
            }
            .icon-zanting {
              left: 25%;
            }
            .icon-bofanganniu {
              left: 30%;
            }
          }
          .btn-next {

          }
        }
      }
      .music-play-opt {
        width: 220px;
        line-height: 72px;
        text-align: center;
        .play-opts {
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          .iconfont {
            font-size: 20px;
          }
          div {
            cursor: pointer;
          }
          div + div {
            margin-left: 8px;
          }
          .btn-mv {
            width: 30px;
          }
          .btn-volume {
            width: 30px;
            position: relative;
            &:hover {
              .volume-bar {
                display: block;
              }
            }
            .volume-bar {
              display: none;
              position: absolute;
              top: -65px;
              left: 4px;
              height: 80px;
              width: 20px;
              z-index: 99;
              .bottom {
                width: 4px;
                position: absolute;
                left: 8px;
                top: 0;
                height: 100%;
                border-radius: 2px;
                background: #000;
              }
              .btn-con {
                width: 20px;
                height: 20px;
                padding: 5px;
                position: absolute;
                cursor: pointer;
                left: -8px;
                top: -10px;
                .btn {
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  background: red;
                }
              }
              .bar {
                width: 4px;
                border-radius: 2px;
                height: 80px;
                bottom: 0;
                position: absolute;
                background: #FF0000;
              }
            }
          }
          .btn-play-order {
            width: 30px;
          }
          .btn-tool {
            width: 30px;
            position: relative;
            &:hover {
              .tool {
                display: block;
              }
            }
            .tool {
              display: none;
              position: absolute;
              z-index: 99999;
              background: #fff;
              border-radius: 5px;
              top: -65px;
              div {
                height: 28px;
                width: 30px;
                line-height: 30px;
                margin: 0;
              }
            }
          }
          .btn-lyric {
            position: relative;
            .lyric {
              position: absolute;
              line-height: 32px;
              padding: 10px 10px 0;
              top: -580px;
              left: -400px;
              background: #fff;
              height: 600px;
              width: 425px;
              div {
                margin: 0;
              }
              .title {
                position: relative;
                text-align: left;
                line-height: 44px;
                height: 50px;
                padding: 0 0 0 20px;
                font-size: 22px;
                .close-lyric {
                  position: absolute;
                  top: 0;
                  right: 15px;
                  .iconfont {
                    color: #666;
                    &:hover {
                      color: #FF0000;
                    }
                  }
                }
              }
              .lyric-text {
                width: 100%;
                height: 500px;
                overflow-y: auto;
              }
              .blank {
                height: 50px;
                width: 100%;
              }
            }
          }
          .btn-sheet {
            position: relative;
            .sheet-list {
              position: absolute;
              padding: 10px 10px 0;
              top: -480px;
              left: -400px;
              background: #fff;
              height: 500px;
              width: 450px;
              div {
                margin: 0;
              }
              .title {
                position: relative;
                text-align: left;
                line-height: 44px;
                height: 50px;
                padding: 0 0 0 20px;
                font-size: 22px;
                .close-sheet {
                  position: absolute;
                  top: 0;
                  right: 15px;
                  .iconfont {
                    color: #666;
                    &:hover {
                      color: #FF0000;
                    }
                  }
                }
              }
              .blank {
                height: 40px;
                width: 100%;
              }
            }
          }
        }
      }
    }
    .audio-box {
      display: none;
    }
  }
</style>
<style>
.disable-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
<style lang="scss" scoped>
  @media screen and (max-width: 960px) {
    .sxt-music-play {

    }
  }
</style>
