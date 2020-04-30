<template>
  <div class="music-detail">
    <div class="music-content">
      <div class="content-head">
        <div class="content-img">
          <img v-if="getPlayList" :src="getPlayList.coverImgUrl" />
        </div>
        <div class="content-desc" v-if="getPlayList">
          <div class="title">
            {{ getPlayList.name }}
          </div>
          <div class="update-time">
            <div class="creator-img">
              <img :src="getCreator.avatarUrl" />
            </div>
            <div class="creator-name">
              {{ getCreator.nickname }}
            </div>
            <div class="creator-time">
              更新时间: {{ getPlayList.updateTime | date }}
            </div>
          </div>
          <div class="option">
            <el-button type="primary" icon="el-icon-video-play" @click.stop="getMoreMusicPlay(getTracks)">播放</el-button>
            <el-button type="success" icon="el-icon-plus" @click.stop="collectionMusicSheet(getPlayList)">收藏</el-button>
          </div>
          <div class="tag">
            标签: &nbsp;
            <span v-if="getPlayList.tags.length > 0">
              <span v-for="item in getPlayList.tags" :key="item" class="tag-name" @click.stop="jumpToMusicSheetOfTag(item)">
                {{ item }}
              </span>
            </span>
            <span v-else>
              暂无标签
            </span>
          </div>
          <div class="desc">
            <el-tooltip effect="dark" :content="getPlayList.description" placement="top">
              <div slot="content">{{ getPlayList.description | lineFeed }}</div>
              <span v-if="getPlayList.description">desc: &nbsp;{{ getPlayList.description }}</span>
              <span v-else>desc: &nbsp;暂无介绍</span>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="content-list" v-if="this.getTracks">
        <sxt-music-list :item-arr="getTracks" :list-length="getTracksLength" :play-count-obj="getPlayList"></sxt-music-list>
      </div>
    </div>
    <div class="music-recommend">
      <div class="recommend-title">精选推荐</div>
      <div class="recommend-list">
        <div v-for="item in recommendList" :key="item.cat">
          <div v-for="el in item.playlists" :key="el.id" class="recommend-item" @click.stop="reload(el.id)">
            <div class="img">
              <img v-if="el.coverImgUrl" :src="el.coverImgUrl" />
            </div>
            <div class="desc">
              <div class="name">
                {{ el.name }}
              </div>
              <div class="creator">
                {{ el.creator.nickname }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SxtMusicList from '~/components/common/sxtMusicList'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
import musicOptOfDB from '~/mixins/musicOptOfDB'
import playMusicMixin from '~/mixins/playMusicMixin'
export default {
  name: 'MusicDetail',
  layout: 'main',
  mixins: [jumpUrlMixin, playMusicMixin, musicOptOfDB],
  async asyncData({app, store, query}) {
    try {
      const detailId = query.id
      let recommendList = []
      store.dispatch('musicSheet/getMusicSheetDetailObj', detailId).then(() => {
        store.state.musicSheet.musicSheetDetailObj.playlist.tags.forEach(item => {
          store.dispatch('musicSheet/getMusicSheetObj', { cat: item, limit: 3, offset: Math.floor(Math.random() * 500) }).then(() => {
            recommendList.push(store.state.musicSheet.musicSheetObj)
          })
        })
      })
      return {
        recommendList
      }
    } catch (err) {
      app.context.$errorHandler(err)
    }
  },
  data () {
    return {
    }
  },
  components: {
    SxtMusicList
  },
  computed: {
    ...mapState('musicSheet', ['musicSheetDetailObj']),
    getPlayList () {
      return this.musicSheetDetailObj.playlist
    },
    getTracks () {
      if (this.getPlayList) {
        return this.getPlayList.tracks
      } else {
        return []
      }
    },
    getTracksLength () {
      return this.getTracks.length
    },
    getCreator () {
      return this.getPlayList.creator
    }
  },
  methods: {
    ...mapActions('musicSheet', ['getMusicSheetDetailObj']),
    async reload (detailId) {
      await this.getMusicSheetDetailObj(detailId).then(() => {
        this.recommendList = []
        this.$store.state.musicSheet.musicSheetDetailObj.playlist.tags.forEach(item => {
          this.$store.dispatch('musicSheet/getMusicSheetObj', { cat: item, limit: 3, offset: Math.floor(Math.random() * 500) }).then(() => {
            this.recommendList.push(this.$store.state.musicSheet.musicSheetObj)
          })
        })
      })
    }
  },
  created () {
    console.log('songSheet/detail - created - musicSheetDetailObj: ', this.musicSheetDetailObj)
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/font.scss";
$border: 1px #999 solid;
  .music-detail {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    overflow: hidden;
    border-right: $border;
    .music-content {
      height: 100%;
      width: 75%;
      padding: 50px 30px;
      border-left: $border;
      border-right: $border;
      .content-head {
        display: flex;
        flex-wrap: nowrap;
        .content-img {
          width: 162px;
          height: 162px;
          border: $border;
          padding: 5px;
          img {
            width: 150px;
            height: 150px;
          }
        }
        .content-desc {
          margin: 0 0 0 35px;
          .title {
            font-size: 24px;
            font-weight: 700;
            text-shadow: 5px 5px 3px rgb(204, 51, 51);
            @include ellipsisSingleText(95%);
          }
          .update-time {
            margin: 5px 0;
            color: #666;
            font-size: 14px;
            display: flex;
            flex-wrap: nowrap;
            line-height: 50px;
            .creator-img {
              width: 50px;
              height: 50px;
              img {
                border-radius: 5px;
                width: 50px;
                height: 50px;
              }
            }
            .creator-name {
              margin: 0 0 0 5px;
              cursor: pointer;
              max-width: 120px;
              color: rgb(14, 189, 219);
              @include ellipsisSingleText(120px);
            }
            .creator-time {
              margin: 0 0 0 5px;
            }
          }
          .option {
            margin: 15px 0 0 0;
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
          .desc {
            margin: 10px 0 0 0;
            width: 95%;
            cursor: pointer;
            @include ellipsisMoreText();
          }
        }
      }
      .content-list {
        margin: 20px 0 0 0;
      }
    }
    .music-recommend {
      height: 100%;
      width: 25%;
      padding: 50px 10px;
      .recommend-title {
        font-weight: 600;
        text-align: center;
        margin: 0 0 20px 0;
        text-shadow: 5px 5px 3px rgb(204, 51, 51);
      }
      .recommend-list {
        .recommend-item {
          display: flex;
          flex-wrap: nowrap;
          cursor: pointer;
          margin: 10px 0;
          img {
            width: 75px;
            height: 75px;
            border-radius: 10px;
          }
          .desc {
            margin: 0 0 0 5px;
            line-height: 25px;
            width: 100%;
            font-size: 14px;
            .name {
              color: #333;
              height: 50px;
              @include ellipsisMoreText();
            }
            .creator {
              color: rgb(14, 189, 219);
              height: 25px;
              @include ellipsisSingleText(133px);
            }
          }
        }
      }
    }
  }
</style>
