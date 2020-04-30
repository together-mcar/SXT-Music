<template>
  <div class="sxt-tab">
    <div class="service-nav">
      <ul>
        <li :class="{ active: position === tab.value }" v-for="tab in navList" :key="tab.value" @click.stop="tabChange(tab.value)">
          <div class="btn">
            {{ tab.text }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SxtTab',
  props: {
    navList: {
      type: Array,
      default: () => []
    },
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      position: 0
    }
  },
  components: {

  },
  methods: {
    tabChange (tabIndex) {
      this.position = tabIndex
      this.$emit('input', this.position)
    }
  },
  created () {
    this.position = this.value
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/variables.scss";
$bgColor: #ccc;
$border: 1px #999 solid;
  .sxt-tab {
    .service-nav {
      height: 70px;
      width: 100%;
      background-color: $bgColor;
      .btn {
        background-color: $bgColor;
        padding: 0;
        margin: 0;
        color: #545A6A;
      }
      ul {
        @include clearfix();
        padding: 0 40px;
        border-bottom: $border;
        li {
          list-style-type: none;
          cursor: pointer;
          font-size: 18px;
          line-height: 66px;
          margin: 0 25px;
          float: left;
          &.active {
            .btn {
              color: #3057B5;
            }
            border-bottom: 3px solid #3057B5;
          }
          &:hover {
            border-bottom: 3px solid #3057B5;
          }
        }
      }
    }
  }
</style>
