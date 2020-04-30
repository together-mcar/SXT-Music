import * as mapperModel from './mapperModel'
const mappers = {
  NAV_BAR_LIST: [
    {
      title: '首页',
      url: '/',
      value: 0
    },
    {
      title: '排行榜',
      url: '/RankList',
      value: 1
    },
    {
      title: '歌单',
      url: '/SongSheet',
      value: 2
    },
    {
      title: '歌手',
      url: '/Artist',
      value: 3
    },
    {
      title: '新碟',
      url: '/NewDish',
      value: 4
    },
    {
      title: '我的音乐',
      url: '/MyMusic/playList?index=-1', // 默认跳转喜爱歌曲
      value: 5
    }

  ],
  HOME_PAGE_RECOMMEND: [
    {
      text: '推荐新音乐',
      value: 1
    },
    {
      text: '推荐MV',
      value: 2
    },
    {
      text: '热门歌手',
      value: 3
    },
    {
      text: '榜单',
      value: 4
    }
  ],
  AREA_NAME: [
    {
      text: '推荐',
      value: 0,
      idx: '1'
    },
    {
      text: '内地',
      value: 1,
      idx: '15'
    },
    {
      text: '港台',
      value: 2,
      idx: '14'
    },
    {
      text: '欧美',
      value: 3,
      idx: '31'
    },
    {
      text: '日本',
      value: 4,
      idx: '10'
    },
    {
      text: '韩国',
      value: 5,
      idx: '12'
    }
  ],
  // 歌手Tab栏
  ARTIST_AREA_NAME: [
    {
      text: '推荐',
      value: 0,
      code: 5001
    },
    {
      text: '华语',
      value: 1,
      code: 100
    },
    {
      text: '欧美',
      value: 2,
      code: 200
    },
    {
      text: '日本',
      value: 3,
      code: 600
    },
    {
      text: '韩国',
      value: 4,
      code: 700
    },
    {
      text: '其他',
      value: 5,
      code: 400
    }
  ],
  // 歌手类型
  ARTIST_AREA_TYPE: [
    {
      text: '男',
      value: 1
    },
    {
      text: '女',
      value: 2
    },
    {
      text: '组合/乐队',
      value: 3
    }
  ],
  MUSIC_TOP_TABLE: [
    {
      text: '云音乐新歌榜',
      value: 0
    },
    {
      text: '云音乐热歌榜',
      value: 1
    },
    {
      text: '网易原创歌曲榜',
      value: 2
    },
    {
      text: '云音乐飙升榜',
      value: 3
    }
  ],
  // 歌手详情tab
  ARTIST_DETAIL_TAB: [
    {
      text: '热门歌曲',
      value: 0
    },
    {
      text: '所有专辑',
      value: 1
    },
    {
      text: '推荐MV',
      value: 2
    }
  ],
  // 搜索页面tab
  SEARCH_TAB: [
    {
      text: '单曲',
      value: 1
    },
    {
      text: '专辑',
      value: 10
    },
    {
      text: '艺人',
      value: 100
    },
    {
      text: '歌单',
      value: 1000
    }
  ],
  // 音乐播放栏播放顺序状态
  PLAY_TAB_ORDER: [
    { text: '顺序', value: mapperModel.PLAY_TAB_ORDER_MODEL.ORDER },
    { text: '单曲', value: mapperModel.PLAY_TAB_ORDER_MODEL.SINGLE },
    { text: '随机', value: mapperModel.PLAY_TAB_ORDER_MODEL.RANDOM }
  ],
  USER_INFO_GENDER: [
    { text: '先生', value: mapperModel.USER_INFO_GENDER_MD.GENTLEMEN },
    { text: '女士', value: mapperModel.USER_INFO_GENDER_MD.LADIES }
  ],
  CATEGORY_TAG_LIST: [
    {text: '语种', value: '0'},
    {text: '风格', value: '1'},
    {text: '场景', value: '2'},
    {text: '情感', value: '3'},
    {text: '主题', value: '4'}
  ]
}

export const mapper = mappers
