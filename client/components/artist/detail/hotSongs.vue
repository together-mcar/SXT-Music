<template>
  <div class="hot-songs">
    <div class="songs-header">
      <el-button type="primary" icon="el-icon-video-play" @click.stop="getMoreMusicPlay(getHotSongList)">播放</el-button>
      <el-button type="success" icon="el-icon-plus" @click.stop="selectMusicSheet(getMusicList(getHotSongList))">收藏</el-button>
      <el-button type="warning" icon="el-icon-star-off" @click.stop="addMusicToSheet(getMusicList(getHotSongList))">喜爱</el-button>
    </div>
    <sxt-music-list
      :item-arr="getHotSongList"
      :list-length="getHotSongListLength">
    </sxt-music-list>
    <sxt-add-music-to-sheet v-if="dialogVisible" :dialogVisible.sync="dialogVisible" @change="handleAddMusicToSheetChange"></sxt-add-music-to-sheet>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SxtMusicList from '~/components/common/sxtMusicList'
import playMusicMixin from '~/mixins/playMusicMixin'
import musicOptOfDB from '~/mixins/musicOptOfDB'
import SxtAddMusicToSheet from '~/components/common/sxtAddMusicToSheet.vue'
export default {
  name: 'HotSongs',
  mixins: [playMusicMixin, musicOptOfDB],
  data () {
    return {

    }
  },
  components: {
    SxtMusicList,
    SxtAddMusicToSheet
  },
  computed: {
    ...mapState('artistList', ['artistDetailObj']),
    getHotSongList () {
      return this.artistDetailObj.hotSongs
    },
    getHotSongListLength () {
      return this.getHotSongList.length
    }
  },
  methods: {

  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  .hot-songs {
    position: relative;
    padding: 25px 0 0 0;
    .songs-header {
      margin: 20px 20px 0 0;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
</style>
