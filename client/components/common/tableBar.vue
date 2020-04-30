<template>
  <span class="tab-bar">
    <span v-for="(item, index) in list" :key="index" class="tab">
      <span
        :class="[ 'bar-text', isActive(index) ]"
        @click="activeIndex(index)">
        {{ item.text }}
      </span>
      <span v-if="isLastItem(index)">|</span>
    </span>
  </span>
</template>

<script>
import { mapper } from '~/utils/mapping.js'
export default {
  name: 'TableBar',
  props: {
    areaList: {
      type: Array,
      default: () => []
    },
    currentTab: {
      type: Number,
      default: 0
    }
  },
  watch: {
    areaList (newVal) {
      if (newVal) {
        this.list = newVal
      }
    },
    currentTab (newVal) {
      if (newVal) {
        this.tabIndex = newVal
      }
    }
  },
  data () {
    return {
      mapper,
      tabIndex: 0,
      list: mapper.AREA_NAME
    }
  },
  methods: {
    activeIndex (index) {
      this.tabIndex = index
      this.$emit('update:currentTab', this.tabIndex)
      this.$emit('change')
    },
    isActive (index) {
      return index === this.tabIndex ? 'active' : 'unactive'
    },
    isLastItem (index) {
      return index !== this.list.length - 1
    }
  },
  created () {
    this.list = this.areaList.length === 0 ? mapper.AREA_NAME : this.areaList
  }
}
</script>

<style scoped lang="scss">
  $itemMinWidth: 35px;
  .tab-bar {
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    .bar-text {
      display: inline-block;
      min-width: $itemMinWidth;
      margin: 0 0 0 5px;
      cursor: pointer;
    }
    .active {
      border-bottom: 2px darkred solid;
    }
    .unactive {
      border: none;
    }
  }
</style>
<style lang="scss" scoped>
  @media screen and (max-width: 960px) {
    .tab-bar {
      font-size: 12px;
      .bar-text {
        display: inline-block;
        min-width: 20px;
        margin: 0 0 0 2px;
      }
      .active {
        border-bottom: 2px darkred solid;
      }
      .unactive {
        border: none;
      }
    }
  }
</style>
