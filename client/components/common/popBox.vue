<template>
  <div class="pop-box">
    <el-popover
      placement="right"
      width="500"
      style="padding: 10px"
      trigger="click">
      <el-botton @click.stop="modifyCurrentValue('全部')" style="margin: 10px 0 0 10px;cursor: pointer;">全部</el-botton>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column prop="categories" width="60"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <span v-for="item in scope.row.item" :key="item"
              style="cursor: pointer;"
              @click.stop="modifyCurrentValue(item)">
              {{ item }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="out-search" slot="reference">
        {{ currentValue }}
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'PopBox',
  props: {
    itemObj: {
      type: Object,
      default: () => {}
    },
    value: {
      type: [Number, String, Boolean],
      default: false
    }
  },
  data () {
    return {
      currentValue: '',
      tableData: []
    }
  },
  components: {

  },
  computed: {
    getCategoriesList () {
      return this.itemObj.categories
    },
    getSubList () {
      return this.itemObj.sub
    }
  },
  methods: {
    initTableData () {
      Object.keys(this.getCategoriesList).forEach((el, index) => {
        this.tableData.push({ 'categories': this.getCategoriesList[index], 'item': this.getSelectSubList(index) })
      })
    },
    getSelectSubList (categoriesId) {
      let subList = this.getSubList.filter(el => {
        if (Number(el.category) === Number(categoriesId)) {
          return el
        }
      })
       return subList.map(el => {
         return el.name
       })
    },
    modifyCurrentValue (name) {
      this.currentValue = name
      this.$emit('input', this.currentValue)
    }
  },
  created () {
    this.currentValue = this.value
    this.initTableData()
  }
}
</script>

<style scoped lang="scss">
  .pop-box {
    display: inline-block;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    .out-search {
      height: 40px;
      border-radius: 40px;
      display: inline-block;
      background: #e4e4e4;
      padding: 0 25px;
      line-height: 40px;
    }
    /deep/.el-popover {
      .categories {
        cursor: pointer;
        &:hover {
          border-bottom: 1px #ff0000 solid;
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
  @media screen and (max-width: 960px) {
    .pop-box {
      display: inline-block;
      font-size: 12px;
      font-weight: 400;
      cursor: pointer;
      .out-search {
        height: 24px;
        border-radius: 40px;
        padding: 0 15px;
        line-height: 24px;
      }
    }
  }
</style>

