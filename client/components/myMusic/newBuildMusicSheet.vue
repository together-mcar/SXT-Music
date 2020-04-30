<template>
  <el-dialog title="新建歌单" :visible.sync="dialogVisible" width="30%" :before-close="cancel">
    <div class="input">
      <div class="title">歌单名称：</div>
      <el-input type="text" v-model="musicSheetName" @keyup.enter.native="save"></el-input>
    </div>
    <div class="tips">
      可通过“收藏”将音乐添加到新歌单中
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">新 建</el-button>
      <el-button @click="cancel">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'BuildMusicSheet',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      musicSheetName: ''
    }
  },
  methods: {
    cancel () {
      Object.assign(this.$data, this.$options.data())
      this.$emit('update:dialogVisible', false)
    },
    save () {
      if (this.check()) {
        this.$emit('change', this.musicSheetName)
        this.cancel()
      }
    },
    check () {
      if (this.musicSheetName === '') {
        this.$message({
          type: 'error',
          message: 'music sheet name is null'
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
  .input {
    display: flex;
    flex-wrap: nowrap;
    line-height: 40px;
    .title {
      width: 86px;
    }
  }
  .tips {
    font-size: 12px;
    color: #999999;
    margin: 20px 0 0 72px;
  }
</style>
