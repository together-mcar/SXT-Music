<template>
  <div class="rank-list">
    <div class="rank-table">
      <div class="table-title">云音乐特色榜单</div>
      <div v-for="(item) in getTableList" :key="item.id" :class="['table-item', getTableClass(item.name)]" @click.stop="modifyCurrentId(item.name)">
        <img :src="item.coverImgUrl" />
        <div class="table-desc">
          <span>{{ item.name }}</span> <br>
          <span class="update-frequency">{{ item.updateFrequency }}</span>
        </div>
      </div>
    </div>
    <div class="rank-content">
      <div class="content-head">
        <div class="head-img">
          <img :src="getContentPlayList.coverImgUrl">
        </div>
        <div class="head-title">
          <div class="title">
            {{ getContentPlayList.name }}
          </div>
          <div class="update-time">
            更新时间: {{ getContentPlayList.updateTime | date }}
          </div>
          <div class="option">
            <el-button type="primary" icon="el-icon-video-play" @click.stop="getMoreMusicPlay(getPlayList)">播放</el-button>
            <el-button type="success" icon="el-icon-plus" @click.stop="collectionMusicSheet(getContentPlayList)">收藏</el-button>
            <!-- <el-button type="warning" icon="el-icon-star-off">喜爱</el-button> -->
          </div>
        </div>
      </div>
      <div class="content-list">
        <sxt-music-list :item-arr="getPlayList" :list-length="getListLength" :play-count-obj="getContentPlayList"></sxt-music-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mapper } from '~/utils/mapping'
import SxtMusicList from '~/components/common/sxtMusicList'
import musicOptOfDB from '~/mixins/musicOptOfDB'
import playMusicMixin from '~/mixins/playMusicMixin'
export default {
  name: 'RankList',
  mixins: [playMusicMixin, musicOptOfDB],
  layout: 'main',
  async asyncData({app, route, store, query, error}) {
    const currentId = Number(query.id) || 0
    try {
      await Promise.all([
        store.dispatch('rankList/getTopList', currentId),
        store.dispatch('rankList/getTopTableList'),
      ])
      return {
        currentId
      }
    } catch (err) {
      app.context.$errorHandler(err)
    }
  },
  data () {
    return {
      mapper,
      maxTableListLength: 4
    }
  },
  components: {
    SxtMusicList
  },
  computed: {
    ...mapState('rankList', ['rankPageList', 'rankTableList']),
    getTableList () {
      return this.rankTableList.slice(0, this.maxTableListLength)
    },
    getContentPlayList () {
      return this.rankPageList.playlist
    },
    getListLength () {
      return this.getContentPlayList.tracks.length
    },
    getPlayList () {
      return this.getContentPlayList.tracks
    }
  },
  methods: {
    ...mapActions('rankList', ['getTopList']),
    async loadRankContent () {
      try {
        await this.getTopList(this.currentId)
      }  catch (err) {
        console.error(err)
      }
    },
    getTabIdForName (tabName) {
      return mapper.MUSIC_TOP_TABLE.find(el => {
        if (tabName === el.text) {
          return el
        }
      }).value
    },
    getTableClass (tabName) {
      return this.currentId === this.getTabIdForName(tabName) ? 'table-item-bg' : ''
    },
    modifyCurrentId (tabName) {
      this.currentId = this.getTabIdForName(tabName)
      this.loadRankContent()
    },
    isShowSep (index, artistArr) {
      return index + 1 < artistArr.length
    }
  },
  created () {
    console.log('rankList - created - rankPageList: ', this.rankPageList)
    console.log('rankList - created - rankTableList: ', this.rankTableList)
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/font.scss";
$border: 1px #999 solid;
  .rank-list {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    overflow: hidden;
    border-left: $border;
    .rank-table {
      height: 100%;
      width: 25%;
      padding: 50px 0;
      .table-title {
        font-weight: 600;
        text-align: center;
        margin: 0 0 20px 0;
        text-shadow: 5px 5px 3px rgb(204, 51, 51);
      }
      .table-item-bg {
        background: rgba(41, 41, 41, 0.3) !important;
      }
      .table-item {
        display: flex;
        flex-wrap: nowrap;
        cursor: pointer;
        padding: 10px 25px;
        &:hover {
          background: rgba(41, 41, 41, 0.1);
        }
        img {
          width: 50px;
          height: 50px;
        }
        .table-desc {
          font-size: 14px;
          line-height: 25px;
          margin: 0 0 0 15px;
          .update-frequency {
            color: #666;
          }
        }
      }
    }
    .rank-content {
      height: 100%;
      width: 75%;
      padding: 50px 30px;
      border-left: $border;
      border-right: $border;
      .content-head {
        display: flex;
        flex-wrap: nowrap;
        .head-img {
          width: 162px;
          height: 162px;
          border: $border;
          padding: 5px;
          img {
            width: 150px;
            height: 150px;
          }
        }
        .head-title {
          margin: 15px 0 0 40px;
          .title {
            font-size: 24px;
            font-weight: 700;
            text-shadow: 5px 5px 3px rgb(204, 51, 51);
          }
          .update-time {
            line-height: 40px;
            color: #666;
            font-size: 14px;
          }
          .option {
            margin: 15px 0 0 0;

          }
        }
      }
      .content-list {
        margin: 50px 0 0 0;
      }
    }
  }
  .iconfont {
    margin: 0 4px;
    &:hover {
      color: #d81e06;
    }
  }
</style>
<style lang="scss" scoped>
@import "assets/styles/font.scss";
$border: 1px #999 solid;
  @media screen and (max-width: 960px) {
    .rank-list {
      .rank-table {
        width: 30%;
        padding: 25px 0;
        .table-title {
          margin: 0 0 10px 0;
          font-size: 14px;
          text-shadow: 2px 2px 1px rgb(204, 51, 51);
        }
        .table-item {
          padding: 10px;
          img {
            width: 32px;
            height: 32px;
          }
          .table-desc {
            font-size: 10px;
            line-height: 15px;
            margin: 0 0 0 5px;
          }
        }
      }
      .rank-content {
        width: 70%;
        padding: 25px 10px;
        .content-head {
          .head-img {
            width: 56px;
            height: 56px;
            padding: 2px;
            img {
              width: 50px;
              height: 50px;
            }
          }
          .head-title {
            margin: 5px 0 0 5px;
            .title {
              font-size: 16px;
              font-weight: 700;
              text-shadow: 3px 3px 2px rgb(204, 51, 51);
            }
            .update-time {
              line-height: 24px;
              margin-top: 5px;
              font-size: 12px;
            }
            .option {
              margin: 5px 0 0 0;
              .el-button {
                min-width: 40px;
                height: 24px;
                padding: 5px 10px;
                line-height: 14px;
                font-size: 10px;
              }
            }
          }
        }
        .content-list {
          margin: 20px 0 0 0;
        }
      }
    }
  }
</style>
