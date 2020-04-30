const GET_API = {
  GET_HOME_SWIPER_URL: '/banner', // 获取首页轮播图信息 不可用
  GET_NEW_MV_URL: '/mv/first', // 获取最新mv信息
  GET_BATCH_FOR_BANNER_URL: '/batch', // 使用batch获取PC首页轮播图数据
  GET_RECOMMEND_SINGER: '/top/artists', // 获取热门歌手信息
  GET_AREA_NEW_MV: '/mv/first', // 获取不同地区的最新MV
  GET_TOP_MUSIC: '/top/list', // 获取网易歌曲排行榜， 可以作为首页不同地区歌曲表单
  GET_TOP_MV: '/top/mv', // 获取网易mv分类
  GET_ARTIST_LIST: '/artist/list', // 获取歌手分类信息
  GET_MUSIC_SHEET: '/top/playlist', // 调用此接口 , 可获取网友精选碟歌单
  GET_MUSIC_SHEET_DETAIL: '/playlist/detail', // 歌单能看到歌单名字 , 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐，但是返回的trackIds是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
  GET_MUSIC_DETAIL: '/song/detail', // 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)
  GET_MUSIC_LYRIC: '/lyric', // 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
  GET_ARTIST_DETAIL: '/artists', // 调用此接口 获取歌手详情, 传入歌手 id, 可获得歌手部分信息和热门歌曲
  GET_ARTIST_MV: '/artist/mv', // 调用此接口 , 传入歌手 id, 可获得歌手 mv 信息 , 具体 mv 播放地址可调 用/mv传入此接口获得的 mvid 来拿到
  GET_ARTIST_ALBUM: '/artist/album', // 调用此接口 , 传入歌手 id, 可获得歌手专辑内容
  GET_ARTIST_SIMI: '/simi/artist', // 调用此接口 , 传入歌手 id, 可获得相似歌手
  GET_MV_DETAIL: '/mv/detail', // 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 数据 , 数据包含 mv 名字 , 歌手 , 发布时间 , mv 视频地址等数据 , 其中 mv 视频 网易做了防盗链处理 , 可能不能直接播放 , 需要播放的话需要调用 ' mv 地址' 接口
  GET_MV_URL: '/mv/url', // 调用此接口 , 传入 mv id,可获取 mv 播放地址
  GET_MUSIC_URL: '/song/url', // 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口 , 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url( 不需要登录 )
  IS_ENABLE_MUSIC: '/check/music', // 调用此接口,传入歌曲 id, 可获取音乐是否可用,返回 { success: true, message: 'ok' } 或者 { success: false, message: '亲爱的,暂无版权' }
  GET_SEARCH_DETAIL: '/search', // 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
  GET_ABLUM_DETAIL: '/album' // 调用此接口 , 传入专辑 id, 可获得专辑内容
}

const POST_API = {

}

const UN_PARAM_GET_API = {
  GET_RECOMMEND_NEW_MUSIC: '/personalized/newsong', // 获取推荐音乐信息
  GET_RECOMMEND_MV: '/personalized/mv', // 获取推荐MV
  GET_TOP_ALL_LIST: '/toplist', // 调用此接口,可获取所有榜单
  GET_MUSIC_SHEET_TYPE: '/playlist/catlist' // 调用此接口,可获取歌单分类,包含 category 信息
}


export const API = Object.assign({}, POST_API, GET_API, UN_PARAM_GET_API)
