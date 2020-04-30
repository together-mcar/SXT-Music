<template>
  <div class="sxt-card">
    <el-card :body-style="{ padding: '0px', backgroundColor: '#ccc' }">
      <img :src="getMvPic" class="image">
      <div class="card-footer">
        <span class="mv-name">{{ itemObj.name }}</span> <br>
        <span class="mv-artist">
          <span v-for="(item, index) in getArtistList" :key="item.id">
            <span class="artist-name" @click.stop="jumpToArtistDetail(item.id)">{{ item.name }}</span>
            <span v-if="isShowSep(index)">&</span>
          </span>
        </span>
      </div>
      <div class="play">
        <i class="iconfont icon-bofang"></i>
      </div>
    </el-card>
  </div>
</template>

<script>
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
export default {
  name: 'DishCard',
  mixins: [jumpUrlMixin],
  props: {
    itemObj: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {

    }
  },
  computed: {
    getArtistList () {
      let artistList = []
      if (this.itemObj.artists) {
        artistList = [...this.itemObj.artists]
      } else if (this.itemObj.artist) {
        artistList.push(this.itemObj.artist)
      }
      return artistList
    },
    getMvPic () {
      return this.itemObj.cover || this.itemObj.imgurl
    }
  },
  methods: {
    isShowSep (index) {
      return index + 1 < this.getArtistList.length
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/font.scss";
  .sxt-card {
    cursor: pointer;
    padding: 0px;
    width: 300px;
    height: 260px;
    transition: all 1s;
    &:hover {
      transform: translateY(-10px);
      .play {
        display: block;
      }
    }
    .el-card {
      border: none !important;
    }
    .image {
      width: 300px;
      height: 200px;
    }
    .play {
      display: none;
      width: 300px;
      height: 200px;
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
        font-size: 56px;
      }
    }
    .card-footer {
      height: 60px;
      width: 100%;
      padding: 5px;
      text-align: center;
      line-height: 22px;
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
<style lang="scss" scoped>
@import "assets/styles/font.scss";
  @media screen and (max-width: 960px) {
    .sxt-card {
      width: 150px;
      height: 130px;
      .image {
        width: 150px;
        height: 97px;
      }
      .play {
        display: none !important;
      }
      .card-footer {
        height: 33px;
        padding: 0;
        text-align: center;
        line-height: 15px;
        font-size: 12px;
      }
    }
  }
</style>
