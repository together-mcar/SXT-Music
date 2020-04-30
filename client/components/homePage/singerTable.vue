<template>
  <div class="singer">
    <h2>
      <i class="iconfont icon-yinleguangpan nav-icon"></i>
      <span class="text-link">热门歌手</span>
      <table-bar :area-list="mapper.ARTIST_AREA_NAME" :current-tab.sync="currentTab" class="tab-bar" @change="load"></table-bar>
      <span class="more-message" @click.stop="jumpRouter('/Artist')">
        更多
        <i class="iconfont icon-jiantouarrow484"></i>
      </span>
    </h2>
    <div class="singer-table">
      <div v-for="item in this.getSingerList[this.singerListIndex]" :key="item.id" class="singer-item" @click.stop="jumpToArtistDetail(item.id)">
        <img :src="item.picUrl" />
        <div class="singer-desc">
          <span class="singer-name">{{ item.name }}</span>
        </div>
      </div>
      <div class="row-left" @click.stop="leftSlide">
        <i class="iconfont icon-jiantou1-right-copy"></i>
      </div>
      <div class="row-right" @click.stop="rightSlide">
        <i class="iconfont icon-jiantou1"></i>
      </div>
    </div>
  </div>
</template>

<script>
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
import TableBar from '~/components/common/tableBar'
import tableBarMixin from '~/mixins/tableBarMixin'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SingerTable',
  mixins: [jumpUrlMixin, tableBarMixin],
  data () {
    return {
      currentTab: 0,
      singerListIndex: 0,
      getSingerList: []
    }
  },
  components: {
    TableBar
  },
  computed: {
    ...mapState('artistList', ['artistPageObj'])
  },
  methods: {
    ...mapActions('artistList', ['getArtistPageObj']),
    load () {
      this.getSingerList = []
      this.singerListIndex = 0
      const reqList = [1, 2, 3].map(el => {
        this.getArtistPageObj(this.getSingerQuery(el)).then(() => {
          this.getSingerList.push(this.artistPageObj.artists)
        })
      })
    },
    leftSlide () {
      if (this.singerListIndex > 0) {
        this.singerListIndex--
      }
    },
    rightSlide () {
      if (this.singerListIndex < 2) {
        this.singerListIndex++
      }
    }
  },
  created () {
    this.load()
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/font.scss";
  .singer {
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
  .singer-table {
    height: 250px;
    margin: 30px 0 20px 0;
    padding: 0 20px;
    border: 1px #999 solid;
    background: #bbb;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow: hidden;
    position: relative;

    .singer-item {
      margin: 50px 0;
      cursor: pointer;
      position: relative;
      img {
        width: 150px;
        height: 120px;
        border-radius: 50%;
      }
      .singer-desc {
        width: 150px;
        height: 22px;
        line-height: 22px;
        font-size: 16px;
        text-align: center;
        .singer-name {
          @include ellipsisSingleText(100%);
        }
      }
    }

    .row-left,
    .row-right {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      transform: translateY(-25px);
      font-size: 16px;
      color: #888;
      cursor: pointer;
      &:hover {
        color: #242424;
      }
      .iconfont {
        font-size: 24px;
      }
    }
    .row-left {
      margin: 0 0 0 8px;
      left: -10px;
    }
    .row-right {
      margin: 0 8px 0 0;
      right: -10px;
    }
  }
</style>
<style lang="scss" scoped>
@import "assets/styles/font.scss";
  @media screen and (max-width: 960px) {
    .singer {
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
    .singer-table {
      height: 110px;
      margin: 20px 0 15px 0;
      padding: 0 15px;

      .singer-item {
        margin: 15px 0;
        img {
          width: 70px;
          height: 56px;
        }
        .singer-desc {
          width: 70px;
          height: 22px;
          line-height: 22px;
          font-size: 14px;
          .singer-name {
            @include ellipsisSingleText(100%);
          }
        }
      }

      .row-left {
        margin: 0 0 0 5px;
        left: -10px;
      }
      .row-right {
        margin: 0 5px 0 0;
        right: -10px;
      }
    }
  }
</style>
