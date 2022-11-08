import APIService from '@/services/backendAPIService.js'

export const namespaced = true

const getDefaultState = () => {
  return {
    subscriptions: [],
    paymentObject: {},
    paymentStatus: '',
    paymentError: '',
    trustPayment: {
      cost: 0,
      duration: 0
    }
  }
}

export const state = getDefaultState()

export const mutations = {
  RESET_STATE(state) {
    Object.assign(state, getDefaultState())
  },
  SET_PAYMENTOBJECT(state, obj) {
    state.paymentObject = obj || {}
  },
  SET_PAYMENTERROR(state, err) {
    state.paymentError = err || ''
  },
  SET_SUBSCRIPTIONS(state, data) {
    state.subscriptions = data
  },
  SET_PAYMENTSTATUS(state, status) {
    state.paymentStatus = status
  },
  SET_TRUSTPAYMENT(state, { cost, duration }) {
    state.trustPayment = {
      cost: cost || 0,
      duration: duration || 0
    }
  }
}
export const actions = {
  resetState({ commit }) {
    commit('RESET_STATE')
  },
  getSubscriptions({ rootState, commit }) {
    return APIService.getSubscriptions(rootState.user.userData.id).then(
      (response) => {
        if (
          !response.data.isError &&
          Object.prototype.hasOwnProperty.call(response.data, 'subscriptions')
        ) {
          commit('SET_SUBSCRIPTIONS', response.data.subscriptions)
          commit('SET_TRUSTPAYMENT', response.data.trustPayment)
        }
      }
    )
  },
  startPayment({ commit, rootState }, params) {
    params.userName = rootState.user.userData.name
    params.userId = rootState.user.userData.id
    //...userName, userId, variantId
    return APIService.startPayment(params)
      .then((res) => {
        if (res.data.isError) {
          commit('SET_PAYMENTERROR', res.data.error)
          commit('SET_PAYMENTOBJECT', {})
        } else {
          commit('SET_PAYMENTOBJECT', res.data.payment)
          commit('SET_PAYMENTERROR', '')
        }
      })
      .catch((err) => {
        commit('SET_PAYMENTOBJECT', {})
        commit('SET_PAYMENTERROR', err.response)
      })
  },
  getPaymentStatus({ commit, rootState }) {
    const params = {
      userId: rootState.user.userData.id
    }
    return APIService.getPaymentStatus(params)
      .then((response) => {
        if (
          !response.data.isError &&
          Object.prototype.hasOwnProperty.call(response.data, 'status')
        ) {
          commit('SET_PAYMENTSTATUS', response.data.status)
        } else {
          commit('SET_PAYMENTSTATUS', 'error')
        }
      })
      .catch((err) => {
        console.log(err)
        commit('SET_PAYMENTSTATUS', 'error')
      })
  },
  activateTrustPayment({ rootState }) {
    const params = {
      userId: rootState.user.userData.id
    }
    return APIService.activateTrustPayment(params).catch((err) => {
      console.log(err)
    })
  }
}
