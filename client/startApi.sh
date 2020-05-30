function start () {
  echo "run NeteaseCloudMusicApi"

  cd ../NeteaseCloudMusicApi
  npm run start

  cd ../server
  python3 manage.py runserver

  echo "run DjangoApi"
}
start
