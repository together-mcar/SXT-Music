<template>
  <div class="login">
    <div class="login-dialog">
      <div class="title">
        Welcome Back
      </div>
      <div class="content">
        <div class="user-name">
          <el-input v-model="query.userName" placeholder="UserName" @focus="isLoginError = false" :class="{ 'error': isLoginError }"></el-input>
        </div>
        <div class="pass-word">
          <el-input v-model="query.passWord" placeholder="Password" :show-password="true"></el-input>
        </div>
      </div>
      <div class="footer">
        <el-button type="primary" class="btn" @click="loginIn">Log In</el-button>
      </div>
      <div class="tips">
        <div class="forgot">
          Forgot password?
        </div>
        <div class="sign-up" @click.stop="jumpToRegister">
          Sign up
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
export default {
  name: 'Login',
  mixins: [jumpUrlMixin],
  data () {
    return {
      query: {
        userName: '',
        passWord: ''
      },
      isLoginError: false
    }
  },
  computed: {
    ...mapState(['loginStatus'])
  },
  methods: {
    ...mapActions(['getLoginStatus']),
    async loginIn () {
      if (this.check()) {
        console.log('getLoginStatus: ', this.query)
        await this.getLoginStatus(this.query)
        if (this.loginStatus) {
          this.$router.go(-1)
        } else {
          this.isLoginError = true
          this.query.passWord = ''
        }
      }
    },
    check () {
      if (this.query.userName === '') {
        this.$message({
          type: 'error',
          message: 'userName is null'
        })
        return false
      } else if (this.query.passWord === '') {
        this.$message({
          type: 'error',
          message: 'password is null'
        })
        return false
      }
      return true
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  .login {
    height: 641px;
    background: #ccc;
    .login-dialog {
      width: 400px;
      height: 300px;
      position: fixed;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 5px;
      box-shadow: 10px 10px 8px #999;
      background: #fff;
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
        .forgot, .sign-up {
          cursor: pointer;
          &:hover {
            color: #ff0000;
          }
        }
      }
    }
  }
</style>
