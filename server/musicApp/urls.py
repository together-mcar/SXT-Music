from django.conf.urls import url, include
from .views import *

urlpatterns = [
  url(r'createMusicSheet$', post_music_sheet),
  url(r'getMusicLoveSheet$', get_love_music_sheet),
  url(r'getMusicSheet$', get_music_sheet),
  url(r'delMusicSheet$', del_music_sheet),
  url(r'initMusicSheetTag$', init_music_sheet_tag),
  url(r'getMusicSheetTag$', get_music_sheet_tag),
  url(r'getMusicSheetDetail$', get_music_sheet_detail),
  url(r'modifyMusicSheetDetail$', modify_music_sheet_detail),
  url(r'getMusicListBySheetId$', get_music_list_by_sheetId),
  url(r'addMusicToMusicSheet$', add_music_to_music_sheet),
  url(r'addArtistToDb$', add_artist_to_db),
  url(r'collectionMusicSheet$', collection_music_sheet),
]