<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import { getSongList } from 'api/recommend'
  import { ERR_OK } from 'api/config'
  import { mapGetters } from 'vuex'
  import { createSong } from 'common/js/song'
  import Vue from 'vue'
  import vueResource from 'vue-resource'
  Vue.use(vueResource)
  export default {
    computed: {
      title() {
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList () {
        if (!this.disc.dissid) {
          this.$router.push('/recommend') // 返回到推荐页面
          return
        }
        let _this = this
        this.$http.jsonp('https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
          {
            params: {
              disstid: this.disc.dissid,
              type: 1,
              json: 1,
              utf8: 1,
              onlysong: 0,
              platform: 'yqq',
              hostUin: 0,
              needNewCode: 0,
              g_tk: 1928093487,
              inCharset: 'utf-8',
              outCharset: 'utf-8',
              notice: 0,
              format: 'jsonp'
            },
            jsonp: "jsonpCallback",
            jsonpCallback: "getCallBack"
          }
        ).then(
          function (res) {
            if (res.data.code === ERR_OK) {
              _this.songs = _this._normalizeSongs(res.data.cdlist[0].songlist)
              console.log(_this.songs)
            }
          }
        )
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    watch: {
      songs(newVal){
        console.log("歌单"+newVal)
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
