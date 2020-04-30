<template>
  <div class="edit-sheet">
    <div class="content">
      <div class="position">
       <span class="nav-bar" @click.stop="cancel">{{ musicSheetDetail.sheetName }}</span>&nbsp;>&nbsp;编辑歌单
      </div>
      <div class="edit-content">
        <div class="edit">
          <div class="title">
            <div class="name">
              歌单名:
            </div>
            <div class="input">
              <el-input v-model="query.sheetName"></el-input>
            </div>
          </div>
          <div class="tags">
            <div class="name">
              标签:
            </div>
            <div v-if="this.query.tagList" class="show-list">
              <div v-for="item in this.query.tagList" :key="item.id" class="tag-list">
                <span class="tag-item">
                  {{ item.name }}
                  <i class="iconfont icon-chacha" @click.stop="delTag(item)"></i>
                </span>
              </div>
            </div>
            <div class="tag disable-select" @click.stop="dialogVisible = true">
              选择标签
            </div>
          </div>
          <div class="tips">
            选择适合的标签，最多选3个
          </div>
          <div class="descs">
            <div class="name">
              介绍:
            </div>
            <div class="desc">
              <el-input type="textarea" rows="3" v-model="query.desc"></el-input>
            </div>
          </div>
          <div class="options">
            <div class="name"></div>
            <div class="btns">
              <el-button :disabled="isHaveName" @click.stop="save">保 存</el-button>
              <el-button @click.stop="cancel">取 消</el-button>
            </div>
          </div>
        </div>
        <div class="img">
          <img src="https://p2.music.126.net/tGHU62DTszbFQ37W9qPHcg==/2002210674180197.jpg?param=150y150" />
        </div>
      </div>
    </div>
    <select-music-tag :dialogVisible.sync="dialogVisible" :tagList="this.query.tagList" @change="getTagList"></select-music-tag>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SelectMusicTag from '~/components/myMusic/selectMusicTag'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
export default {
  name: 'Edit',
  layout: 'myMusic',
  mixins: [jumpUrlMixin],
  async asyncData({app, store, query}) {
    const userId = store.state.userInfo.userId
    const params = {
      love: 1,
      userId: userId
    }
    try {
      await Promise.all([
        // 首次进入我的音乐页面加载喜爱音乐
        store.dispatch('myMusic/getMusicLoveSheet', params),
        // 首次加载左侧歌单列表
        store.dispatch('myMusic/getMusicSheetListSimple', { userId }),
        store.dispatch('myMusic/getMusicSheetTagType')
      ])
    } catch (err) {
      app.context.$errorHandler(err)
    }
  },
  data () {
    return {
      query: {
        sheetId: 0,
        desc: '',
        sheetName: '',
        tagList: [],
      },
      dialogVisible: false,
      currentMusicSheetPosition: -1
    }
  },
  components: {
    SelectMusicTag
  },
  computed: {
    ...mapState('myMusic', ['musicSheetDetail', 'loveMusicSheetSimple', 'musicSheetListSimple']),
    isHaveName () {
      return !this.query.sheetName
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler () {
        this.init()
      }
    }
  },
  methods: {
    ...mapActions('myMusic', ['modifyMusicSheetDetailSimple', 'getMusicSheetDetailBySheetId']),
    async init () {
      this.currentMusicSheetPosition = Number(this.$route.query.index)
      if (this.currentMusicSheetPosition === -1) {
        this.query.sheetId = this.loveMusicSheetSimple.id
      } else {
        this.query.sheetId = this.musicSheetListSimple[this.currentMusicSheetPosition].id
      }
      await this.getMusicSheetDetailBySheetId({ sheetId: this.query.sheetId }).then(() => {
        if (this.musicSheetDetail) {
          this.query = Object.assign({}, this.musicSheetDetail)
        }
      })
    },
    delTag (tag) {
      this.query.tagList = this.query.tagList.filter(el => el.name !== tag.name)
    },
    getTagList (data) {
      this.query.tagList = data
    },
    async save () {
      await this.modifyMusicSheetDetailSimple(this.query)
      this.cancel()
    },
    cancel () {
      this.jumpToMyMusicPlayList(this.currentMusicSheetPosition)
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/variables.scss";
$nameWidth: 50px;
  .edit-sheet {
    padding: 30px 20px;
    .content {
      .position {
        padding: 5px;
        border-bottom: 1px solid #333;
        font-size: 12px;
        .nav-bar {
          cursor: pointer;
          &:hover {
            color: #ff0000;
          }
        }
      }
      .edit-content {
        display: flex;
        flex-wrap: nowrap;
        .edit {
          width: 420px;
          &>div {
            font-size: 14px;
            line-height: 40px;
            text-align: right;
            @include flexNowrap();
            .name {
              margin-right: 8px;
              width: $nameWidth;
            }
          }
          .title {
            margin: 30px 0 30px 5px;
            .input {
              width: 250px;
            }
          }
          .tags {
            margin: 0 0 0 5px;
            .show-list {
              display: flex;
              flex-wrap: nowrap;
              .tag-list {
                margin-right: 5px;
                .tag-item {
                  font-size: 12px;
                  position: relative;
                  display: inline-block;
                  min-width: 50px;
                  padding: 0 20px;
                  cursor: pointer;
                  white-space: nowrap;
                  line-height: 24px;
                  text-align: center;
                  border-radius: 16px;
                  border: 1px solid #999;
                  &:hover {
                    i {
                      display: inline;
                      color: #ff0000;
                    }
                  }
                  i {
                    display: none;
                    position: absolute;
                    right: 5px;
                    cursor: pointer;
                  }
                  .iconfont {
                    font-size: 10px;
                    color: #999;
                  }
                }
              }
            }
            .tag {
              text-align: left;
              cursor: pointer;
              color: rgb(34, 133, 211);
              &:hover {
                color: darkblue;
              }
            }
          }
          .tips {
            margin: 0 0 0 65px;
            line-height: 16px;
            font-size: 12px;
            color: #666;
          }
          .descs {
            margin: 30px 0 30px 5px;
            .desc {
              width: 250px;
            }
          }
          .options {
            margin: 0 0 0 5px;
          }
        }
        .img {
          cursor: pointer;
          margin: 30px 0 0 0;
        }
      }
    }
  }
</style>
