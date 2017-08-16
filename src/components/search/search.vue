<template>
  <div class="search">
    <div class="s-header">
       <div class="header-left">
         <div class="back-inco" @click="back"></div>
       </div>
       <div class="header-right">
         <div class="search-inco"><img :src="searchUrl" width="20px" alt=""></div>
         <input type="text" placeholder="搜索音乐，歌手，歌词，用户" v-model="searchText"/>
          <div class="cancle" @click="cancleText">x</div>
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
        <div><span :class="{hotSinger:isHot}">林俊杰</span></div>
        <div><span>周杰伦</span></div>
        <div><span>薛之谦</span></div>
        <div><span>张杰</span></div>
        <div><span>张学友</span></div>
        <div><span>王力宏</span></div>
        <div><span>吴亦凡</span></div>
      </div>
      <div class="my-history">
        <div class="history-content" v-for="(item,index) in localContent">
          <div class="history-left"><img width="25px" src="https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/clock_ic.png?max_age=19830212&d=20151105145423" alt=""></div>
          <div class="history-center">{{item}}</div>
          <div class="history-right" @click="delCache(index)">x</div>
        </div>
      </div>
        <div class="clear" @click="delCacheAll">清空记录</div>
    </div>
    <div v-show="isShowSearchRes" class="Search-res">
     这里是查询结果，功能查询接口还没写
     </div>

  </div>
</template>

<script>
  export default{
    data(){
      return {
        isHot:true,
        isShow:true, //显示本地记录
        isShowSearchRes:false,//显示查询结果
        searchUrl:require("common/img/search.png"),
        searchText:"",
        localContent:[]
      }
    },
    created(){
      this.getLocalContent()
    },
    methods:{
      delCacheAll(){
        this.localContent=[]
        localStorage.setItem("cacheText",JSON.stringify())
      },
      delCache(index){
        this.localContent.splice(index,1)
      },
      getLocalContent(){
        var info=["邵方舒","大张伟","薛之谦","张杰","周杰伦"]
        localStorage.setItem("cacheText",JSON.stringify(info))
        this.localContent=JSON.parse(localStorage.getItem("cacheText"))

      },
      cancleText(){
        this.searchText="";
      },
      back () {
        this.$router.push('/recommend')
      },
      getSearchResulrs(){
       alert("http请求")
      }
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
    }

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
    background-color: white;
    color: black;
  }

</style>
