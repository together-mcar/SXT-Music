import { mapper } from '~/utils/mapping.js'

export default {
  data: () => ({
    mapper,
    currentTab: 0
  }),
  computed: {
    getMvQuery () {
      return {
        area: this.getAreaName,
        limit: 10
      }
    },
    getAreaName () {
      if (this.currentTab === 0) return ''
      return mapper.AREA_NAME.find(el => {
        if (el.value === this.currentTab) {
          return el
        }
      }).text
    },
    getMuiscIdx () {
      return mapper.AREA_NAME.find(el => {
        if (el.value === this.currentTab) {
          return el
        }
      }).idx
    },
    getCode () {
      return mapper.ARTIST_AREA_NAME.find(el => {
        if (this.currentTab === el.value) {
          return el
        }
      }).code
    }
  },
  methods: {
    getSingerQuery (typeId) {
      if (this.currentTab === 0) {
        return {
          cat: this.getSingerCatId(typeId),
          limit: 5,
          offset: (typeId - 1) * 5
        }
      } else {
        return {
          cat: this.getSingerCatId(typeId),
          limit: 5,
        }
      }
    },
    getSingerCatId (typeId) {
      if (this.currentTab === 0) {
        return this.getCode
      } else {
        return this.getCode * 10 + typeId
      }
    }
  }
}
