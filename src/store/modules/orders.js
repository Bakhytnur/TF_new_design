import APIService from '@/services/backendAPIService.js'

export const namespaced = true

const getDefaultState = () => {
  return {
    orderStatus: {
      success: false,
      isError: false,
      error: '',
      orderId: ''
    },
    preOrders: [],
    mainOrders: []
  }
}

export const state = getDefaultState()

export const mutations = {
  RESET_STATE(state) {
    Object.assign(state, getDefaultState())
  },
  SET_ORDERSTATUS(state, data) {
    state.orderStatus = {
      success: data.success || false,
      isError: data.isError || false,
      error: data.error || '',
      orderId: data.orderId || ''
    }
  },
  SET_PREORDERS(state, data) {
    state.preOrders = data
  },
  SET_MAINORDERS(state, data) {
    state.mainOrders = data
  }
}
export const actions = {
  resetState({ commit }) {
    commit('RESET_STATE')
  },
  placeOrder({ rootState, dispatch, commit }, orderData) {
    orderData.userId = rootState.user.userData.id
    orderData.sponsorId = rootState.user.userData.sponsorId
    orderData.cart = rootState.catalog.cartItems
    return APIService.placeOrder(orderData)
      .then((response) => {
        commit('SET_ORDERSTATUS', response.data)
        if (response.data.success) {
          dispatch('catalog/clearCart', null, { root: true })
        }
      })
      .catch((err) => {
        commit('SET_ORDERSTATUS', {
          isError: true,
          error: 'Ошибка при оформлении заказа на сервере'
        })
        console.log(err.response)
      })
  },
  getSponsorPreOrdersList({ rootState, commit }, numberOfMonths = 0) {
    return APIService.getSponsorPreOrdersList(
      rootState.user.userData.id,
      numberOfMonths
    )
      .then((response) => {
        if (response.data.isError) {
          console.log(response.data.error)
        } else if (
          Object.prototype.hasOwnProperty.call(response.data, 'documents')
        ) {
          commit('SET_PREORDERS', response.data.documents)
        }
      })
      .catch((err) => {
        console.log(err.response)
      })
  },
  getMainOrdersList({ rootState, commit }) {
    return APIService.getMainOrdersList(rootState.user.userData.id)
      .then((response) => {
        if (response.data.isError) {
          console.log(response.data.error)
        } else if (
          Object.prototype.hasOwnProperty.call(response.data, 'documents')
        ) {
          commit('SET_MAINORDERS', response.data.documents)
        }
      })
      .catch((err) => {
        console.log(err.response)
      })
  },
  confirmOrder({ rootState }, orderData) {
    return APIService.confirmOrder({
      userId: rootState.user.userData.id,
      ...orderData
    })
  },
  archiveOrder({ rootState }, orderId) {
    return APIService.archiveOrder({
      userId: rootState.user.userData.id,
      orderId
    })
  }
}
