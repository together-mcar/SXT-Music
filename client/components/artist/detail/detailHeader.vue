<template>
  <div class="detail-header">
    <div class="artist-img">
      <img v-if="getArtistObj" :src="getArtistObj.picUrl" alt="img">
    </div>
    <div class="artist-desc">
      <div class="artist-name" v-if="getArtistObj">
        <span class="name">{{ getArtistObj.name }}</span>
        <span v-if="getArtistObj.alias" class="alias">{{ getAliasToString(getArtistObj.alias) }}</span>
      </div>
      <div class="desc" v-if="getArtistObj">
        {{ getArtistObj.briefDesc }}
      </div>
      <div class="more-desc" @click.stop="isShowDescDetail = !isShowDescDetail">
        更多介绍
        <i v-if="isShowDescDetail" class="iconfont icon-weimingmingwenjianjia_jiantou-copy-copy"></i>
        <i v-else class="iconfont icon-weimingmingwenjianjia_jiantou-copy"></i>
      </div>
      <div v-if="isShowDescDetail" class="desc-detail">
        {{ getArtistObj.briefDesc }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ArtistDetailHeader',
  data () {
    return {
      isShowDescDetail: false
    }
  },
  components: {

  },
  computed: {
    ...mapState('artistList', ['artistDetailObj']),
    getArtistObj () {
      return this.artistDetailObj.artist
    }
  },
  methods: {
    getAliasToString (arr) {
      return arr.join(';')
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/font.scss";
$border: 1px #999 solid;
  .detail-header {
    display: flex;
    flex-wrap: nowrap;
    border-top: $border;
    border-bottom: $border;
    padding: 20px 0;
    position: relative;
    .artist-img {
      width: 210px;
      height: 185px;
      border: $border;
      padding: 5px;
      border-radius: 50%;
      img {
        width: 200px;
        height: 175px;
        border-radius: 50%;
      }
    }
    .artist-desc {
      margin: 10px 0 10px 20px;
      .artist-name {
        font-size: 14px;
        color: #333;
        @include ellipsisSingleText(95%);
        .name {
          font-size: 28px;
          font-weight: 700;
          text-shadow: 5px 5px 3px rgb(204, 51, 51);
        }
        .alias {
          margin: 0 0 0 8px;
        }
      }
      .desc {
        line-height: 24px;
        @include ellipsisMoreTextNum(5);
      }
      .more-desc {
        font-size: 14px;
        cursor: pointer;
        line-height: 20px;
        position: absolute;
        right: 0;
        bottom: 5px;
        &:hover {
          color: dodgerblue;
        }
      }
      .desc-detail {
        width: 200px;
        max-height: 400px;
        overflow-y: auto;
        border: $border;
        border-radius: 5px;
        padding: 10px;
        background: #fff;
        position: absolute;
        right: -205px;
        top: 180px;
      }
    }
  }
</style>
