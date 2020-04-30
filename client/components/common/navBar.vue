<template>
  <div class="nav-bar">
    <div class="nav-position">
      <div class="nav-bar-left">
        <span :class="getNavBarItemClass(item.value)" v-for="item in mapper.NAV_BAR_LIST" :key="item.value" @click="activeItem(item.value, item.url)">
          <span>{{ item.title }}</span>
        </span>
      </div>
      <div class="nav-bar-right">
        <div class="out-search">
          <i class="iconfont icon-search search-icon" @click.stop="jumpToSearch(searchKey)"></i>
          <input type="text" class="input-search" placeholder="音乐/视频/歌手" @keyup.enter="jumpToSearch(searchKey)" v-model="searchKey">
        </div>
        <div class="login">
          <div v-if="loginStatus && userInfo.userName" class="portrait">
            <img src="https://globalcdn.feijing88.com/webpc/img/silk/user/icon_me_avator.png" alt="登录头像" width="50" height="50">
            <div class="menu-title">你好，{{ userInfo.userName }}{{ userInfo.gender | toText('USER_INFO_GENDER') }}</div>
            <div class="menu" v-if="loginStatus">
              <div class="menu-item" @click.stop="jumpToMyMusicPlayList()">我的主页</div>
              <div class="menu-item" @click.stop="logout">Log Out</div>
            </div>
          </div>
          <div v-else class="log-in" @click.stop="jumpToLogin">
            Log In
          </div>
        </div>
      </div>
    </div>
    <div class="nav-position-mobile">
      <div class="mobile-nav-name">
        SXT Music
      </div>
      <div class="login">
        <div v-if="loginStatus && userInfo.userName" class="portrait" @click.stop="showWorkTab = !showWorkTab">
          <img src="https://globalcdn.feijing88.com/webpc/img/silk/user/icon_me_avator.png" alt="登录头像" width="35" height="35">
          <div class="menu-title">你好，{{ userInfo.userName }}{{ userInfo.gender | toText('USER_INFO_GENDER') }}</div>
        </div>
        <div v-else class="log-in" @click.stop="showWorkTab = !showWorkTab">
          <div class="mobile-work-tab">
            <div class="menu-btn">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <div class="menu-tab" v-if="showWorkTab">
        <div v-for="item in mapper.NAV_BAR_LIST" :key="item.value" class="menu-tab-item">
          <a :href="item.url">{{ item.title }}</a>
        </div>
        <div v-if="loginStatus && userInfo.userName" class="menu-tab-item">
          <span @click.stop="logout">Log Out</span>
        </div>
        <div v-else class="menu-tab-item">
          <a href="/Login">Log In</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapper } from '~/utils/mapping.js'
import { mapState, mapMutations } from 'vuex'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
export default {
  name: 'NavBar',
  mixins: [jumpUrlMixin],
  data () {
    return {
      mapper,
      searchKey: '',
      showWorkTab: false
    }
  },
  computed: {
    ...mapState('global', ['navBarIndex']),
    ...mapState(['userInfo', 'loginStatus'])
  },
  methods: {
    ...mapMutations('global', ['MODIFY_NAV_BAR_INDEX']),
    ...mapMutations(['LOG_OUT']),
    activeItem (index, url) {
      this.MODIFY_NAV_BAR_INDEX(index)
      this.navBarIndex === index ? this.$router.push(url) : ''
    },
    getNavBarItemClass (index) {
      const activeClass = this.navBarIndex === index ? 'nav-bar-active' : ''
      return [
        'nav-bar-item',
        activeClass
      ]
    },
    logout () {
      this.LOG_OUT()
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  @import "assets/styles/font.scss";
  $centerWidth: 70%;
  $itemMinWidth: 65px;
  .nav-bar {
    width: 100%;
    background-color: rgb(36, 36, 36);
    height: 75px;
    color: #fff;
    z-index: 999999;
    text-align: center;
    .nav-position {
      width: $centerWidth;
      height: 75px;
      line-height: 75px;
      position: relative;
      display: inline-block;
    }
    &-item {
      display: inline-block;
      min-width: $itemMinWidth;
      margin: 0 10px 0 0;
      cursor: pointer;
      &:hover {
        background-color: rgb(25, 25, 25);
      }
    }
    &-active {
      background-color: rgb(0, 0, 0);
    }
    &-left {
      position: absolute;
      left: 0;
    }
    &-right {
      position: absolute;
      display: flex;
      flex-wrap: nowrap;
      right: 0;
      .out-search {
        display: inline-block;
        width: 170px;
        height: 32px;
        background-color: #fff;
        position: relative;
        top: 22px;
        border-radius: 32px;
        margin-right: 15px;
        .search-icon,
        .input-search {
          height: 17px;
          position: relative;
          bottom: 22px;
          color: #000;
        }
        .input-search {
          border: 0;
          outline: none;
          bottom: 23px;
        }
      }
      .login {
        display: inline-block;
        cursor: pointer;
        position: relative;
        min-width: $itemMinWidth;
        .log-in {
          &:hover {
            background-color: rgb(25, 25, 25);
          }
        }
        .portrait {
          img {
            margin: 5px 0 0;
          }
          &:hover {
            .menu {
              display: block;
            }
          }
          .menu-title {
            width: 100px;
            @include ellipsisSingleText(100px);
            text-align: center;
            font-size: 12px;
            position: absolute;
            right: 50%;
            transform: translateX(50%);
            top: 25px;
            color: #ccc;
          }
          .menu {
            display: none;
            width: 120px;
            min-height: 60px;
            background: rgb(32, 32, 32);
            border-radius: 10px;
            overflow: hidden;
            position: absolute;
            right: -28px;
            bottom: -45px;
            .menu-item {
              height: 30px;
              line-height: 30px;
              font-size: 14px;
              cursor: pointer;
              &:hover {
                background: rgba(0, 0, 0, .7);
              }
            }
          }
        }
      }
    }

    .nav-position-mobile {
      display: none;
    }
  }
</style>
<style lang="scss" scoped>
@import "assets/styles/font.scss";
@media screen and (max-width: 960px) {
  .nav-bar {
    height: 60px;
    text-align: left;
    padding: 0 0 0 20px;
    line-height: 60px;
    .nav-position {
      display: none;
    }
    .nav-position-mobile {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      position: relative;
      .mobile-nav-name {
        font-size: 24px;
      }
      .login {
        height: 60px;
        cursor: pointer;
        .portrait {
          width: 80px;
          padding-top: 5px;
          height: 60px;
          text-align: center;
          .menu-title {
            height: 20px;
            line-height: 20px;
            margin-top: -24px;
            font-size: 12px;
            display: block !important;
            @include ellipsisSingleText(80px);
          }
        }
        .log-in {
          margin-right: 20px;
          width: 23px;
          .mobile-work-tab {
            height: 60px;
            .menu-btn {
              padding-top: 20px;
              text-align: right;
              span {
                width: 23px;
                height: 3px;
                margin-bottom: 5px;
                margin-right: 0;
                background: #fff;
                display: block;
              }
            }
          }
        }
      }
      .menu-tab {
        display: block;
        position: absolute;
        right: 0;
        top: 60px;
        z-index: 9999999;
        background: #fff;
        border-radius: 5px;
        padding: 10px 5px;
        text-align: center;
        .menu-tab-item {
          a {
            text-decoration: none;
            color: #000;
          }
          font-size: 14px;
          line-height: 24px;
          height: 24px;
          border-bottom: 1px #999 solid;
          width: 75px;
          color: #000;
        }
      }
    }
  }
}
</style>
