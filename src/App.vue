<template>
  <div id="app">
    <MHeader></MHeader>
    <Tab></Tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>

</template>

<script>
  import MHeader from './components/m-header/m-header'
  import Tab from './components/tab/tab'
  import Player from 'components/player/player'

  export default {
    components: {
        MHeader,
        Tab,
        Player

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
