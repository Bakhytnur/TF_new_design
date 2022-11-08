import APIService from '@/services/backendAPIService.js'

export const namespaced = true

const getDefaultState = () => {
  return {
    userData: {
      id: '',
      name: '',
      departmentName: '',
      image: '',
      phoneNumber: '',
      email: '',
      skype: '',
      telegram: '',
      whatsApp: '',
      viber: '',
      parentsList: [],
      infSponsorsList: []
    },
    distributorData: {
      clientsCount: 0,
      activeClientsCount: 0
    },
    orders: [],
    visitedProductsDownline: [],
    visitedArticlesDownline: [],
    visitedProducts: [],
    visitedArticles: [],
    activities: { new: [], old: [] }
  }
}

export const state = getDefaultState()

export const getters = {
  userData(state) {
    return state.userData
  },
  distributorData(state) {
    return state.distributorData
  },
  visitedArticlesDownline(state) {
    return state.visitedArticlesDownline
  },
  visitedProductsDownline(state) {
    return state.visitedProductsDownline
  },
  visitedArticles(state) {
    return state.visitedArticles
  },
  visitedProducts(state) {
    return state.visitedProducts
  }
}
export const mutations = {
  RESET_STATE(state) {
    Object.assign(state, getDefaultState())
  },
  SET_ORDERS(state, data) {
    state.orders = data
  },
  SET_USERIMAGE(state, image) {
    state.userData.image = image
  },
  SET_USERDATA(state, data) {
    state.userData.id = data.id || ''
    state.userData.name = data.name || ''
    state.userData.image = data.image || ''
    state.userData.phoneNumber = data.phoneNumber || ''
    state.userData.email = data.email || ''
    state.userData.skype = data.skype || ''
    state.userData.telegram = data.telegram || ''
    state.userData.whatsApp = data.whatsApp || ''
    state.userData.viber = data.viber || ''
    state.userData.parentsList = data.parentsList || []
    state.userData.infSponsorsList = data.infSponsorsList || []
  },
  SET_DISTRIBUTORDATA(state, data) {
    state.distributorData.clientsCount = data.clientsCount || 0
    state.distributorData.activeClientsCount = data.activeClientsCount || 0
  },
  SET_VISITEDPRODUCTSDOWNLINE(state, data) {
    state.visitedProductsDownline = data
  },
  SET_VISITEDARTICLESDOWNLINE(state, data) {
    state.visitedArticlesDownline = data
  },
  SET_VISITEDPRODUCTS(state, data) {
    state.visitedProducts = data
  },
  SET_VISITEDARTICLES(state, data) {
    state.visitedArticles = data
  },
  SET_ACTIVITIES(state, data) {
    state.activities.new = data.new || []
    state.activities.old = data.old || []
  }
}
export const actions = {
  resetState({ commit }) {
    commit('RESET_STATE')
  },
  getDownlineClientInfo({ commit }, id) {
    return APIService.getDownlineClientInfo(id)
      .then((response) => {
        if (response.data.isError) {
          console.log(response.data.error)
        } else {
          if (Object.prototype.hasOwnProperty.call(response.data, 'userInfo')) {
            commit('SET_USERDATA', response.data.userInfo)
          }
          if (
            Object.prototype.hasOwnProperty.call(
              response.data,
              'distributorInfo'
            )
          ) {
            commit('SET_DISTRIBUTORDATA', response.data.distributorInfo)
          }
        }
      })
      .catch((err) => {
        console.log(err.response)
      })
  },
  getDownlineClientOrders({ commit }, id) {
    return APIService.getDownlineClientOrders(id)
      .then((response) => {
        if (response.data.isError) {
          console.log(response.data.error)
        } else if (
          Object.prototype.hasOwnProperty.call(response.data, 'orders')
        ) {
          commit('SET_ORDERS', response.data.orders)
        }
      })
      .catch((err) => {
        console.log(err.response)
      })
  },
  setUserImage({ state, commit }, image) {
    commit('SET_USERIMAGE', image)
    APIService.uploadUserImage({ id: state.userData.id, image })
  },
  getVisitedProductsDownline({ state, commit }, numberOfMonths) {
    return APIService.getVisitedProductsDownline({
      userId: state.userData.id,
      numberOfMonths
    }).then((response) => {
      if (response.data.isError) {
        console.log(response.data.error)
      } else {
        if (Object.prototype.hasOwnProperty.call(response.data, 'products')) {
          commit('SET_VISITEDPRODUCTSDOWNLINE', response.data.products)
        }
      }
    })
  },
  getVisitedArticlesDownline({ state, commit }, numberOfMonths) {
    return APIService.getVisitedArticlesDownline({
      userId: state.userData.id,
      numberOfMonths
    }).then((response) => {
      if (response.data.isError) {
        console.log(response.data.error)
      } else {
        if (Object.prototype.hasOwnProperty.call(response.data, 'articles')) {
          commit('SET_VISITEDARTICLESDOWNLINE', response.data.articles)
        }
      }
    })
  },
  getVisitedProducts({ state, commit }, numberOfMonths) {
    return APIService.getVisitedProducts({
      userId: state.userData.id,
      numberOfMonths
    }).then((response) => {
      if (response.data.isError) {
        console.log(response.data.error)
      } else {
        if (Object.prototype.hasOwnProperty.call(response.data, 'products')) {
          commit('SET_VISITEDPRODUCTS', response.data.products)
        }
      }
    })
  },
  getVisitedArticles({ state, commit }, numberOfMonths) {
    return APIService.getVisitedArticles({
      userId: state.userData.id,
      numberOfMonths
    }).then((response) => {
      if (response.data.isError) {
        console.log(response.data.error)
      } else {
        if (Object.prototype.hasOwnProperty.call(response.data, 'articles')) {
          commit('SET_VISITEDARTICLES', response.data.articles)
        }
      }
    })
  },
  getActivities({ rootState, commit }) {
    return APIService.getClientsActivities(rootState.user.userData.id).then(
      (response) => {
        if (response.data.isError) {
          console.log(response.data.error)
        } else {
          if (
            Object.prototype.hasOwnProperty.call(response.data, 'activities')
          ) {
            commit('SET_ACTIVITIES', response.data.activities)
          }
        }
      }
    )
  },
  setActivitiesAcquaintance({ rootState }) {
    return APIService.setActivitiesAcquaintance(rootState.user.userData.id)
  }
}
