<template>
  <el-dialog title="选择标签" :visible.sync="dialogVisible" width="50%" :before-close="cancel" center>
    <div class="tips">
      选择合适的标签，最多可选3个
    </div>
    <div class="content">
      <div v-for="item in mapper.CATEGORY_TAG_LIST" :key="item.value" class="tag-type">
        <div class="category">{{ item.text }}:</div>
        <div class="tags">
          <div v-for="el in getCategoryList(item.value)" :key="el.id" class="button">
            <el-button :class="getPrimary(el)" @click.stop="selectTag(el)">{{ el.name }}</el-button>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button class="save" type="primary" @click="save">保存并取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { mapper } from '~/utils/mapping.js'
export default {
  name: 'SelectMusicTag',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    tagList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      mapper,
      selectTagList: []
    }
  },
  watch: {
    tagList: {
      immediate: true,
      handler (newValue) {
        if (!newValue) return
        this.selectTagList = [...newValue]
      }
    }
  },
  computed: {
    ...mapState('myMusic', ['musicSheetTypeTag'])
  },
  methods: {
    cancel () {
      // Object.assign(this.$data, this.$options.data())
      this.$emit('update:dialogVisible', false)
    },
    save () {
      this.$emit('change', this.selectTagList)
      this.cancel()
    },
    getCategoryList (category) {
      return this.musicSheetTypeTag.filter(el => {
        if (el.category === category) {
          return el
        }
      })
    },
    selectTag (tagObj) {
      if (this.selectTagList.some(el => el.name === tagObj.name)) {
        this.selectTagList = this.selectTagList.filter(el => el.name !== tagObj.name)
      } else {
        if (this.selectTagList.length >= 3) {
          this.$message({
            type: 'error',
            message: '最多只能选择3个标签'
          })
        } else {
          this.selectTagList.push(tagObj)
        }
      }
    },
    getPrimary (tagObj) {
      return this.selectTagList.some(el => el.name === tagObj.name) ? 'primary' : ''
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  /deep/.el-dialog__body {
    padding: 0 20px 30px !important;
  }
  .primary {
    background: darkblue;
  }
  .save {
    width: 120px;
    height: 40px;
  }
  .tips {
    font-size: 14px;
    color: #666;
    line-height: 25px;
    margin-bottom: 5px;
  }
  .content {
    max-height: 400px;
    overflow-y: auto;
    .tag-type {
      display: flex;
      margin: 10px 0;
      .category {
        width: 50px;
        padding: 10px 0;
        white-space: nowrap;
      }
      .tags {
        width: 620px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .button {
          display: inline-block;
          margin: 5px 0;
          /deep/.el-button {
            padding: 0 !important;
            height: 31px;
            width: 70px;
            overflow: hidden;
          }
        }
        .button {
          margin-right: 15px;
        }
      }
    }
  }
</style>
