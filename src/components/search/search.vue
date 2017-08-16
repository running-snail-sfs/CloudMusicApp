<template>
  <div class="search">
    <div class="s-header">
       <div class="header-left">
         <div class="back-inco" @click="back"></div>
       </div>
       <div class="header-right">
        <input type="text" placeholder="搜索音乐，歌手，歌词，用户"/>
       </div>
    </div>
    <!--<div class="tab">
      <div>单曲</div>
      <div>歌手</div>
      <div>专辑</div>
      <div>歌单</div>
      <div>MV</div>
    </div>-->
    <div class="songs-info">
        <div class="singer-type">歌手分类</div>
      <div class="hot-search">
        <p>热门搜索</p>
        <div>林俊杰</div>
        <div>周杰伦</div>
        <div>薛之谦</div>
        <div>王力宏</div>

      </div>
    </div>

  </div>
</template>

<script>
  export default{
    data(){
      return {

      }
    },
    methods:{
      back () {
        this.$router.push('/recommend')
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

  }
  .s-header{
    display: flex;
    height: 44px;

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
    padding: 0 0 0 20px;
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
  .hot-search div{
    color: black;
    border-radius:10px;
    padding: 5px;
    margin:0 0 0 10px;
    border: 1px solid black;
    float: left;
  }
  .hot-search p{
    color: black;
    margin: 0 0 10px 0;
  }

</style>
