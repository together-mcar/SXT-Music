<template>
  <div class="collection-music">
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SxtMusicList from '~/components/common/sxtMusicList'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
import playMusicMixin from '~/mixins/playMusicMixin'
export default {
  name: 'Collection',
  layout: 'myMusic',
  mixins: [jumpUrlMixin, playMusicMixin],
  async asyncData({app, store, query}) {
    try {
      const index = query.index
      const musicSheetListLength = store.state.myMusic.musicSheetListSimple.length
      const position = index - musicSheetListLength
      const collectionMusicObjSimple = store.state.myMusic.collectionSheetListSimple[position]
      await store.dispatch('musicSheet/getMusicSheetDetailObj', collectionMusicObjSimple.sheetId)
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
  watch: {
    $route: {
      immediate: true,
      handler () {
        this.init()
      }
    }
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
    init () {
      const index = this.$route.query.index
      const musicSheetListLength = this.$store.state.myMusic.musicSheetListSimple.length
      const position = index - musicSheetListLength
      const collectionMusicObjSimple = this.$store.state.myMusic.collectionSheetListSimple[position]
      this.getMusicSheetDetailObj(collectionMusicObjSimple.sheetId)
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/font.scss";
$border: 1px #999 solid;
  .collection-music {
    .music-content {
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
  }
</style>
