<template>
  <div class="search">
    <div class="search-title">
      <div class="search-input">
        <el-input placeholder="请输入内容" v-model="searchKey" @change="jumpToSearch(searchKey)">
          <el-button slot="prepend" icon="el-icon-search" @click="jumpToSearch(searchKey)"></el-button>
        </el-input>
      </div>
    </div>
    <div class="search-content">
      <search-content></search-content>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import SearchContent from '~/components/search/searchContent'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
export default {
  name: 'Search',
  layout: 'main',
  mixins: [jumpUrlMixin],
  async asyncData({app, store, query, error}) {
    try {
      const searchKey = query.key
      const params = {
        keywords: searchKey,
        limit: 30,
        offset: 0,
        type: 1
      }
      const albumParams = {
        keywords: searchKey,
        limit: 12,
        offset: 0
      }
      const musicSheetParams = {
        keywords: searchKey,
        limit: 16,
        offset: 0,
        type: 1000
      }
      store.commit('search/SEARCH_INIT')
      await store.dispatch('search/getSearchObj', params)
      await store.dispatch('search/getSearchObj', Object.assign(albumParams, { type: 10 }))
      await store.dispatch('search/getSearchObj', Object.assign(albumParams, { type: 100 }))
      await store.dispatch('search/getSearchObj', musicSheetParams)
      return {
        searchKey
      }
    } catch (err) {
      app.context.$errorHandler(err)
    }
  },
  data () {
    return {
      initCurrentPage: 1
    }
  },
  components: {
    SearchContent
  },
  computed: {
  },
  methods: {
    ...mapMutations('search', ['MODIFY_SEARCH_KEY', 'MODIFY_CURRENT_PAGE']),
    init () {
      this.MODIFY_SEARCH_KEY(this.searchKey)
      this.MODIFY_CURRENT_PAGE(this.initCurrentPage)
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped lang="scss">
  .search {
    .search-title {
      margin: 40px 0 20px;
      .search-input {
        display: -webkit-flex;
        margin: 0 auto;
        width: 350px;
      }
    }
  }
</style>
