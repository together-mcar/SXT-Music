<template>
  <div class="music-left">
    <div class="my-music-sheet">
      <div class="title disable-select">
        <div class="show-music-sheet disable-select" @click.stop="showMyMusicSheet">
          <i v-if="!isShowMyMusicSheet" class="iconfont icon-weimingmingwenjianjia_jiantou disable-select"></i>
          <i v-else class="iconfont icon-weimingmingwenjianjia_jiantou-copy disable-select"></i>
          <span class="disable-select">我的歌单</span>
        </div>
        <el-button type="success" size="mini" icon="el-icon-plus" class="new-build" @click.stop="dialogVisible = true">新建</el-button>
      </div>
      <div class="content disable-select" v-if="isShowMyMusicSheet">
        <div :class="['item-music', { 'active-music': getActiveIndex(-1) }]" v-if="loveMusicSheetSimple" @click.stop="jumpToDetai()">
          <img :src="loveMusicSheetSimple.cover">
          <div class="item-title">
            <div class="sheet-title">{{ loveMusicSheetSimple.sheetName }}</div>
            <div class="sheet-option">
              <div class="num">{{ loveMusicSheetSimple.musicCount }}首</div>
            </div>
          </div>
        </div>
        <div v-for="(item, index) in musicSheetListSimple" :key="index" :class="['item-music', { 'active-music': getActiveIndex(index) }]" @click.stop="jumpToDetai(index)">
          <img :src="item.cover">
          <div class="item-title">
            <div class="sheet-title">{{ item.sheetName }}</div>
            <div class="sheet-option">
              <div class="num">{{ item.musicCount }}首</div>
              <div class="opt">
                <i class="iconfont icon-bianji" @click.stop="jumpToEdit(index)"></i>
                <i class="iconfont icon-shanchu1" @click.stop="delSheet(item)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-music-sheet disable-select">
      <div class="title">
        <div class="show-music-sheet" @click.stop="showloveMusicSheetSimple">
          <i v-if="!isShowloveMusicSheetSimple" class="iconfont icon-weimingmingwenjianjia_jiantou disable-select"></i>
          <i v-else class="iconfont icon-weimingmingwenjianjia_jiantou-copy disable-select"></i>
          <span class="disable-select">收藏的歌单</span>
        </div>
      </div>
      <div class="content disable-select" v-if="isShowloveMusicSheetSimple">
        <div v-for="(item, index) in collectionSheetListSimple"
          :key="index"
          :class="['item-music', { 'active-music': getActiveIndex(getMusicSheetListSimpleLength + index) }]"
          @click.stop="jumpToDetai(getMusicSheetListSimpleLength + index)">
          <img :src="item.cover">
          <div class="item-title">
            <div class="sheet-title">{{ item.sheetName }}</div>
            <div class="sheet-option">
              <div class="num">{{ item.musicNum }}首</div>
              <div class="opt">
                <i class="iconfont icon-shanchu1" @click.stop="delSheet(item)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <new-build-music-sheet :dialogVisible.sync="dialogVisible" @change="getNewMusicSheetName"></new-build-music-sheet>
  </div>
</template>

<script>
import NewBuildMusicSheet from './newBuildMusicSheet'
import { mapState, mapActions, mapMutations } from 'vuex'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
export default {
  name: 'MyMusicLeft',
  mixins: [jumpUrlMixin],
  data () {
    return {
      isShowMyMusicSheet: true,
      isShowloveMusicSheetSimple: true,
      dialogVisible: false
    }
  },
  components: {
    NewBuildMusicSheet
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapState('myMusic', ['loveMusicSheetSimple', 'musicSheetListSimple', 'collectionSheetListSimple']),
    getMusicSheetListSimpleLength () {
      return this.musicSheetListSimple.length
    }
  },
  methods: {
    ...mapActions('myMusic', ['createMusicSheet', 'getMusicSheetListSimple', 'delMusicSheet']),
    ...mapMutations('myMusic', ['MODIFY_MUSIC_SHEET_DETAIL_SIMPLE']),
    async reload () {
      await this.getMusicSheetListSimple({ userId: this.userInfo.userId })
    },
    getQuery (sheetName) {
      return {
        cover: 'https://p2.music.126.net/tGHU62DTszbFQ37W9qPHcg==/2002210674180197.jpg?param=40y40',
        sheetName: sheetName,
        musicNum: 0,
        artist: {
          cover: 'https://p2.music.126.net/tGHU62DTszbFQ37W9qPHcg==/2002210674180197.jpg?param=40y40',
          name: this.userInfo.userName,
          artistId: this.userInfo.userId
        },
        userId: this.userInfo.userId
      }
    },
    showMyMusicSheet () {
      this.isShowMyMusicSheet = !this.isShowMyMusicSheet
    },
    showloveMusicSheetSimple () {
      this.isShowloveMusicSheetSimple = !this.isShowloveMusicSheetSimple
    },
    async getNewMusicSheetName (data) {
      await this.createMusicSheet(this.getQuery(data)).then(() => {
        this.reload()
      })
    },
    async delSheet (sheet) {
      const params = {
        id: sheet.id,
        userId: sheet.userId,
        sheetId: sheet.sheetId,
        sheetName: sheet.sheetName
      }
      await this.delMusicSheet(params).then(() => {
        this.reload()
      })
    },
    getActiveIndex (position) {
      const index = this.$route.query.index
      if (Number(position) === Number(index)) {
        return true
      }
      return false
    },
    jumpToDetai (index = -1) {
      // 跳转的时候判断是不是通过
      if (index >= this.getMusicSheetListSimpleLength) {
        this.jumpToMyMusicCollection(index)
      } else {
        this.jumpToMyMusicPlayList(index)
      }
    },
    jumpToEdit (index) {
      this.jumpToMyMusicEdit(index)
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/font.scss";
  .music-left {
    padding: 30px 0;
    .my-music-sheet {
      .title {
        padding: 0 20px;
        line-height: 30px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        .show-music-sheet {
          cursor: pointer;
        }
        .new-build {
        }
      }
      .content {
        min-height: 50px;
        padding: 5px 0;
        width: 100%;
        .item-music {
          cursor: pointer;
          display: flex;
          padding: 5px 20px;
          flex-wrap: nowrap;
          font-size: 14px;
          &:hover {
            background: #aaa;
            .item-title {
              .sheet-option {
                .opt {
                  display: block;
                }
              }
            }
          }
          .item-title {
            margin-left: 8px;
            .sheet-title {
              line-height: 18px;
              @include ellipsisSingleText(80%);
            }
            .sheet-option {
              line-height: 22px;
              width: 193px;
              display: flex;
              flex-wrap: nowrap;
              justify-content: space-between;
              color: #333;
              .num {
                font-size: 13px;
              }
              .opt {
                .iconfont {
                  font-size: 15px;
                  margin-left: 3px;
                  &:hover {
                    color: #ff0000;
                  }
                }
                display: none;
              }
            }
          }
          img {
            width: 40px;
            height: 40px;
          }
        }
        .active-music {
          background: #888 !important;
        }
      }
    }
  }
</style>
