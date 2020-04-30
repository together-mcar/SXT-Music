<template>
  <div class="mv">
    <h2>
      <i class="iconfont icon-yinleguangpan nav-icon"></i>
      <span class="text-link">推荐MV</span>
      <table-bar :current-tab.sync="currentTab" class="tab-bar" @change="load"></table-bar>
      <span class="more-message" @click.stop="jumpRouter('/NewDish')">
        更多
        <i class="iconfont icon-jiantouarrow484"></i>
      </span>
    </h2>
    <div class="mv-table">
      <div v-for="item in this.mvList()" :key="item.id" class="mv-item" @click.stop="jumpToNewDishDetail(item.id)">
        <img :src="item.cover" />
        <div class="music-desc">
          <span class="music-name">{{ item.name }}</span> <br>
          <span class="music-artists" @click.stop="jumpToArtistDetail(item.artistId)">{{ item.artistName }}</span>
        </div>
        <div class="play">
          <i class="iconfont icon-bofang"></i>
        </div>
      </div>
      <div class="row-left" @click.stop="leftSlide">
        <i class="iconfont icon-jiantou-copy"></i>
      </div>
      <div class="row-right" @click.stop="rightSlide">
        <i class="iconfont icon-jiantou-copy-copy"></i>
      </div>
    </div>
  </div>
</template>

<script>
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
import tableBarMixin from '~/mixins/tableBarMixin'
import TableBar from '~/components/common/tableBar'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'MvTable',
  mixins: [jumpUrlMixin, tableBarMixin],
  data () {
    return {
      mvListStep: 2,
      mvListIndex: 0,
      maxMvList: 8
    }
  },
  components: {
    TableBar
  },
  computed: {
    ...mapState('newDish', ['newDishObj']),
    getMvDataList () {
      return this.newDishObj.data
    },
    mvListLength () {
      return this.getMvDataList.length
    }
  },
  methods: {
    ...mapActions('newDish', ['getTopMv']),
    init () {
      this.mvListIndex = 0
    },
    load () {
      this.getTopMv(this.getMvQuery).then(() => {
        this.init()
      })
    },
    mvList () {
      if (this.getMvDataList) {
        return this.getMvDataList.slice(this.mvListIndex, this.mvListStep + this.mvListIndex)
      } else {
        return this.getMvDataList
      }
    },
    leftSlide () {
      const minIndex = this.mvListIndex - this.mvListStep
      if (minIndex < this.mvListLength) {
        if (minIndex >= 0) {
          this.mvListIndex -= this.mvListStep
        }
      }
    },
    rightSlide () {
      const minIndex = this.mvListIndex + this.mvListStep
      if (minIndex >= 0) {
        if (minIndex <= this.mvListLength - this.mvListStep) {
          this.mvListIndex += this.mvListStep
        }
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
  .mv {
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
  .mv-table {
    height: 350px;
    margin: 30px 0 20px 0;
    padding: 0 80px;
    border: 1px #999 solid;
    background: #ccc;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow: hidden;
    position: relative;

    .mv-item {
      margin: 50px 0;
      cursor: pointer;
      position: relative;
      img {
        width: 300px;
        height: 200px;
      }
      .music-desc {
        width: 300px;
        height: 45px;
        line-height: 22px;
        font-size: 16px;
        text-align: center;
        .music-name,
        .music-artists {
          @include ellipsisSingleText(100%);
          &:hover {
            color: #f33;
          }
        }
        .music-artists {
          color: #444;
        }
      }
      .play {
        opacity: 0;
        width: 300px;
        height: 200px;
        background: rgba(0, 0, 0, .7);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -62%);
        color: #ccc;
        i {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 56px;
        }
      }
      &:hover {
        .play {
          opacity: 1;
        }
      }
    }

    .row-left,
    .row-right {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      transform: translateY(-50px);
      font-size: 28px;
      color: #888;
      cursor: pointer;
      &:hover {
        color: #242424;
      }
    }
    .row-left {
      margin: 0 0 0 80px;
      left: 0;
    }
    .row-right {
      margin: 0 80px 0 0;
      right: 0;
    }
  }
</style>
<style lang="scss" scoped>
  @import "assets/styles/font.scss";
  @media screen and (max-width: 960px) {
    .mv {
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
    .mv-table {
      height: 150px;
      margin: 20px 0 15px 0;
      padding: 0 30px;

      .mv-item {
        margin: 25px 0;
        img {
          width: 120px;
          height: 80px;
        }
        .music-desc {
          width: 120px;
          height: 30px;
          line-height: 15px;
          font-size: 12px;
          .music-name,
          .music-artists {
            @include ellipsisSingleText(100%);
            color: #444;
          }
          .music-artists {
            color: #f33;
          }
        }
      }

      .row-left,
      .row-right {
        position: absolute;
        top: 50%;
        transform: translateY(-80%);
        .iconfont {
          font-size: 12px;
        }
      }
      .row-left {
        margin: 0 0 0 15px;
        left: 0;
      }
      .row-right {
        margin: 0 15px 0 0;
        right: 0;
      }
    }
  }
</style>
