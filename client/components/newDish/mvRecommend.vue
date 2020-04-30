<template>
  <div class="mv-recommend">
    <div v-for="item in getMvList" :key="item.id" class="mv-list" @click.stop="jumpToNewDishDetail(item.id)">
        <dish-card v-if="item" :item-obj="item"></dish-card>
      </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import jumpUrlMixin from '~/mixins/jumpUrlMixin'
import DishCard from './dishCard'
export default {
  name: 'MvRecommend',
  mixins: [jumpUrlMixin],
  props: {
    artistId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {

    }
  },
  components: {
    DishCard
  },
  computed: {
    ...mapState('artistList', ['artistDetailMvObj']),
    getMvList () {
      return this.artistDetailMvObj.mvs
    }
  },
  methods: {
    ...mapActions('artistList', ['getArtistDetailMvObj']),
    async init () {
      const params = {
        id: this.artistId,
        limit: 9
      }
      await this.getArtistDetailMvObj(params)
    }
  },
  created () {
    this.init()
  }
}
</script>

<style scoped lang="scss">
  .mv-recommend {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    min-height: 900px;
    margin: 10px 0 0 0;
    .mv-list {
      margin: 20px 0;
    }
  }
</style>
