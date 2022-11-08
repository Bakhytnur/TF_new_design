import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomePage.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        next({
          name: 'login',
          params: { referralId: routeTo.query.r || '' }
        })
      }
    },
    meta: {
      bottomMenuItem: 'home'
    }
  },
  {
    path: '/signup',
    name: 'signUp',
    component: () => import('@/views/SignUp.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next({ name: 'home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (routeTo.params.referralId) {
        store.dispatch('user/setReferralId', routeTo.params.referralId)
      }
      if (store.getters['user/isSignedIn']) {
        next({ name: 'home' })
      } else {
        const userAuth = localStorage.getItem(
          `tf_${process.env.VUE_APP_SERVER_ID}_userAuth`
        )
        const clientHash = localStorage.getItem(
          `tf_${process.env.VUE_APP_SERVER_ID}_clientHash`
        )
        if (userAuth) {
          store
            .dispatch('user/fetchUserInfo', {
              ...JSON.parse(userAuth),
              clientHash
            })
            .then(() => {
              if (store.getters['user/isSignedIn']) {
                const entryPoint = store.getters['getEntryPoint']
                if (entryPoint && entryPoint.name) {
                  next({
                    name: entryPoint.name,
                    params: entryPoint.params
                  })
                } else {
                  next({ name: 'home' })
                }
              } else {
                localStorage.removeItem(
                  `tf_${process.env.VUE_APP_SERVER_ID}_userAuth`
                )
                next()
              }
            })
        } else {
          next()
        }
      }
    }
  },
  {
    path: '/login-phone',
    name: 'loginByPhoneNumber',
    component: () => import('@/views/LoginByPhoneNumber.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next({ name: 'home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/login-id',
    name: 'loginByID',
    component: () => import('@/views/LoginByID.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next({ name: 'home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/refLink',
    name: 'referralLink',
    component: () => import('@/views/ReferralLink.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'referralLink' })
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import('@/views/CatalogList.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'catalog' })
        next({
          name: 'login'
        })
      }
    },
    meta: {
      bottomMenuItem: 'catalog'
    }
  },
  {
    path: '/catalog-item/:id',
    name: 'catalogItem',
    component: () => import('@/views/CatalogItem.vue'),
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        store
          .dispatch('catalog/getItemById', routeTo.params.id)
          .then((item) => {
            if (item) {
              routeTo.params.item = item
              next()
            } else {
              next({ name: '404' })
            }
          })
      } else {
        store.dispatch('setEntryPoint', { name: 'catalog' })
        next({
          name: 'login'
        })
      }
    },
    meta: {
      bottomMenuItem: 'catalog'
    }
  },
  {
    path: '/knowledge-base',
    name: 'knowledgeBase',
    component: () => import('@/views/KnowledgeBase.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'knowledgeBase' })
        next({
          name: 'login'
        })
      }
    },
    meta: {
      bottomMenuItem: 'knowledgeBase'
    }
  },
  {
    path: '/articles',
    name: 'articles',
    component: () => import('@/views/ArticlesList.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'knowledgeBase' })
        next({
          name: 'login'
        })
      }
    },
    meta: {
      bottomMenuItem: 'knowledgeBase'
    }
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('@/views/ArticlesItem.vue'),
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', {
          name: 'knowledgeBase'
        })
        next({
          name: 'login'
        })
      }
    },
    meta: {
      bottomMenuItem: 'knowledgeBase'
    }
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/NewsList.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'news' })
        next({
          name: 'login'
        })
      }
    },
    meta: {
      bottomMenuItem: 'news'
    }
  },
  {
    path: '/news-item/:id',
    name: 'newsItem',
    component: () => import('@/views/NewsItem.vue'),
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', {
          name: 'news'
        })
        next({
          name: 'login'
        })
      }
    },
    meta: {
      bottomMenuItem: 'news'
    }
  },
  {
    path: '/cabinet',
    name: 'cabinet',
    props: true,
    component: () => import('@/views/ClientCabinet.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'cabinet' })
        next({
          name: 'login'
        })
      }
    },
    meta: {
      bottomMenuItem: 'cabinet'
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/CartList.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'cart' })
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/views/OrderCheckout.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'checkout' })
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/payment',
    name: 'payment',
    component: () => import('@/views/PaymentPage.vue'),
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/payment-state',
    name: 'paymentState',
    component: () => import('@/views/PaymentState.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'paymentState' })
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/profile',
    name: 'profile',
    props: true,
    component: () => import('@/views/UserProfile.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'profile' })
        next({
          name: 'login'
        })
      }
    },
    meta: {
      bottomMenuItem: 'cabinet'
    }
  },
  {
    path: '/visited-products',
    name: 'visitedProducts',
    props: true,
    component: () => import('@/views/VisitedProducts.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'visitedProducts' })
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/visited-articles',
    name: 'visitedArticles',
    props: true,
    component: () => import('@/views/VisitedArticles.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'visitedArticles' })
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/my-orders',
    name: 'myOrders',
    component: () => import('@/views/MyOrdersList.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'myOrders' })
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/my-clients-orders',
    name: 'myClientsOrders',
    component: () => import('@/views/MyClientsOrdersList.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'myClientsOrders' })
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/downline-client-order',
    name: 'downlineClientOrder',
    component: () => import('@/views/DownlineClientOrder.vue'),
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', {
          name: 'home'
        })
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/my-order/:id',
    name: 'myOrder',
    component: () => import('@/views/MyOrder.vue'),
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', {
          name: 'myOrders'
        })
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/requests-to-join',
    name: 'requestsToJoin',
    component: () => import('@/views/RequestsToJoin.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'requestsToJoin' })
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/my-request-to-join',
    name: 'myRequestToJoin',
    component: () => import('@/views/MyRequestToJoin.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'myRequestToJoin' })
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/account-balance',
    name: 'accountBalance',
    component: () => import('@/views/AccountBalance.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'accountBalance' })
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/downline-lp',
    name: 'downlineLP',
    component: () => import('@/views/DownlineLP.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'downlineLP' })
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/downline-client-profile/:id',
    name: 'downlineClientProfile',
    props: true,
    component: () => import('@/views/DownlineClientProfile.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'downlineLP' })
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/clients-activities',
    name: 'clientsActivities',
    component: () => import('@/views/ClientsActivities.vue'),
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'clientsActivities' })
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/my-sponsor',
    name: 'mySponsor',
    component: () => import('@/views/MySponsor.vue'),
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'mySponsor' })
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/gotopayment',
    name: 'gotopayment',
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next({
          name: 'cabinet',
          params: {
            openPaymentTab: true
          }
        })
      } else {
        store.dispatch('setEntryPoint', {
          name: 'cabinet',
          params: {
            openPaymentTab: true
          }
        })
        next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/indicators',
    name: 'indicators',
    props: true,
    component: () => import('@/views/MyIndicators.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'indicators' })
        next({
          name: 'login'
        })
      }
    },
    meta: {
      bottomMenuItem: 'home'
    }
  },
  {
    path: '/structure-control',
    name: 'structure-control',
    props: true,
    component: () => import('@/views/StructureControl.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'structure-control' })
        next({
          name: 'login'
        })
      }
    },
    meta: {
      bottomMenuItem: 'home'
    }
  },
  {
    path: '/orders-list',
    name: 'ordersList',
    props: true,
    component: () => import('@/views/OrdersList.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'ordersList' })
        next({
          name: 'login'
        })
      }
    },
    meta: {
      bottomMenuItem: 'home'
    }
  },
  {
    path: '/partner-card/:id',
    name: 'partnerCard',
    props: true,
    component: () => import('@/views/PartnerCard.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'indicators' })
        next({
          name: 'login'
        })
      }
    },
    meta: {
      bottomMenuItem: 'home'
    }
  },
  {
    path: '/my-partners',
    name: 'myPartners',
    props: true,
    component: () => import('@/views/MyPartners.vue'),
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/isSignedIn']) {
        next()
      } else {
        store.dispatch('setEntryPoint', { name: 'myPartners' })
        next({
          name: 'login'
        })
      }
    },
    meta: {
      bottomMenuItem: 'home'
    }
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/NotFound.vue')
  },
  {
    path: '*',
    redirect: { name: '404' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
