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
      <ul>
        <li v-for="(item,index) in songList" class="topList" @click="playSong(item)">
          <div class="detail-content">
            <div class="detail-num">
               {{index+1}}
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
  export default {
    data () {
      return {

      }
    },
    computed: {
      songList(){
        return  this.topList.songlist
      },
      ...mapGetters([
        'topList'
      ])
    },
    created () {

      /*this.$root.Bus.$on('itemid', data => {
        console.log('id是' + data)
        alert(data)
      })*/
    },
    beforeDestroy () {
      this.$root.Bus.$off('itemid')
    },
    methods: {
      back(){
        this.$router.back()
      },
      playSong(item){
       console.log(item)
      }

    },
    components: {
      Scroll

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
  }
  .detail-info p{
    margin:  10px 0 0 0;
  }
  .topList{
    margin: 25px;
  }
  .topList-item{
    position: fixed;
    top: 44px;
    bottom: 0;
    left:0;
    right:0;
    overflow: hidden;
  }
  .topList-item-bottom{
    height: 50px;
    width: 100%;
  }
  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s
  }
  .slide-enter,.slide-leave-to{
    transform: translate3d(100%, 0, 0)
  }
</style>
