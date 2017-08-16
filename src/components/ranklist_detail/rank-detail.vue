<template>

  <transition name="slide">
    <div class="rank-detail">
      <div class="header">

        <div class="back-inco"></div>
        <span class="back-title" @click="back">返回</span>
        排行榜详情

      </div>
      <Scroll class="topList-item" :data="songList">
        <div>
          <div class="imgage_background">
            <img :src="picUrl" width="100%">
          </div>
          <ul>
            <li v-for="(item,index) in songList" class="topList" @click="playSong(item,index)">
              <div class="detail-content">
                <div class="detail-num">
                  {{index + 1}}
                </div>
                <div class="detail-info">
                  <h1>{{item.data.songname}}</h1>
                  <p>{{item.data.singer[0].name}}</p>
                </div>
              </div>
            </li>
          </ul>
          <div class="topList-item-bottom"></div>
        </div>

      </Scroll>

    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Scroll from 'base/scroll/scroll'
  import { createSong } from 'common/js/song'
  import { mapActions } from 'vuex'
  import {mapMutations} from 'vuex' // vuex语法糖

  export default {
    data () {
      return {}
    },
    computed: {

      songs () {
        var list = this.bangDanList.songlist
        console.log(list)
        var arr = []
        list.forEach((item) => {
          let songInfo = {}
          songInfo.image = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.data.albummid}.jpg?max_age=2592000`
          songInfo.url = `http://ws.stream.qqmusic.qq.com/${item.data.songid}.m4a?fromtag=46`
          songInfo.duration = item.data.interval
          songInfo.name = item.data.songname
          songInfo.id = item.data.songid
          songInfo.singer = item.data.singer[0].name
          songInfo.mid = item.data.songmid
          songInfo.album = item.data.albumname
          arr.push(songInfo)
        })
        return arr
      },

      songList () {
        return this.bangDanList.songlist
      },

      ...mapGetters([
        'bangDanList',
        'picUrl'

      ])


    },

    created() {
     this. _checkResh()

    },


    methods: {
     _checkResh(){
        this.setBangDanList(localStorage.getItem("bangDanList"))
         console.log(localStorage)
       /* console.log(this.bangDanList)
       if(!this.bangDanList.songlist){
         alert(1111)
         this.$router.push('/rank')
         return
       }*/

     },
      back () {
        this.$router.back()
      },
      playSong (item, index) {
        console.log(this.songs)
        console.log('角标' + index)
        this.selectPlay({
          list: this.songs,
          index
        })

      },


      ...mapActions([
        'selectPlay'
      ]),
      ...mapMutations({
        setBangDanList: 'SET_BnagDan_LIST',

      })

    },

    components: {
      Scroll,

    }

  }
</script>

<style scoped>
  .rank-detail {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #222222;
    color: grey;
  }

  .header {
    height: 44px;
    text-align: center;
    line-height: 44px;
    color: dodgerblue;
    font-weight: bold;
  }

  .back-inco {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    border: 1px solid #ccc;
    border-width: 1px 0 0 1px;
    -webkit-transform: rotate(315deg);
    transform: rotate(315deg);
    top: 14px;
    left: 7px;
  }

  .back-title {
    position: absolute;
    display: block;
    left: 18px;
  }

  .detail-content {
    display: flex;
    padding: 0 0 0 10px;
  }

  .detail-num {
    flex: 1;
    color: grey;
  }

  .detail-info {
    flex: 10;
    margin: 0 0 0 15px;
  }

  .detail-info p {
    margin: 10px 0 0 0;
  }

  .topList {
    margin: 25px;
  }

  .topList-item {
    position: fixed;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .topList-item-bottom {
    height: 50px;
    width: 100%;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }

</style>
