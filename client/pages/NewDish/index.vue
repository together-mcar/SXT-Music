<template>
  <div class="new-dish">
    <h2>
      <span class="mv-table">MV</span>
      <table-bar class="tab-bar" :current-tab.sync="currentTab" @change="load"></table-bar>
    </h2>
    <div class="mv-content">
      <div v-for="item in getMvList" :key="item.id" class="mv-list" @click.stop="jumpToNewDishDetail(item.id)">
        <dish-card v-if="item" :item-obj="item"></dish-card>
      </div>
    </div>
    <div class="mv-footer">
      <el-pagination
        :page-size="maxPageSize"
        background
        :current-page.sync="currentPage"
        layout="prev, pager, next"
        :total="total"
        @prev-click="changePage"
        @next-click="changePage"
        @current-change="load">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import TableBar from '~/components/common/tableBar'
import { mapState, mapActions } from 'vuex'
import DishCard from '~/components/newDish/dishCard'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
import { mapper } from '~/utils/mapping.js'
export default {
  name: 'NewDish',
  layout: 'main',
  mixins: [jumpUrlMixin],
  async asyncData({app, store}) {
    try {
      await store.dispatch('newDish/getTopMv')
    } catch (err) {
      app.context.$errorHandler(err)
    }
  },
  data () {
    return {
      mapper,
      maxPageSize: 9,
      total: 100,
      currentPage: 1,
      currentTab: 0
    }
  },
  components: {
    TableBar,
    DishCard
  },
  computed: {
    ...mapState('newDish', ['newDishObj']),
    getMvList () {
      return this.newDishObj.data
    }
  },
  methods: {
    ...mapActions('newDish', ['getTopMv']),
    async load () {
      const areaName = this.getAreaName()
      const params = {
        area: areaName,
        offset: (Number(this.currentPage) - 1) * this.maxPageSize
      }
      await this.getTopMv(params)
    },
    getAreaName () {
      if (this.currentTab === 0) return ''
      return mapper.AREA_NAME.find(el => {
        if (el.value === this.currentTab) {
          return el
        }
      }).text
    },
    changePage (index) {
      this.currentPage = index
      this.load()
    }
  },
  created () {
    console.log('getMvList: ', this.getMvList)
  }
}
</script>

<style scoped lang="scss">
  .new-dish {
    padding: 0 0 30px 0;
    h2 {
      margin: 50px 0 0 0;
      .mv-table {
        margin: 0 20px 0 0;
      }
      .tab-bar {
        vertical-align: middle;
      }
    }
    .mv-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      min-height: 900px;
      margin: 20px 0 0 0;
      .mv-list {
        margin: 20px 0;
      }
    }
    .mv-footer {
      margin: 10px 0 0;
      text-align: center;
    }
  }
</style>
<style lang="scss" scoped>
  @media screen and (max-width: 960px) {
    .new-dish {
      padding: 10px 10px 0;
      h2 {
        margin: 0;
        font-size: 16px;
        .mv-table {
          margin: 0 5px 0 0;
        }
      }
      .mv-content {
        min-height: 100px;
        margin: 5px 0 0 0;
        .mv-list {
          margin: 10px 0;
        }
      }
      .mv-footer {
        /deep/.el-pagination {
          button, .number, .more {
            min-width: 24px !important;
          }
        }
      }
    }
  }
</style>
