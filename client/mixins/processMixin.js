import { mapState, mapMutations } from 'vuex'
import { mapper } from '~/utils/mapping.js'
import $ from 'jquery'

export default {
  data: () => ({
    mapper,
    isCloseVolume: false,
    isTimeMouseDown: false,
    isPlayStatus: false,
    currentPlayTime: 0,
    currentVolumeNum: 0,
    maxVolumeNum: 100,
    currentTimePosition: 0,
    distanceLeft: 0,
    clickPlayBarPosition: 0,
    maxLeft: document.body.clientWidth - 96,
    isVolumeMouseDown: false,
    currentVolumePosition: 0,
    distanceTop: 70,
    maxTop: 70
  }),
  computed: {
    getCurrentPlayTime () {
      return this.currentPlayTime * 1000
    }
  },
  methods: {
    judgeTimeDistanceLimit () {
      if (this.distanceLeft <= 0) {
        this.distanceLeft = 0
      } else if (this.distanceLeft >= this.maxLeft) {
        this.distanceLeft = this.maxLeft
      }
      $('#timeBar').css('left', this.distanceLeft)
      $('#processBar').css('width', this.distanceLeft)
    },
    judgeVolumeDistanceLimit () {
      if (this.distanceTop <= -10) {
        this.distanceTop = -10
      } else if (this.distanceTop >= this.maxTop) {
        this.distanceTop = this.maxTop
      }
      if (this.distanceTop === this.maxTop) {
        this.isCloseVolume = true
      } else {
        this.isCloseVolume = false
      }
      $('#volumeBtn').css('top', this.distanceTop)
      $('#volumeProBar').css('height', this.maxTop - this.distanceTop)
    },
    timeMouseDown (event) {
      this.isTimeMouseDown = true
      this.currentTimePosition = event.pageX - this.distanceLeft
    },
    volumeMouseDown (event) {
      this.isVolumeMouseDown = true
      this.currentVolumePosition = event.pageY - this.distanceTop
    },
    timeMouseUp () {
      this.isTimeMouseDown = false
    },
    timeMouseOut () {
      this.isTimeMouseDown = false
    },
    volumeMouseUp () {
      this.isVolumeMouseDown = false
    },
    volumeMouseOut () {
      this.isVolumeMouseDown = false
    },
    timeMouseMove (event) {
      if (this.isTimeMouseDown) {
        this.distanceLeft = event.pageX - this.currentTimePosition
        this.modifyCurrentPlayTime()
        this.judgeTimeDistanceLimit()
      }
    },
    volumeMouseMove (event) {
      if (this.isVolumeMouseDown) {
        this.distanceTop = event.pageY - this.currentVolumePosition
        console.log('this.distanceTop: ', this.distanceTop)
        this.modifyCurrentVolumeNum()
        this.judgeVolumeDistanceLimit()
      }
    },
    palyBarClick (event) {
      if (!this.isTimeMouseDown) {
        this.distanceLeft = event.pageX - 48
        this.modifyCurrentPlayTime()
        this.judgeTimeDistanceLimit()
      }
    },
    volumeBarClick (event) {
      if (!this.isVolumeMouseDown) {
        this.distanceTop = event.pageY - $('#volumeBg').offset().top - 10
        this.modifyCurrentVolumeNum()
        this.judgeVolumeDistanceLimit()
      }
    },
    modifyCurrentPlayTime () {
      this.$refs.audio.currentTime = (this.distanceLeft / this.maxLeft) * this.getCurrentMusicDt / 1000
    },
    modifyCurrentVolumeNum () {
      console.log('Math.floor(Number(this.distanceTop / this.maxTop)): ', Number((this.maxTop - this.distanceTop) / (this.maxTop + 10)))
      this.$nextTick(() => {
        this.$refs.audio.volume = Number((this.maxTop - this.distanceTop) / (this.maxTop + 10))
      })
    },
    updateTime (event) {
      this.currentPlayTime = event.target.currentTime
      this.distanceLeft = (this.currentPlayTime * 1000 / this.getCurrentMusicDt ) * this.maxLeft
      this.judgeTimeDistanceLimit()
      this.$nextTick(() => {
        if (this.$refs.audio) {
          if (this.$refs.audio.ended) {
            this.switchMusicNext()
          }
        }
      })
    },
    musicPause () {
      this.isPlayStatus = false
      this.$nextTick(() => {
        this.$refs.audio.pause()
      })
    },
    musicPlay () {
      this.isPlayStatus = true
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    }
  }
}
