export const LOCAL_API = {
  LOGIN: '/login',  // 登录
  REGISTER: '/register', // 注册
  CREATE_MUSIC_SHEET: '/createMusicSheet',
  GET_MUSIC_LOVE_SHEET: '/getMusicLoveSheet',
  GET_MUSIC_SHEET: '/getMusicSheet',
  DEL_MUSIC_SHEET: '/delMusicSheet',
  INIT_MUSIC_SHEET_TAG: '/initMusicSheetTag',
  GET_MUSIC_SHEET_TAG: '/getMusicSheetTag',
  GET_MUSIC_SHEET_DETAIL: '/getMusicSheetDetail',
  MODIFY_MUSIC_SHEET_DETAIL: '/modifyMusicSheetDetail',
  GET_MUSIC_LIST_BY_SHEET_ID: '/getMusicListBySheetId',
  ADD_MUSIC_TO_MUSIC_SHEET: '/addMusicToMusicSheet',
  ADD_ARTIST_TO_DB: '/addArtistToDb',
  COLLECTION_MUSIC_SHEET: '/collectionMusicSheet'
}

/**
LOGIN: {
  req: {
    userName: String
    passWord: String
  },
  res: {
    user: {
      userId: Number
      userName: String
      passWord: String
      gender: Number
    }
  }
}
REGISTER: {
  req: {
    userName: String
    passWord: String
    gender: Number
  }
  res: {
    void
  }
}

 */
