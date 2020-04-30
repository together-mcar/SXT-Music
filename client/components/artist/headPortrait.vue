<template>
  <div class="head-portrait">
    <img :src="itemObj.picUrl" />
    <p>{{ itemObj.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'HeadPortrait',
  props: {
    itemObj: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {

    }
  },
  components: {

  },
  methods: {

  },
  created () {
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/font.scss";
  .head-portrait {
    cursor: pointer;
    display: inline-block;
    width: 200px;
    img {
      width: 200px;
      border-radius: 50%;
      height: 175px;
    }
    p {
      width: 100%;
      margin: 5px 0 0 0;
      text-align: center;
      @include ellipsisSingleText(100%);
    }
  }
</style>
<style lang="scss" scoped>
  @media screen and (max-width: 960px) {
    .head-portrait {
      width: 75px;
      img {
        width: 75px;
        height: 60px;
      }
      p {
        font-size: 12px;
      }
    }
  }
</style>
