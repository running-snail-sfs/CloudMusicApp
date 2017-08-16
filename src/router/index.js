import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend.vue'
import Singer from 'components/singer/singer.vue'
import Rank from 'components/rank/rank.vue'
import Search from 'components/search/search.vue'
import Disc from 'components/disc/disc.vue'
import SingerDetail from 'components/singer-detail/singer-detail.vue'
import RankListDetial from 'components/ranklist_detail/rank-detail.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/recommend'  // 默认首页跳转
  },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':ids',
          component: RankListDetial
        }
      ]

    },

    {
      path: '/search',
      component: Search
    }

  ]
})
