<template>
  <div class="rank">
    <Scroll class="rank-item" :data="rankList" ref="scroll">
      <div class="scroll_contain">
        <ul>
          <li v-for="item in rankList" @click="selectSongList(item)">
            <div class="item-content">
              <div class="item_img">
                <img v-lazy="item.picUrl" width="80">
              </div>
              <div class="img_text">
                <h1>{{item.topTitle}}</h1>
                <div class="song-item" v-for="(songItem ,index) in item.songList">{{index + 1}}<span class="song-name">{{songItem.songname}}</span>-{{songItem.singername}}
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="item_bottom"></div>
      </div>

    </Scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import { getTopList ,getMusicList} from 'api/rank'
  import Scroll from 'base/scroll/scroll'
  import {mapMutations} from 'vuex' // vuex语法糖


  export default {
    data () {
      return {
        rankList: []
      }
    },
    created () {
      this._getRankList()
    },
    methods: {
      _getRankList () {
        var _this = this
        getTopList().then((data) => {
          _this.rankList = data.data.topList
        })
      },
      selectSongList(item){
        var _this = this
        getMusicList(item.id).then((data)=>{
          console.log(data)
          _this.setTopList(data)
        })
       this.$router.push({
          path: `/rank/${item.id}`
        })
      //this.$root.Bus.$emit('itemid',["123"])
      },
      ...mapMutations({
        setTopList: 'SET_TOP_LIST'
      })
    },
    components: {
      Scroll

    }
  }
</script>

<style scoped>
  .rank {
    background: #222222;
    width: 100%;
    position: fixed;
    top: 88px;
    bottom: 0;
    color: grey;

  }
  .scroll_contain li {
    margin: 20px;
  }
  .rank-item {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .item_bottom{
    height: 50px;
    width: 100%;
  }
  .item-content {
    display: flex;
  }
  .item_img {
    flex: 1;
  }

  .img_text {
    flex: 3;
  }

  .img_text h1 {
    margin: 0 0 0 10px;
    font-size: 16px;
    color: dodgerblue;
    font-weight: bold;
  }
  .song-item {
    width: 250px;
    margin: 6px 10px 0 10px;
    font-family:"微软雅黑";
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
  }
  .song-name {
    margin: 0 0 0 5px;
  }

</style>
