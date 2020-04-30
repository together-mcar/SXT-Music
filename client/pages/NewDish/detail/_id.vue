<template>
  <div class="dish-detail">
    <div class="mv-title">
      <div class="tag disable-select">
        MV
      </div>
      <div class="mv-name">
        {{ getDetailData.name }}
      </div>
      <div class="mv-artist">
        <span v-for="(el, index) in getDetailData.artists" :key="el.id">
          <span class="artist-name" @click.stop="jumpToArtistDetail(el.id)">{{ el.name }}</span>
          <span v-if="isShowSep(index, getDetailData.artists)">/&nbsp;</span>
        </span>
      </div>
    </div>
    <div class="live-play">
      <sxt-live-player :option="option"></sxt-live-player>
      <div class="live-option">
        <!-- <el-button type="success" icon="el-icon-plus" @click.stop="selectMusicSheet(getDetailData.id)">收藏</el-button>
        <el-button type="warning" icon="el-icon-star-off" @click.stop="addMusicToSheet(getDetailData.id)">喜爱</el-button> -->
      </div>
    </div>
    <div class="recommend">
      <i class="iconfont icon-yinleguangpan nav-icon disable-select"></i>
      <span class="title disable-select">相关推荐</span>
    </div>
    <mv-recommend :artist-id="getArtistId"></mv-recommend>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
import SxtLivePlayer from '~/components/common/sxtLivePlayer'
import MvRecommend from '~/components/newDish/mvRecommend'
export default {
  name: 'NewDishDetail',
  layout: 'main',
  mixins: [jumpUrlMixin],
  async asyncData({app, store, query}) {
    const mvId = query.id
    try {
      await Promise.all([
        store.dispatch('newDish/getMvDetailObj', mvId),
        store.dispatch('newDish/getMvUrlObj', mvId)
      ])
      return {
        mvId
      }
    } catch (err) {
      app.context.$errorHandler(err)
    }
  },
  data () {
    return {
      option: {}
    }
  },
  components: {
    SxtLivePlayer,
    MvRecommend
  },
  computed: {
    ...mapState('newDish', ['mvDetailObj', 'mvUrlObj']),
    getDetailData () {
      return this.mvDetailObj.data
    },
    getArtistId () {
      return this.getDetailData.artistId
    },
    getMvUrl () {
      return this.mvUrlObj.url
    }
  },
  methods: {
    isShowSep (index, artistArr) {
      return index + 1 < artistArr.length
    },
    init () {
      this.option.sources = [{
        src: this.getMvUrl,
        type: 'video/mp4'
      }]
    }
  },
  created () {
    this.init()
    console.log('mvDetailObj: ', this.mvDetailObj)
    console.log('mvUrlObj: ', this.mvUrlObj)
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/font.scss";
  .dish-detail {
    padding: 50px 0 30px;
    .mv-title {
      display: flex;
      flex-wrap: nowrap;
      align-items: flex-end;
      vertical-align: bottom;
      margin: 0 0 20px 0;
      .tag {
        font-size: 14px;
        height: 20px;
        padding: 0 3px;
        margin: 0 5px 0 0;
        color: #FF0000;
        border: 1px #FF0000 solid;
      }
      .mv-name {
        vertical-align: bottom;
        font-size: 22px;
        max-width: 350px;
        height: 25px;
        margin: 0 8px 0 0;
        @include ellipsisSingleText(350px);
      }
      .mv-artist {
        height: 17px;
        max-width: 450px;
        cursor: pointer;
        @include ellipsisSingleText(450px);
        .artist-name {
          color: #333;
          font-size: 14px;
          &:hover {
            border-bottom: 2px #FF0000 solid;
          }
        }
      }
    }
    .live-play {
      .live-option {
        margin: 10px 0;
      }
    }
    .recommend {
      .nav-icon {
        color: #FF0000;
        font-size: 20px;
      }
      .title {
        font-size: 20px;
      }
    }
  }
</style>
