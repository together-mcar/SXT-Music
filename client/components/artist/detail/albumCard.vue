<template>
  <div class="album-card">
    <el-card :body-style="{ padding: '0px', backgroundColor: '#ccc' }">
      <img v-if="isAlbumOrSearch" :src="itemObj.picUrl" class="image">
      <img v-else :src="itemObj.imgurl" class="image">
      <div class="card-footer">
        <span class="mv-name">{{ itemObj.name }}</span> <br>
        <span class="mv-artist" v-if="isAlbumOrSearch">
          <span v-for="(item, index) in itemObj.artists" :key="item.id">
            <span class="artist-name" @click.stop="jumpToArtistDetail(item.id)">{{ item.name }}</span>
            <span v-if="isShowSep(index, itemObj.artists)">&</span>
          </span>
        </span>
        <span class="mv-artist" v-else>
          <span >{{ itemObj.artistName }}</span>
        </span>
      </div>
      <div class="play" v-if="!isAlbum">
        <i class="iconfont icon-bofang"></i>
      </div>
      <div class="album-play" v-else>
        <i class="iconfont icon-bofang" @click.stop="getSingleMusicPlay(itemObj)"></i>
      </div>
    </el-card>
  </div>
</template>

<script>
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
import playMusicMixin from '~/mixins/playMusicMixin'
export default {
  name: 'AlbumCard',
  mixins: [jumpUrlMixin, playMusicMixin],
  props: {
    itemObj: {
      type: Object,
      default: () => {}
    },
    songType: {
      type: Number,
      default: 1
    },
    isAlbum: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {

    }
  },
  components: {

  },
  computed: {
    isAlbumOrSearch () {
      return this.songType === 1 || this.songType === 10
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
  .album-card {
    cursor: pointer;
    padding: 0px;
    width: 270px;
    height: 234px;
    transition: all 1s;
    &:hover {
      transform: translateY(-10px);
      .play {
        display: block;
      }
      .album-play {
        display: block;
      }
    }
    .el-card {
      border: none !important;
    }
    .image {
      width: 270px;
      height: 180px;
    }
    .play {
      display: none;
      width: 270px;
      height: 180px;
      border-radius: 5px;
      background: rgba(0, 0, 0, .7);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -65%);
      color: #ccc;
      i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 52px;
      }
    }
    .album-play {
      display: none;
      width: 270px;
      height: 180px;
      border-radius: 5px;
      background: rgba(0, 0, 0, .5);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -65%);
      color: #fff;
      i {
        position: absolute;
        bottom: 10%;
        right: 10%;
        font-size: 44px;
      }
    }
    .card-footer {
      height: 54px;
      width: 100%;
      padding: 5px;
      text-align: center;
      line-height: 20px;
      .mv-name {
        @include ellipsisSingleText(100%);
      }
      .mv-artist {
        color: #666;
        @include ellipsisSingleText(100%);
        .artist-name {
          &:hover {
            color: #f33;
          }
        }
      }
    }
  }
</style>
