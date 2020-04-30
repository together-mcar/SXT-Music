<template>
  <div class="music-sheet">
    <img :src="itemObj.coverImgUrl" />
    <div class="music-tag" v-if="this.itemObj.tags">
      <span>{{ getTagStr }}</span>
    </div>
    <div class="music-desc">
      <span>{{ itemObj.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicSheet',
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
  computed: {
    getTagStr () {
      return this.itemObj.tags.join('|')
    }
  },
  methods: {

  },
  created () {
  }
}
</script>

<style scoped lang="scss">
@import "assets/styles/font.scss";
  .music-sheet {
    margin: 30px 0 0 0;
    cursor: pointer;
    width: 175px;
    height: 175px;
    position: relative;
    text-align: center;
    box-shadow: 8px 8px 8px #888;
    transition: all 1s;
    &:hover {
      transform: translateY(-10px);
      .music-desc,
      .music-tag {
        opacity: 1;
      }
    }
    img {
      width: 175px;
      height: 175px;
    }
    .music-desc {
      opacity: 0;
      position: absolute;
      bottom: 0;
      width: 175px;
      height: 45px;
      line-height: 22px;
      background: rgba(0, 0, 0, .7);
      color: #fff;
      font-size: 14px;
      @include ellipsisMoreText();
    }
    .music-tag {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 175px;
      height: 24px;
      line-height: 22px;
      background: rgba(134, 34, 34, 0.7);
      color: #fff;
      font-size: 14px;
      @include ellipsisSingleText(175px);
    }
  }
</style>
<style lang="scss" scoped>
@import "assets/styles/font.scss";
  @media screen and (max-width: 960px) {
    .music-sheet {
      margin: 10px 5px 0;
      width: 75px;
      height: 75px;
      box-shadow: 3px 3px 3px #888;
      img {
        width: 75px;
        height: 75px;
      }
      .music-desc {
        opacity: 1;
        width: 75px;
        height: 30px;
        line-height: 14px;
        font-size: 12px;
        @include ellipsisMoreText();
      }
      .music-tag {
        opacity: 1;
        width: 75px;
        height: 14px;
        line-height: 14px;
        font-size: 12px;
        @include ellipsisSingleText(75px);
      }
    }
  }
</style>
