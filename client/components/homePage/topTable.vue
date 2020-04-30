<template>
  <div class="top">
    <h2>
      <i class="iconfont icon-yinleguangpan nav-icon"></i>
      <span class="text-link">榜单</span>
      <span class="more-message" @click.stop="jumpRouter('/RankList')">
        更多
        <i class="iconfont icon-jiantouarrow484"></i>
      </span>
    </h2>
    <div class="top-table">
      <div v-for="item in musicTopList" :key="item.id" class="top-item">
        <div class="item-head">
          <img :src="item.coverImgUrl" />
          <div class="head-title">
            <div class="name">{{ item.name }}</div>
            <div class="update">update: {{ item.updateTime | date }}</div>
          </div>
        </div>
        <div class="item-body">
          <div class="music-list">
            <div v-for="(el, index) in getMusicList(item)" :key="el.id" :class="['music-item', getListItemClass(index)]">
              <div class="music-name" @click.stop="jumpToMusicDetail(el.id)">
                <span class="item-index">{{ index + 1 }}</span>
                <span>{{ el.name }}</span>
              </div>
              <div class="music-option">
                <i class="iconfont icon-bofang" @click.stop="getMoreMusicPlay(getMusicList(item), index)"></i>
                <i class="iconfont icon-add" @click.stop="selectMusicSheet(el.id)"></i>
                <i class="iconfont icon-shoucang" @click.stop="addMusicToSheet(el.id)"></i>
              </div>
            </div>
            <div class="music-item light-bgc check-all" @click="jumpRankList(item.name)">
              查看全部
              <i class="iconfont icon-jiantouarrow484"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <sxt-add-music-to-sheet v-if="dialogVisible" :dialogVisible.sync="dialogVisible" @change="handleAddMusicToSheetChange"></sxt-add-music-to-sheet>
  </div>
</template>

<script>
import { API } from '~/utils/api.js'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
import playMusicMixin from '~/mixins/playMusicMixin'
import musicOptOfDB from '~/mixins/musicOptOfDB'
import SxtAddMusicToSheet from '~/components/common/sxtAddMusicToSheet.vue'
import { mapper } from '~/utils/mapping'
export default {
  name: 'TopTable',
  mixins: [jumpUrlMixin, playMusicMixin, musicOptOfDB],
  data () {
    return {
      mapper,
      newMusicTopList: [], // 云音乐新歌榜
      hotMusicTopList: [], // 云音乐热歌榜
      riseMusicTopList: [], // 云音乐飙升榜
      reqIdList: [0, 1, 3],
      musicTopList: [],
      showMaxSize: 10
    }
  },
  components: {
    SxtAddMusicToSheet
  },
  methods: {
    async initTopList () {
      [this.newMusicTopList, this.hotMusicTopList, this.riseMusicTopList] = await Promise.all([
        ...this.reqIdList.map(el => {
          return this.$axios.$get(API.GET_TOP_MUSIC, { params: { idx: el } }).then(res => {
            if (res.code === 200) {
              return res.playlist
            }
          })
        })
      ])
      this.musicTopList = [this.newMusicTopList, this.hotMusicTopList, this.riseMusicTopList]
    },
    getMusicList (playList) {
      return playList.tracks.slice(0, this.showMaxSize)
    },
    getListItemClass (index) {
      return index % 2 ? '' : 'light-bgc'
    },
    jumpRankList (topName) {
      const jumpId = mapper.MUSIC_TOP_TABLE.find(el => {
        if (topName === el.text) {
          return el
        }
      }).value
      this.$router.push({ path: '/RankList', query: { id: Number(jumpId) } })
    }
  },
  created () {
    this.initTopList()
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/font.scss";
  .top {
    h2 {
      .nav-icon {
        color: darkred;
        font-size: 16px;
        vertical-align: middle;
        padding: 0 5px 0 0 ;
      }
      .more-message {
        cursor: pointer;
        float: right;
        font-size: 16px;
        line-height: 33px;
        color: #555;
      }
      .tab-bar {
        vertical-align: middle;
      }
    }
  }
  .top-table {
    min-height: 350px;
    margin: 30px 0 0 0;
    padding: 5px 20px 30px;
    border: 1px #ccc solid;
    background: #ccc;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    overflow: hidden;
    .top-item {
      width: 33.3%;
      border: 1px #ddd solid;

      .item-head {
        padding: 10px 20px;
        display: flex;
        flex-wrap: nowrap;
        img {
          width: 100px;
          height: 100px;
          box-shadow: 0 10px 5px #999;
        }
        .head-title {
          margin: 10px 0 0 10px;
          .name {
            text-shadow: 5px 5px 5px #FF0000;
          }
          .update {
            margin: 5px 0 0 0;
            font-size: 14px;
          }
        }
      }
      .item-body {
        .check-all {
          font-size: 14px;
          text-align: right;
        }
        .music-list {
          .music-item {
            height: 40px;
            width: 100%;
            line-height: 40px;
            padding: 0 10px 0 20px;
            overflow: hidden;
            position: relative;
            cursor: pointer;
            .item-index {
              display: inline-block;
              width: 20px;
              text-align: center;
            }

            &:nth-child(1),
            &:nth-child(2),
            &:nth-child(3) {
              text-shadow: 2px 2px 2px rgb(204, 51, 51);
              .item-index {
                color: #FF0000;
                text-shadow: none;
              }
            }

            .music-option {
              position: absolute;
              display: flex;
              justify-content: space-around;
              opacity: 0;
              width: 30%;
              right: 0;
              top: 0;
              z-index: 99;
              .iconfont {
                font-size: 20px !important;
                &:hover {
                  color: #d81e06;
                }
              }
            }
            &:hover {
              .music-option {
                opacity: 1;
              }
              .music-name {
                width: 70%;
                @include ellipsisSingleText(70%);
              }
            }
          }
          .light-bgc {
            background: #d1d1d1;
          }
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
@import "assets/styles/font.scss";
  @media screen and (max-width: 960px) {
    .top {
      margin: 0;
      h2 {
        font-size: 20px;
        .nav-icon {
          font-size: 14px;
        }
        .more-message {
          font-size: 14px;
          line-height: 28px;
        }
        .tab-bar {
          vertical-align: middle;
        }
      }
    }
    .top-table {
      min-height: 350px;
      margin: 15px 0 0 0;
      padding: 5px 5px 20px;
      flex-wrap: wrap;
      .top-item {
        width: 100%;

        .item-body {
          .music-list {
            .music-item {
              width: 100%;
              @include ellipsisSingleText(100%);
              .music-option {
                opacity: 1;
                width: 25%;
              }
            }
          }
        }
      }
    }
  }
</style>
