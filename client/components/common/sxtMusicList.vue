<template>
  <div class="music-list">
    <div class="list-desc">
      <div>
        <span class="desc">歌曲列表</span>
        <span class="desc-number">共{{ listLength }}首歌</span>
      </div>
      <div class="desc-play-number" v-if="playCountObj">
        播放：
        <span>{{ playCountObj.playCount }}</span>
        次
      </div>
    </div>
    <div class="list">
      <div class="list-head">
        <div class="list-index"></div>
        <div class="list-title">标题</div>
        <div class="list-time">时长</div>
        <div class="list-artist">歌手</div>
      </div>
      <div class="list-content" v-for="(item, index) in itemArr" :key="item.id" @click.stop="jumpToMusicDetail(item.id)">
        <div class="list-content-index">
          <span>{{ index + 1 + pageCount }}</span>
        </div>
        <div class="list-content-title" v-if="item.name">
          <i class="iconfont icon-bofang" @click.stop="getMoreMusicPlay(itemArr, index)"></i>
          {{ item.name }}
          <i v-if="item.mv" class="iconfont icon-MV mv-class" @click.stop="jumpToNewDishDetail(item.mv)"></i>
          <i v-if="item.mvid" class="iconfont icon-MV mv-class" @click.stop="jumpToNewDishDetail(item.mvid)"></i>
        </div>
        <div class="list-content-time">
          <span class="time-num" v-if="item.dt">{{ item.dt | date('mm:ss') }}</span>
          <span class="time-num" v-else>{{ item.duration | date('mm:ss') }}</span>
          <span class="option">
            <i class="iconfont icon-add" @click.stop="selectMusicSheet(item.id)"></i>
            <i class="iconfont icon-shoucang" v-if="!isLoveSheet" @click.stop="addMusicToSheet(item.id)"></i>
            <i class="iconfont icon-xiazai"></i>
          </span>
        </div>
        <div class="list-content-artist" v-if="item.ar">
          <span v-for="(el, index) in item.ar" :key="el.id">
            <span class="artist-name" @click.stop="jumpToArtistDetail(el.id)">{{ el.name }}</span>
            <span v-if="isShowSep(index, item.ar)">/&nbsp;</span>
          </span>
        </div>
        <div class="list-content-artist" v-else-if="item.artists">
          <span v-for="(el, index) in item.artists" :key="el.id">
            <span class="artist-name" @click.stop="jumpToArtistDetail(el.id)">{{ el.name }}</span>
            <span v-if="isShowSep(index, item.artists)">/&nbsp;</span>
          </span>
        </div>
      </div>
    </div>
    <div v-if="itemArr.length === 0">
      <div class="no-music">
        暂无音乐,
        <span class="add" @click.stop="jumpToHomePage()">去添加</span>
      </div>
    </div>
    <sxt-add-music-to-sheet v-if="dialogVisible" :dialogVisible.sync="dialogVisible" @change="handleAddMusicToSheetChange"></sxt-add-music-to-sheet>
  </div>
</template>

<script>
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
import playMusicMixin from '~/mixins/playMusicMixin'
import musicOptOfDB from '~/mixins/musicOptOfDB'
import SxtAddMusicToSheet from '~/components/common/sxtAddMusicToSheet.vue'
export default {
  name: 'SxtMusicList',
  mixins: [jumpUrlMixin, playMusicMixin, musicOptOfDB],
  props: {
    itemArr: {
      type: Array,
      default: () => []
    },
    listLength: {
      type: Number,
      default: 0
    },
    playCountObj: {
      type: Object,
      default: () => {}
    },
    currentPage: {
      type: Number,
      default: 0
    },
    maxPageSize: {
      type: Number,
      default: 0
    },
    isLoveSheet: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  components: {
    SxtAddMusicToSheet
  },
  computed: {
    pageCount () {
      return (this.currentPage - 1) * this.maxPageSize
    }
  },
  methods: {
    isShowSep (index, artistArr) {
      return index + 1 < artistArr.length
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/font.scss";
$border: 1px #999 solid;
  .music-list {
    .list-desc {
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      align-items: flex-end;
      padding: 0 0 5px 0;
      .desc {
        font-size: 24px;
      }
      .desc-number {
        margin-left: 20px;
        font-size: 14px;
        color: #666;
      }
      .desc-play-number {
        font-size: 14px;
        color: #666;
        &> span {
          color: #FF0000;
        }
      }
    }

    .list {
      border: $border;
      border-top: 3px #FF0000 solid;
      display: table;
      font-size: 14px;
      overflow: hidden;
      width: 100%;
      .list-head {
        display: table-row;
        height: 35px;
        background: #aaa;
        &> [class*='list-'] {
          padding: 0 0 0 5px;
          vertical-align: middle;
          color: #222;
          border-bottom: 2px #777 solid;
          overflow: hidden;
        }
        .list-index {
          width: 5%;
          display: table-cell;
        }
        .list-title {
          width: 50%;
          border-left: $border;
          display: table-cell;
        }
        .list-time {
          width: 20%;
          border-left: $border;
          display: table-cell;
        }
        .list-artist {
          width: 25%;
          border-left: $border;
          display: table-cell;
        }
      }
      .list-content {
        display: table-row;
        height: 35px;
        &:hover {
          background: rgba(41, 41, 41, 0.3);
          .time-num {
            display: none;
          }
          .option {
            display: inline-block;
            .iconfont {
              font-weight: 400;
              font-size: 20px !important;
            }
          }
        }
        &:nth-child(4),
        &:nth-child(2),
        &:nth-child(3) {
          .list-content-title {
            text-shadow: 2px 2px 2px rgb(204, 51, 51);
          }
        }
        &> [class*='list-content-'] {
          padding: 10px 5px;
          vertical-align: middle;
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &-index {
          width: 5%;
          text-align: center;
          display: table-cell;
        }
        &-title {
          width: 50%;
          line-height: 28px;
          display: table-cell;
          .mv-class {
            color: #FF0000;
          }
          .icon-bofang {
            cursor: pointer;
            &:hover {
              color: #FF0000;
            }
          }
        }
        &-time {
          width: 20%;
          display: table-cell;
          .time-num {
            display: inline-block;
          }
          .option {
            display: none;
          }
        }
        &-artist {
          width: 25%;
          line-height: 28px;
          display: table-cell;
          .artist-name {
            &:hover {
              border-bottom: 2px #FF0000 solid;
            }
          }
        }
      }
    }
    .no-music {
      border: none;
      text-align: center;
      margin: 10px 0;
      .add {
        cursor: pointer;
        &:hover {
          color: #ff0000;
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
@import "assets/styles/font.scss";
$border: 1px #999 solid;
  @media screen and (max-width: 960px) {
    .music-list {
      .list-desc {
        .desc {
          font-size: 16px;
        }
        .desc-number {
          margin-left: 2px;
          font-size: 10px;
        }
        .desc-play-number {
          display: none;
        }
      }

      .list {
        font-size: 10px;
        .list-content {
          &-title {
            line-height: 16px;
          }
          &-artist {
            line-height: 16px;
          }
        }
      }
    }
  }
</style>
