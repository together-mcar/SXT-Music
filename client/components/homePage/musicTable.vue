<template>
  <div class="music">
    <h2>
      <i class="iconfont icon-yinleguangpan nav-icon"></i>
      <span class="text-link">推荐新音乐</span>
      <span class="more-message" @click.stop="jumpRouter('/SongSheet')">
        更多
        <i class="iconfont icon-jiantouarrow484"></i>
      </span>
    </h2>
    <div class="music-table">
      <div v-for="item in homePageMusicList" :key="item.id" class="music-item" @click.stop="jumpToMusicDetail(item.id)">
        <img :src="item.picUrl"/>
        <div class="music-desc">
          <span>{{ item.name }}</span> <br>
          <span class="music-artists" v-if="item.song">
            <span v-for="(el, index) in item.song.artists" :key="el.id">
              <span class="artist-name" @click.stop="jumpToArtistDetail(el.id)">{{ el.name }}</span>
              <span v-if="isShowSep(index, item.song.artists)">&</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
import { mapState } from 'vuex'
export default {
  name: 'MusicTable',
  mixins: [jumpUrlMixin],
  data () {
    return {
    }
  },
  components: {
  },
  computed: {
    ...mapState('homePage', ['homePageMusicList'])
  },
  methods: {
    getMusicArtists (artistsList) {
      let artistsNameList = []
      artistsNameList = artistsList.map(el => {
        return el.name
      })
      return artistsNameList.join(' ')
    },
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
  .music {
    margin: 20px 0 0 0;
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
  .music-table {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    margin: 0 0 20px 0;
    .music-item {
      margin: 30px 0 0 0;
      cursor: pointer;
      width: 200px;
      height: 200px;
      position: relative;
      text-align: center;
      box-shadow: 10px 10px 5px #888;
      transition: all 1s;
      &:hover {
        transform: translateY(-10px);
        .music-desc {
          opacity: 1;
        }
      }

      img {
        width: 200px;
        height: 200px;
      }
      .music-desc {
        opacity: 0;
        position: absolute;
        bottom: 0;
        width: 200px;
        height: 45px;
        line-height: 22px;
        background: rgba(0, 0, 0, .7);
        color: #fff;
        font-size: 14px;
        @include ellipsisMoreText();
        .music-artists {
          color: #aaa;
          .artist-name {
            &:hover {
              color: #f35;
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
  @import "assets/styles/font.scss";
  @media screen and (max-width: 960px) {
    .music {
      margin: 10px 0 0 0;
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
    .music-table {
      margin: 0 !important;
      width: 100%;
      .music-item {
        margin: 15px 0 0 0;
        width: 80px;
        height: 80px;
        position: relative;
        text-align: center;
        box-shadow: 5px 5px 3px #888;
        img {
          width: 80px;
          height: 80px;
        }
        .music-desc {
          opacity: 1;
          @include ellipsisSingleText(80px);
          position: absolute;
          z-index: 999;
          bottom: 0;
          left: 0;
          width: 80px;
          height: 22px;
          line-height: 22px;
          background: rgba(0, 0, 0, .7);
          color: #fff;
          font-size: 10px;
          .music-artists {
            display: none;
          }
        }
      }
    }
  }
</style>
