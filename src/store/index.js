import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user.js'
import * as knowledgeBase from '@/store/modules/knowledgeBase.js'
import * as catalog from '@/store/modules/catalog.js'
import * as orders from '@/store/modules/orders.js'
import * as news from '@/store/modules/news.js'
import * as payment from '@/store/modules/payment.js'
import * as downlineClient from '@/store/modules/downlineClient.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    knowledgeBase,
    catalog,
    orders,
    news,
    payment,
    downlineClient
  },
  state: {
    offer: '',
    entryPoint: { name: '', params: {} },
    notificationsView: false
  },
  getters: {
    getEntryPoint(state) {
      return state.entryPoint
    }
  },
  mutations: {
    SET_OFFER(state, offer) {
      state.offer = offer
    },
    SET_ENTRYPOINT(state, { name, params }) {
      state.entryPoint.name = name
      state.entryPoint.params = params
    },
    SET_NOTIFICATIONS_VIEW(state, flag) {
      state.notificationsView = flag
    }
  },
  actions: {
    loadOffer({ commit }, value) {
      commit('SET_OFFER', value)
    },
    setEntryPoint({ commit }, { name, params = {} }) {
      commit('SET_ENTRYPOINT', { name, params })
    }
  }
})
