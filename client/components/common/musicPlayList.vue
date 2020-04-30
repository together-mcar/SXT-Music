<template>
  <div class="play-list">
    <div v-for="(item, index) in playMusicList" :key="index" class="music-list">
      <div class="index">
        <div v-if="index !== playMusicListPosition">
          <span class="play-num">{{ getIndex(index) }}</span>
          <i class="iconfont icon-bofang play-icon" @click.stop="switchMusic(index)"></i>
        </div>
        <div v-else>
          <i class="iconfont icon-zhengzaibofang"></i>
        </div>
      </div>
      <div class="music-name">
        {{ item.name }}
        <i v-if="item.mv" class="iconfont icon-MV mv-class" @click.stop="jumpToNewDishDetail(item.mv)"></i>
        <i v-if="item.mvid" class="iconfont icon-MV mv-class" @click.stop="jumpToNewDishDetail(item.mvid)"></i>
      </div>
      <div class="music-artist">
        <span v-for="(el, index) in item.ar" :key="el.id">
          <span class="artist-name" @click.stop="jumpToArtistDetail(el.id)">{{ el.name }}</span>
          <span v-if="isShowSep(index, item.ar)">/&nbsp;</span>
        </span>
      </div>
      <div class="music-time">
        <span class="time-num" v-if="item.dt">{{ item.dt | date('mm:ss') }}</span>
        <span class="time-num" v-else>{{ item.duration | date('mm:ss') }}</span>
        <span class="option">
          <i class="iconfont icon-add" @click.stop="selectMusicSheet(item.id)"></i>
          <i class="iconfont icon-shoucang" @click.stop="addMusicToSheet(item.id)"></i>
        </span>
      </div>
    </div>
    <sxt-add-music-to-sheet v-if="dialogVisible" :dialogVisible.sync="dialogVisible" @change="handleAddMusicToSheetChange"></sxt-add-music-to-sheet>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
import playMusicMixin from '~/mixins/playMusicMixin'
import musicOptOfDB from '~/mixins/musicOptOfDB'
import SxtAddMusicToSheet from '~/components/common/sxtAddMusicToSheet.vue'
export default {
  name: 'MusicPlayList',
  mixins: [jumpUrlMixin, playMusicMixin, musicOptOfDB],
  data () {
    return {
    }
  },
  components: {
    SxtAddMusicToSheet
  },
  computed: {
    ...mapState('music', ['playMusicList', 'playMusicListPosition'])
  },
  methods: {
    getIndex (index) {
      let musicListLength = this.playMusicList.length + 1
      let musicListLengthToNum = musicListLength.toString().length
      let indexLengthToNum = (index + 1).toString().length
      if (indexLengthToNum === musicListLengthToNum) {
        return (index + 1).toString()
      } else {
        let returnNum = ''
        for (let i = 0; i < (musicListLengthToNum - indexLengthToNum); i++) {
          returnNum += '0'
        }
        return `${returnNum}${index + 1}`
      }
    },
    isShowSep (index, artistArr) {
      return index + 1 < artistArr.length
    },
    switchMusic (index) {
      this.getMoreMusicPlay(this.playMusicList, index)
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/font.scss";
  .play-list {
    width: 430px;
    height: 410px;
    padding: 20px 0 0;
    overflow-y: auto;
    .music-list {
      display: flex;
      flex-wrap: nowrap;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px #777 solid;
      &:hover {
        .music-time {
          .time-num {
            display: none;
          }
          .option {
            display: inline-block;
            .iconfont {
              font-weight: 400;
              font-size: 20px !important;
              &:hover {
                color: #FF0000;
              }
            }
          }
        }
      }
      .index {
        width: 50px;
        text-align: center;
        .icon-zhengzaibofang {
          color: #FF0000;
        }
        .play-icon {
          display: none;
        }
        &:hover {
          .play-num {
            display: none;
          }
          .play-icon {
            font-size: 20px;
            display: inline-block;
            color: #FF0000;
          }
        }
      }
      .music-name {
        width: 200px;
        text-align: left;
        @include ellipsisSingleText(200px);
        .mv-class {
          color: #FF0000;
        }
      }
      .music-artist {
        width: 85px;
        text-align: center;
        @include ellipsisSingleText(85px);
        .artist-name {
          &:hover {
            border-bottom: 2px #FF0000 solid;
          }
        }
      }
      .music-time {
        width: 95px;
        text-align: center;
        .time-num {
          display: inline-block;
        }
        .option {
          display: none;
        }
      }
    }
  }
</style>
