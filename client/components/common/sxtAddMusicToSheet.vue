<template>
  <el-dialog center title="选择歌单" :visible.sync="dialogVisible" width="30%" :before-close="close" :close="close">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedSheets" @change="handleCheckedSheetsChange">
      <el-checkbox v-for="sheet in sheets" :label="sheet" :key="sheet.id">{{sheet.sheetName}}</el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">确 定</el-button>
      <el-button @click="close">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'SxtAddMusicToSheet',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      checkAll: false,
      checkedSheets: [],
      sheets: [],
      isIndeterminate: true
    }
  },
  watch: {
    dialogVisible: {
      immediate: true,
      handler (newValue) {
        if (!newValue) return
        this.init()
      }
    }
  },
  computed: {
    ...mapState('myMusic', ['musicSheetListSimple']),
    getSheetIdList () {
      let sheetIdList = []
      if (this.checkedSheets.length !== 0) {
        this.checkedSheets.forEach(el => {
          sheetIdList.push(el.id)
        })
      }
      return sheetIdList
    }
  },
  methods: {
    ...mapActions('myMusic', ['getMusicSheetListSimple']),
    close () {
      this.$emit('update:dialogVisible', false)
    },
    save () {
      this.$emit('change', this.getSheetIdList)
      this.close()
    },
    handleCheckAllChange(val) {
      this.checkedSheets = val ? this.musicSheetListSimple : []
      this.isIndeterminate = false
    },
    handleCheckedSheetsChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.sheets.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.sheets.length
    },
    async init () {
      const userId = this.$store.state.userInfo.userId
      console.log('sxtAddMusicToSheet - init - userId:', userId)
      await this.getMusicSheetListSimple({userId}).then(() => {
        this.sheets = this.musicSheetListSimple
        console.log('sxtAddMusicToSheet - init - sheets:', this.sheets)
      })
    }
  },
  created () {
    // this.init()
  }
}
</script>

<style scoped lang="scss">
  .page {
  }
</style>
