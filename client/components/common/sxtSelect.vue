<template>
  <div class="sxt-select">
    <div :class="{ 'dropdown-warp': true, 'show-down-bg': isShowOption }">
      <div class="out-select" @mouseover="showOption" @mouseout="hideOption">
        {{ currentValue }}
        <i class="iconfont icon-weimingmingwenjianjia_jiantou-copy select-botton-row"></i>
        <i class="iconfont icon-weimingmingwenjianjia_jiantou-copy-copy select-top-row"></i>
      </div>
      <div :class="{ 'option': true, 'show-option': isShowOption }">
        <div class="optionSep"></div>
        <div class="option-list">
          <div v-for="item in list"
            :key="item.value"
            :class="{ 'option-item': true, 'active': getActiveState(item.text) }"
            @click.stop="modifyValue(item.text)">
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SxtSelect',
  props: {
    value: {
      type: [Number, Boolean, String],
      required: true
    },
    listObj: {
      type: [Array, Object],
      required: true
    }
  },
  data () {
    return {
      isShowOption: false,
      list: [],
      currentValue: ''
    }
  },
  computed: {
  },
  methods: {
    showOption () {
      this.isShowOption = true
    },
    hideOption () {
      this.isShowOption = false
    },
    getActiveState (state) {
      return this.currentValue === state
    },
    modifyValue (state) {
      this.currentValue = state
      this.$emit('input', this.currentValue)
    }
  },
  created () {
    this.list = this.listObj
    this.currentValue = this.value
  }
}
</script>

<style scoped lang="scss">
  .sxt-select {
    display: inline-block;
    .show-down-bg {
      padding-bottom: 0 !important;
    }
    .dropdown-warp {
      cursor: pointer;
      display: inline-block;
      position: relative;
      &:hover {
        .option {
          display: inline-block;
        }
        .select-botton-row {
          display: none;
        }
        .select-top-row {
          display: inline;
        }
      }
      .select-botton-row {
        display: inline;
      }
      .select-top-row {
        display: none;
      }
      .out-select {
        height: 40px;
        border-radius: 40px;
        display: inline-block;
        background: #e4e4e4;
        padding: 0 25px;
        line-height: 40px;
        .iconfont {
          margin: 0 0 0 5px;
        }
      }
      .option {
        display: none;
        position: absolute;
        min-width: 100%;
        bottom: 0;
        left: 0;
        transform: translateY(100%);
        background: #f2f2f2;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
        .optionSep {
          height: 3px;
          background: #ccc;
        }
        &-list {
          padding: 5px 3px;
          font-size: 14px;
          font-weight: 400;
          color: #666;
          line-height: 30px;
          .option-item {
            padding: 0 7px;
            &:hover {
              background: rgba(0, 0, 0, .1);
            }
          }
          .active {
            background: rgba(34, 32, 32, 0.3) !important;
          }
        }
      }
      .show-option {
        display: inline-block !important;
      }
    }
  }
</style>
<style lang="scss" scoped>
  @media screen and (max-width: 960px) {
    .sxt-select {
      font-size: 14px;
      .dropdown-warp {
        .out-select {
          height: 24px;
          border-radius: 40px;
          padding: 0 20px;
          line-height: 24px;
        }
        .option {
          &-list {
            font-size: 10px;
            line-height: 18px;
          }
        }
      }
    }
  }
</style>
