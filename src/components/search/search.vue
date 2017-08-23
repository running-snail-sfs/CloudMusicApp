<template>
  <div class="search">
    <div class="s-header">
       <div class="header-left">
         <div class="back-inco" @click="back"></div>
       </div>
       <div class="header-right">
          <div class="search-inco"><!--<img :src="searchUrl" width="20px" alt="">--></div>
          <input type="text" placeholder="搜索音乐，歌手，歌词，用户" v-model="searchText" @blur="addLocalStorage" />
          <div class="cancle"  @click="cancleText">x</div>
       </div>
    </div>
    <!--<div class="tab">
      <div>单曲</div>
      <div>歌手</div>
      <div>专辑</div>
      <div>歌单</div>
      <div>MV</div>
    </div>-->
    <div class="songs-info" v-show="isShow">
        <div class="singer-type">歌手分类</div>
      <div class="hot-search">
        <p>热门搜索</p>
        <div><a :href="special.url" :class="{hotSinger:isHot}">{{special.key}}</a></div>
        <div v-for="(item,index) in topList" @click="addText">{{item.k}}</div>

      </div>
      <div class="my-history">
        <div class="history-content" v-for="(item,index) in localContent">
          <div class="history-left"><img width="25px" src="https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/clock_ic.png?max_age=19830212&d=20151105145423" alt=""></div>
          <div class="history-center" @click="addText">{{item}}</div>
          <div class="history-right" @click="delCache(index)">x</div>
        </div>
      </div>
        <div class="clear" @click="delCacheAll">清空记录</div>
    </div>
    <!--<Scroll :data="searchResults">-->

    <div v-show="isShowSearchRes" class="Search-res">
      <Scroll :data="searchResults" class="scroll-content" :pullup="pullup" @scrollToEnd="searchMore">
        <div>
           <div v-for="(item,index) in searchResults" class="search-key-res" >
             <!--<div class="search-key-left">{{index+1}}</div>-->
             <div class="search-key-center" @click="palySong(index)">
               <div>{{item.songname}}</div>
               <div class="albumname">专辑：{{item.albumname}}</div>
             </div>
             <div class="search-key-right">
               <span>.</span>
               <span>.</span>
               <span>.</span>
             </div>
           </div>
          <div v-show="isload" class="lodding-inco">
                ...正在加载
          </div>
          <div class="scroll-botton">
          </div>
        </div>
      </Scroll>
      <div class="loading-container" v-show="!searchResults.length">
        <loading></loading>
      </div>
     </div>

    <!--</Scroll>-->

  </div>
</template>

<script>
  import { getHotKey ,search} from 'api/search.js'
  import Scroll from 'base/scroll/scroll'
  import { mapActions } from 'vuex'
  import {createSong} from 'common/js/song'
  import Loading from 'base/loading/loading'
  export default{
    data(){
      return {
        isload:false,// 是否显示下拉图标
        isHot:true,
        isShow:true, //显示本地记录
        isShowSearchRes:false,//显示查询结果
       /* searchUrl:require("common/img/search.png"),*/
        searchText:"", // 搜索内容
        localContent:[],  //本地存储的搜索记录
        hotKey:[], // 热门词汇
        special:{},
        page:1,
        searchResults:[],
        song:[], //查询结果播放的存放数组
        pullup:true //上拉刷新

      }
    },
    computed:{
      topList(){
        return this.hotKey.slice(0,10)
      }

    },
    created(){
      this.getLocalContent()
      this._hotKey() //热门搜索
    },
    activated () {
      this.getLocalContent() //组件激活
       this.searchText=""

    },
    methods:{
      addLocalStorage(){ // 保存搜索记录
        if(!this.searchText){
           return
        }else{
          this.localContent.push(this.searchText)
          this.localContent=this.removeCopy(this.localContent)
          localStorage.setItem("cacheText",JSON.stringify(this.localContent))
        }

      },
      // 去除localContent数组中的重复数据方法
      removeCopy(arr){
         let newArr=[]
        for(let i=0;i<arr.length;i++){
           if(newArr.indexOf(arr[i])<0){
             newArr.push(arr[i])
           }
        }
        return newArr
      },
       searchMore(){  //上拉刷新触发的事件
          this.isload=true
           this.page++
         search(this.searchText,this.page,true).then((data)=>{
           console.log(data)
           this.searchResults =this.searchResults.concat(data.data.song.list)
           this.song=this._normalizeSongs(this.searchResults)
           console.log(this.song)
         })

      },
      addText(e){ //点击热门标签的事件
      this.searchText=e.target.innerHTML
      },
      //加载热门词
      _hotKey(){
        var _this=this
        getHotKey().then((data)=>{
          console.log(data)
          _this.special.key=data.data.special_key
          _this.special.url=data.data.special_url
          console.log("6666--"+_this.special.key)
          _this.hotKey=_this.computerTopHotKey(data.data.hotkey)
             console.log(_this.hotKey.slice(0,10))
        })
      },
      computerTopHotKey(hotKeyList){
        return hotKeyList.sort(this.sortBy("n",false,parseInt))

      },
      //排序
      sortBy(filed, rev, primer) {
        rev = (rev) ? -1 : 1;
        return function (a, b) {
          a = a[filed];
          b = b[filed];
          if (typeof (primer) != 'undefined') {
            a = primer(a);
            b = primer(b);
          }
          if (a > b) {
            return rev * -1;
          }
          if (a < b) {
            return rev * 1;
          }
          return 1;
        }
      },
      delCacheAll(){
        this.localContent=[]
        localStorage.setItem("cacheText",JSON.stringify([]))
      },
      delCache(index){
        this.localContent.splice(index,1)
        localStorage.setItem("cacheText",JSON.stringify(this.localContent))
      },
      getLocalContent(){
        console.log("6666--"+JSON.parse(localStorage.getItem("cacheText")))
        if(!localStorage.getItem("cacheText")){
          localStorage.setItem("cacheText",JSON.stringify([]))
        }
        this.localContent=JSON.parse(localStorage.getItem("cacheText"))

      },
      cancleText(){
        //this.localContent.push(this.searchText)
       // localStorage.setItem("cacheText",JSON.stringify(this.localContent))
        this.searchText="";
      },
      back () {
        this.$router.push('/recommend')
      },
      getSearchResulrs(){
        search(this.searchText,this.page,true).then((data)=>{
            console.log(data)
            this.searchResults=data.data.song.list
            this.song=this._normalizeSongs(data.data.song.list)
            console.log(this.song)
        })

      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
         //  let {musicData} = item
              console.log("songid--"+item.songid)
          if (item.songid && item.albummid) {
            ret.push(createSong(item))
          }
        })
        return ret
      },
      palySong(index){
          this.selectPlay({
          list: this.song,
          index
        })
      },
      ...mapActions([
        'selectPlay'
      ]),
    },

    watch:{
      searchText(oldVal,newVal){
        if(!this.searchText){
          this.isShowSearchRes=false
          this.isShow=true

        }else{
          this.isShow=false
          this.isShowSearchRes=true
          this.getSearchResulrs()
        }

      }
    },
    components: {
      Scroll,
      Loading
    },


  }
</script>

<style scoped >
  .search{
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #222222;
    color: black;

  }
  .s-header{
    display: flex;
    height: 44px;

  }
  .search-inco{
    position: absolute;
    top:10px;
  }

 /* .tab{
    height: 30px;
    line-height: 30px;
    display: flex;
    background: white;
    color: black;
    text-align: center;
  }
  .tab div{
    flex: 1;
   }
*/
  .header-left{
    flex: 1;

  }
  .header-right{
    flex: 8;
    position: relative;

  }
  .back-inco {
    content: "";
    position: absolute;
    width: 14px;
    height: 14px;
    border: 1px solid #ccc;
    border-width: 2px 0 0 2px;
    -webkit-transform: rotate(315deg);
    transform: rotate(315deg);
    top: 14px;
    left: 10px;
  }
  .header-right input{

    width: 95%;
    height: 35px;
    color: white;
    padding: 0 0 0 28px;
    background-color: #222222;
    outline: none;
    border-bottom: 1px solid white;
  }
  .songs-info{
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
  }
  .singer-type{
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: black;
    position: relative;
  }
  .singer-type:after{
    pointer-events: none;
    width:200%;
    height:200%;
    position:absolute;
    top:0;
    left:0;
    z-index:0;
    content:"";
    -webkit-transform:scale(0.5);
    -webkit-transform-origin:0 0;
    transform:scale(0.5);
    transform-origin:0 0;
    border-bottom: 1px solid #ddd;
  }
  .hot-search:after {
    clear:both;
    content:'.';
    display:block;
    width: 0;
    height: 0;
    visibility:hidden;
  }
  .hot-search {zoom:1;}
  .hot-search div{
    color: black;
    border-radius:10px;
    padding: 5px;
    margin:10px 0 0 10px;
    border: 1px solid black;
    float: left;
  }
  .hot-search p{
    color: black;
    margin: 5px 0 10px 0;
  }
  .hotSinger{
    color: red;
  }
  .history-content{
    display: flex;
    color: black;
    position: relative;
    margin: 10px 0 0 0;
  }
  .history-content:after{
    pointer-events: none;
    width:200%;
    height:200%;
    position:absolute;
    top:0;
    left:0;
    z-index:0;
    content:"";
    -webkit-transform:scale(0.5);
    -webkit-transform-origin:0 0;
    transform:scale(0.5);
    transform-origin:0 0;
    border-bottom: 1px solid #ddd;
  }
  .history-left{
    flex:1

  }
  .history-center{
    text-align: center;
    flex:6
  }
  .history-right{
    text-align: center;
    flex:1
  }
  .my-history{
    margin: 10px 0 0 0;
  }
  .clear{
    width: 100%;
    text-align: center;
    padding:  20px 0 0 0 ;
    color: red;
  }
  .cancle{
    position: absolute;
    color: white;
    right: 16px;
    top: 6px;
    font-size: 24px;
  }
  .Search-res{
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color:white;
    color: #333333;
    font-size:1em;
  }
  .scroll-content{
    overflow: hidden;
    height: 100%;

  }
  .search-key-res{
    display: flex;
    height: 44px;
    text-align: center;
    position: relative;
    align-items:center;
    padding: 10px 10px;

  }
  .search-key-res:after{
    pointer-events: none;
    width:200%;
    height:200%;
    position:absolute;
    top:0;
    left:0;
    z-index:0;
    content:"";
    -webkit-transform:scale(0.5);
    -webkit-transform-origin:0 0;
    transform:scale(0.5);
    transform-origin:0 0;
    border-bottom: 1px solid #ddd;
  }
  .search-key-left{
    flex: 1;
  }
  .search-key-center{
    flex: 4;
    text-align: left;
  }
  .search-key-center .albumname{
    margin: 10px 0 0 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .search-key-right{
     flex: 4;
    text-align: right;
  }
  .loading-container{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  .scroll-botton{
    height: 40px;
    width: 100%;
  }
  .lodding-inco{
    width: 100%;
    text-align: center;
    font-size: 16px;
  }
</style>
