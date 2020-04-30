<template>
  <div class="player">
    <video ref="videoPlayer" class="video-js vjs-theme-city"></video>
  </div>
</template>
<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import videoZhCN from 'video.js/dist/lang/zh-CN.json'
import '@videojs/themes/dist/fantasy/index.css'

export default {
  name: 'SxtLivePlay',
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      player: null,
      options: {
        // 是否自动播放
        autoplay: false,
        // 是否显示视频控件
        controls: 'control',
        // 预加载 auto-自动，metadata-元数据信息，none-不加载任何信息
        preload: 'auto',
        // 控制video高度
        height: 527,
        // 控制video宽度
        width: 936,
        // 播放悬浮大按钮
        bigPlayButton: true,
        // 是否循环播放
        loop: false,
        // 加载loading状态
        loadingSpinner: true,
        // 是否静音播放
        muted: false,
        // 是否加载视屏首屏图片
        posterImage: true,
        // 关闭按钮, 需注册事件关闭
        // closeButton: true,
        language: 'zh-CN',
        // 控制栏
        controlBar: {
          children: [
            {
              name: 'playToggle'
            },
            {
              // 当前播放时间
              name: 'currentTimeDisplay'
            },
            {
              // 进度控制栏
              name: 'progressControl'
            },
            {
              // 总时长
              name: 'durationDisplay'
            },
            {
              // 直播标识
              name: 'liveDisplay'
            },
            {
              // 竖向的音量控制条
              name: 'volumePanel',
              inline: false
            },
            {
              // 画中画按钮
              name: 'pictureInPictureToggle'
            },
            {
              // 全屏按钮
              name: 'fullscreenToggle'
            },
            {
              name: 'customControlSpacer'
            }
          ]
        },
        sources: [
          {
            src: 'http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/632873387/4db28fdf08f3f1e6aee1c3a19575316e.mp4?wsSecret=22452ee7538220e6049f27fc4c53e54c&wsTime=1584969139',
            type: 'video/mp4'
          }
        ]
      }
    }
  },
  mounted () {
    this.closeVideo()
    this.options = Object.assign(this.options, this.option)
    videoZhCN['Picture-in-Picture'] = '画中画'
    videoZhCN['Exit Picture-in-Picture'] = '退出画中画'
    videojs.addLanguage('zh-CN', videoZhCN)
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      let oneTime = true
      this.player.on('ended', () => {
        console.log('视频结束')
        oneTime = true
      })
      this.player.on('error', () => {
        console.log('视频出错了')
      })
      this.player.on('timeupdate', () => {
        if (this.$refs.videoPlayer.currentTime === 0 && oneTime) {
          console.log('播放开始')
          oneTime = false
        }
      })
      this.player.on('loadeddata', () => {
        console.log('数据加载完成')
      })
    })
  },
  methods: {
    closeVideo () {
      if (this.player) {
        console.log('this is dispose of video.')
        this.player.dispose()
      }
    }
  },
  beforeDestroy () {
    this.closeVideo()
  }
}
</script>
<style scoped lang='scss'>
$qiniuUrl: 'https://qn.jdj007.com';
  .player {
    width: 936px;
    height: 527px;
    display: flex;
    flex-direction: row;
    .close {
      cursor: pointer;
      width: 24px;
      height: 24px;
      background-image: url('#{$qiniuUrl}/webpc/1.6/icon_live_close.png');
      background-size: 24px 24px;
      &:hover {
        background-image: url('#{$qiniuUrl}/webpc/1.6/icon_live_close_hover.png');
      }
    }
    /deep/.video-js {
      .vjs-progress-control .vjs-progress-holder {
        margin: 0 10px 2px !important;
      }
      .vjs-time-control {
        padding: 0;
        margin-top: -2px;
      }
      .vjs-live-control {
        line-height: 30px;
        margin-top: 1px;
        font-size: 12px;
      }
      button {
        outline: none !important;
      }
      .vjs-slider-vertical .vjs-volume-level:before {
        left: -0.45em;
      }
      .vjs-play-progress:before {
        top: -0.4em !important;
      }
      .vjs-current-time, .vjs-duration {
        display: inline;
      }
      .vjs-time-control {
        margin-top: 1px;
      }
    }
  }
</style>
