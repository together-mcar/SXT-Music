<template>
  <div class="register">
    <div class="register-dialog">
      <div class="title">
        Create New Account
      </div>
      <div class="content">
        <div class="user-name">
          <el-input
            v-model="query.userName"
            @focus="userNameError = false"
            placeholder="UserName"
            :class="{ 'error': userNameError }"></el-input>
        </div>
        <div class="pass-word">
          <el-input
            v-model="query.passWord"
            placeholder="Password min length 6"
            @focus="passWordError = false"
            :show-password="true"
            :class="{ 'error': passWordError }"></el-input>
        </div>
        <div class="pass-word">
          <el-input
            v-model="againPassword"
            placeholder="Again password"
            @focus="againPasswordError = false"
            :show-password="true"
            :class="{ 'error': againPasswordError }"></el-input>
        </div>
      </div>
      <div class="footer">
        <el-button type="primary" class="btn" @click.stop="register">Register</el-button>
      </div>
      <div class="tips">
        <div class="go-login disable-select">
          Already have an account?
          <span class="login" @click.stop="jumpToLogin">
            Log in
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// fixme: 密码要做限制条件
import { mapState, mapActions } from 'vuex'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
import $ from 'jquery'
export default {
  name: 'Register',
  mixins: [jumpUrlMixin],
  data () {
    return {
      query: {
        userName: '',
        passWord: '',
        gender: 0
      },
      againPassword: '',
      userNameError: false,
      passWordError: false,
      againPasswordError: false
    }
  },
  computed: {
    ...mapState(['loginStatus', 'userInfo'])
  },
  methods: {
    ...mapActions(['registerUser']),
    ...mapActions('myMusic', ['addArtistToDbActions', 'createMusicSheet']),
    async register () {
      if (this.check()) {
        this.query.userName = $.trim(this.query.userName)
        console.log('registerUser: ', this.query)
        await this.registerUser(this.query).then(() => {
          if (this.loginStatus) {
            // 在注册完之后，要为该用户自动创建一个喜爱的音乐，并将该用户添加到作者列表之中
            if (this.userInfo) {
              console.log('======> ', this.userInfo)
              this.saveArtist()
            }
            this.$router.push({ path: '/MyMusic/playList?id=2&index=-1' })
          } else {
            this.query.passWord = ''
            this.againPassword = ''
          }
        })
      }
    },
    check () {
      if (this.query.userName === '') {
        this.$message({
          type: 'error',
          message: 'userName is null'
        })
        this.userNameError = true
        return false
      } else if (this.query.passWord === '' || this.againPassword === '') {
        this.$message({
          type: 'error',
          message: 'password is null'
        })
        this.passWordError = true
        this.againPasswordError = true
        return false
      } else if (this.query.passWord !== this.againPassword) {
        this.$message({
          type: 'error',
          message: 'againPassword is error'
        })
        this.againPasswordError = true
        return false
      } else if (/(^\s+)|(\s+$)|\s+/g.test($.trim(this.query.userName))) {
        this.$message({
          type: 'error',
          message: 'userName have Blank space'
        })
        this.userNameError = true
        return false
      } else if (this.query.passWord.length < 6) {
        this.$message({
          type: 'error',
          message: 'password min length is 6'
        })
        this.passWordError = true
        this.againPasswordError = true
        return false
      }
      return true
    },
    async saveArtist () {
      const params = {
        cover: 'https://p2.music.126.net/tGHU62DTszbFQ37W9qPHcg==/2002210674180197.jpg?param=40y40',
        desc: '',
        name: this.query.userName,
        artistId: this.userInfo.userId
      }
      await this.addArtistToDbActions(params).then(() => {
        this.createLoveMusicSheet()
      })
    },
    async createLoveMusicSheet () {
      const params = {
        cover: 'https://p2.music.126.net/3F-3GaqVfCWjc_pJWr4DCg==/18980869230860308.jpg?param=40y40',
        sheetName: '喜爱的音乐',
        love: 1,
        musicNum: 0,
        artist: {
          cover: 'https://p2.music.126.net/tGHU62DTszbFQ37W9qPHcg==/2002210674180197.jpg?param=40y40',
          name: this.query.userName,
          artistId: this.userInfo.userId
        },
        userId: this.userInfo.userId
      }
      await this.createMusicSheet(params)
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  .register {
    height: 641px;
    background: #ccc;
    .register-dialog {
      width: 400px;
      height: 350px;
      position: fixed;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 5px;
      box-shadow: 10px 10px 8px #999;
      background: #fff;
      .error {
        border: 1px solid #ff0000;
        border-radius: 5px;
      }
      .title {
        margin: 20px 0 0 0;
        height: 50px;
        line-height: 50px;
        font-size: 32px;
        text-align: center;
      }
      .content {
        padding: 20px 30px;
        .error {
          border: 1px solid #ff0000;
          border-radius: 5px;
        }
        .pass-word {
          margin: 20px 0 0 0;
        }
      }
      .footer {
        padding: 0 30px;
        .btn {
          width: 100%;
        }
      }
      .tips {
        padding: 0 30px;
        margin: 10px 0 0 0;
        display: flex;
        flex-flow: nowrap;
        justify-content: space-between;
        font-size: 12px;
        color: rgb(66, 159, 248);
        .login {
          cursor: pointer;
          color: #ff0000;
        }
      }
    }
  }
</style>
