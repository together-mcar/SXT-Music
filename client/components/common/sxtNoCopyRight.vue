<template>
  <el-dialog center title="提示" :visible.sync="dialogVisible" width="30%" :before-close="close" :close="close" :modal='false'>
    <div>暂无版权</div>
  </el-dialog>
</template>

<script>
export default {
  name: 'SxtNoCopyRight',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  components: {

  },
  methods: {
    close () {
      this.$emit('change')
      this.$emit('update:dialogVisible', false)
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  .copy-right {
  }
</style>
