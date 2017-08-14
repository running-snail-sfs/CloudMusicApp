<template>
  <div class="rank" ref="rank">
    <Scroll class="rank-item" :data="rankList">
      <div class="scroll_contain">
        <ul>
          <li v-for="item in rankList">
            <div class="item-content">
              <div class="item_img">
                <img :src="item.picUrl" width="80">
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
  </div>
</template>

<script>
  import { getTopList } from 'api/rank'
  import Scroll from 'base/scroll/scroll'

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
          console.log(_this.rankList)
        })
      }
    },
    components: {
      Scroll

    }
  }
</script>

<style scoped>
  .rank {
    background: black;
    width: 100%;
    position: fixed;
    top: 88px;
    bottom: 0;
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
    font-size: 18px;
    color: yellow;
    font-weight: bold;
  }

  .song-item {
    margin: 6px 0 0 10px;
    font-family: "hiragino sans gb";
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;


  }

  .song-name {
    margin: 0 0 0 5px;
  }

</style>

