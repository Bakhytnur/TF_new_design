import APIService from '@/services/backendAPIService.js'
import { periodNames, getPeriodString } from '@/services/utilities.js'

export const namespaced = true

const getDefaultState = () => {
  return {
    userAuth: {
      clientId: '',
      pinCode: '',
      phoneNumber: ''
    },
    fetchingUserInfoStatus: {
      success: false,
      isError: false,
      error: ''
    },
    signupUserStatus: {
      success: false,
      isError: false,
      error: ''
    },
    userData: {
      id: '',
      name: '',
      fio: '',
      id4Life: '',
      sponsorId: '',
      departmentId: '',
      departmentName: '',
      phoneNumber: '',
      newsLastVisit: '',
      notifyNewNews: false,
      image: '',
      email: '',
      skype: '',
      telegram: '',
      whatsApp: '',
      viber: '',
      departments: [],
      deliveryIntervals: [],
      parentsList: [],
      infSponsorsList: []
    },
    distributorData: {
      LP: 0,
      LPInReport: 0,
      LPDownline: 0,
      LPDownlineInReport: 0,
      accountBalance: 0,
      ordersCount: 0,
      referralQRCode: '',
      clientsCount: 0,
      activeClientsCount: 0,
      allClients: [],
      ordersAutoPlacing: false
    },
    sponsorData: {
      id: '',
      name: '',
      fio: '',
      departmentName: '',
      image: '',
      phoneNumber: '',
      email: '',
      skype: '',
      telegram: '',
      whatsApp: '',
      viber: ''
    },
    subscriptionInfo: {
      status: false,
      expirationDate: '',
      trustPaymentStatus: false,
      trustPaymentEndDate: '',
      trustPaymentIsAvailable: false
    },
    sponsorSubscriptionInfo: {
      status: false,
      expirationDate: '',
      trustPaymentStatus: false,
      trustPaymentEndDate: '',
      trustPaymentIsAvailable: false
    },
    newsAttended: false,
    referralId: '',
    visitedProductsDownline: [],
    visitedArticlesDownline: [],
    visitedProducts: [],
    visitedArticles: [],
    requestsToJoin: [],
    requestToJoinStatus: { isOk: false, message: '' },
    accountTransactions: [],
    downlineTree: {},
    notifications: { new: [], old: [] },
    notificationSubscriptionExpire: { show: false, text: '' },
    clientHash: ''
  }
}

const getSubscriptionExpirationNotification = (subscriptionInfo, userData) => {
  const notificationResult = { show: false, text: '' }
  if (subscriptionInfo.status) {
    const dateNow = new Date()
    const dateEndSubString =
      subscriptionInfo.expirationDate.slice(-4) +
      '-' +
      subscriptionInfo.expirationDate.substring(3, 5) +
      '-' +
      subscriptionInfo.expirationDate.substring(0, 2)

    const dateEndSub = new Date(dateEndSubString)
    const daysToExpire = Math.round((dateEndSub - dateNow) / (1000 * 3600 * 24))
    const daysToExpireName = getPeriodString(daysToExpire, periodNames.day)
    if (daysToExpire < 8) {
      notificationResult.show = true
      notificationResult.text = `Внимание! Бизнес-версия закончится ${state.subscriptionInfo.expirationDate}. Осталось ${daysToExpire} ${daysToExpireName}`
    }
  } else if (userData.id4Life) {
    notificationResult.show = true
    notificationResult.text =
      'Бизнес-версия не оплачена. Для возобновления работы перейдите к оплате'
  }
  return notificationResult
}

export const state = getDefaultState()

export const getters = {
  isSignedIn(state) {
    return (
      state.fetchingUserInfoStatus.success &&
      !state.fetchingUserInfoStatus.isError
    )
  },
  isSignedUp(state) {
    return state.signupUserStatus.success && !state.signupUserStatus.isError
  },
  isDistributor(state) {
    return !!state.userData.id4Life
  },
  isPaidVersion(state) {
    return (
      state.subscriptionInfo.status || state.subscriptionInfo.trustPaymentStatus
    )
  },
  isSponsorPaidVersion(state) {
    return (
      state.sponsorSubscriptionInfo.status ||
      state.sponsorSubscriptionInfo.trustPaymentStatus
    )
  },
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
  },
  isUserTrustPaymentPeriod() {
    return state.subscriptionInfo.trustPaymentStatus
  },
  isSponsorTrustPaymentPeriod() {
    return state.sponsorSubscriptionInfo.trustPaymentStatus
  },
  isAvailableUserTrustPayment() {
    return state.subscriptionInfo.trustPaymentIsAvailable
  },
  isAvailableSponsorTrustPayment() {
    return state.sponsorSubscriptionInfo.trustPaymentIsAvailable
  }
}
export const mutations = {
  RESET_STATE(state) {
    const clientHash = state.clientHash
    Object.assign(state, getDefaultState())
    state.clientHash = clientHash
  },
  SET_CLIENTHASH(state, clientHash) {
    state.clientHash = clientHash.toString()
  },
  SET_NEWSATTENDED(state) {
    state.newsAttended = true
  },
  SET_REFERRALID(state, referralId) {
    state.referralId = referralId
  },
  SET_SPONSORDATA(state, sponsorData) {
    state.sponsorData.id = sponsorData.id || ''
    state.sponsorData.name = sponsorData.name || ''
    state.sponsorData.fio = sponsorData.fio || ''
    state.sponsorData.departmentName = sponsorData.departmentName || ''
    state.sponsorData.image = sponsorData.image || ''
    state.sponsorData.phoneNumber = sponsorData.phoneNumber || ''
    state.sponsorData.email = sponsorData.email || ''
    state.sponsorData.skype = sponsorData.skype || ''
    state.sponsorData.telegram = sponsorData.telegram || ''
    state.sponsorData.whatsApp = sponsorData.whatsApp || ''
    state.sponsorData.viber = sponsorData.viber || ''
  },
  SET_USERDATA(state, userData) {
    // userData.newsLastVisit = Utilities.getFormattedDate(userData.newsLastVisit)
    state.userData.id = userData.id || ''
    state.userData.name = userData.name || ''
    state.userData.fio = userData.fio || ''
    state.userData.id4Life = userData.id4Life || ''
    state.userData.sponsorId = userData.sponsorId || ''
    state.userData.departmentId = userData.departmentId || ''
    state.userData.departmentName = userData.departmentName || ''
    state.userData.phoneNumber = userData.phoneNumber || ''
    state.userData.newsLastVisit = userData.newsLastVisit || ''
    state.userData.notifyNewNews = userData.notifyNewNews || false
    state.userData.image = userData.image || ''
    state.userData.email = userData.email || ''
    state.userData.skype = userData.skype || ''
    state.userData.telegram = userData.telegram || ''
    state.userData.whatsApp = userData.whatsApp || ''
    state.userData.viber = userData.viber || ''
    state.userData.departments = userData.departments || []
    state.userData.deliveryIntervals = userData.deliveryIntervals || []
    state.userData.parentsList = userData.parentsList || []
    state.userData.infSponsorsList = userData.infSponsorsList || []
  },
  SET_DISTRIBUTORDATA(state, distributorData) {
    state.distributorData.LP = +distributorData.LP || 0
    state.distributorData.LPInReport = +distributorData.LPInReport || 0
    state.distributorData.LPDownline = +distributorData.LPDownline || 0
    state.distributorData.LPDownlineInReport =
      +distributorData.LPDownlineInReport || 0
    state.distributorData.accountBalance = +distributorData.accountBalance || 0
    state.distributorData.ordersCount = +distributorData.ordersCount || 0
    state.distributorData.referralQRCode = distributorData.referralQRCode || ''
    state.distributorData.clientsCount = +distributorData.clientsCount || 0
    state.distributorData.activeClientsCount =
      +distributorData.activeClientsCount || 0
    state.distributorData.allClients = distributorData.allClients || []
    state.distributorData.ordersAutoPlacing =
      distributorData.ordersAutoPlacing || false
  },
  SET_USERAUTH(state, userAuth) {
    state.userAuth.clientId = userAuth.clientId || ''
    state.userAuth.phoneNumber = userAuth.phoneNumber || ''
    state.userAuth.pinCode = userAuth.pinCode || ''
  },
  SET_FETCHINGUSERINFOSTATUS(state, { success, isError, error }) {
    state.fetchingUserInfoStatus.success = success || false
    state.fetchingUserInfoStatus.isError = isError || false
    state.fetchingUserInfoStatus.error = error || ''
  },
  SET_SIGNUPUSERSTATUS(state, { success, isError, error }) {
    state.signupUserStatus.success = success || false
    state.signupUserStatus.isError = isError || false
    state.signupUserStatus.error = error || ''
  },
  SET_SUBSCRIPTIONINFO(state, subscriptionInfo) {
    state.subscriptionInfo.status = subscriptionInfo.status || false
    state.subscriptionInfo.expirationDate =
      subscriptionInfo.expirationDate || ''
    state.subscriptionInfo.trustPaymentStatus =
      subscriptionInfo.trustPaymentStatus || false
    state.subscriptionInfo.trustPaymentEndDate =
      subscriptionInfo.trustPaymentEndDate || ''
    state.subscriptionInfo.trustPaymentIsAvailable =
      subscriptionInfo.trustPaymentIsAvailable || false

    state.notificationSubscriptionExpire =
      getSubscriptionExpirationNotification(
        state.subscriptionInfo,
        state.userData
      )
  },
  SET_SPONSORSUBSCRIPTIONINFO(state, subscriptionInfo) {
    state.sponsorSubscriptionInfo.status = subscriptionInfo.status || false
    state.sponsorSubscriptionInfo.expirationDate =
      subscriptionInfo.expirationDate || ''
    state.sponsorSubscriptionInfo.trustPaymentStatus =
      subscriptionInfo.trustPaymentStatus || false
    state.sponsorSubscriptionInfo.trustPaymentEndDate =
      subscriptionInfo.trustPaymentEndDate || ''
    state.sponsorSubscriptionInfo.trustPaymentIsAvailable =
      subscriptionInfo.trustPaymentIsAvailable || false
  },
  SET_USERIMAGE(state, image) {
    state.userData.image = image
  },
  SET_CONTACTINFO(state, contactInfo) {
    contactInfo.forEach((element) => {
      state.userData[element.name] = element.value
    })
  },
  SET_INFSPONSORS(state, sponsors) {
    state.userData.infSponsorsList = sponsors
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
  SET_REQUESTSTOJOIN(state, data) {
    state.requestsToJoin = data
  },
  SET_REQUESTTOJOINSTATUS(state, { isOk, message }) {
    state.requestToJoinStatus.isOk = isOk
    state.requestToJoinStatus.message = message
  },
  SET_ACCOUNTTRANSACTIONS(state, data) {
    state.accountTransactions = data
  },
  SET_DOWNLINETREE(state, data) {
    state.downlineTree = data
  },
  SET_NOTIFICATIONS(state, data) {
    state.notifications.old = data.old || []
    state.notifications.new = data.new || []
  }
}
export const actions = {
  setClientHash({ commit }, clientHash) {
    commit('SET_CLIENTHASH', clientHash)

    localStorage.setItem(
      `tf_${process.env.VUE_APP_SERVER_ID}_clientHash`,
      clientHash
    )
  },
  setNewsAttended({ commit }) {
    commit('SET_NEWSATTENDED')
  },
  setReferralId({ commit }, value) {
    commit('SET_REFERRALID', value)
  },
  performLogOut({ commit, dispatch }) {
    localStorage.removeItem(`tf_${process.env.VUE_APP_SERVER_ID}_userAuth`)
    commit('RESET_STATE')
    dispatch('catalog/resetState', null, { root: true })
    dispatch('downlineClient/resetState', null, { root: true })
    dispatch('knowledgeBase/resetState', null, { root: true })
    dispatch('news/resetState', null, { root: true })
    dispatch('orders/resetState', null, { root: true })
    dispatch('payment/resetState', null, { root: true })
  },
  signupUser({ commit }, userSignupData) {
    return APIService.signupUser(userSignupData)
      .then((response) => {
        if (response.data.isError) {
          commit('SET_SIGNUPUSERSTATUS', {
            success: true,
            isError: true,
            error: response.data.error
          })
        } else if (response.data.signupSuccess) {
          commit('SET_SIGNUPUSERSTATUS', {
            success: true,
            isError: false,
            error: ''
          })
        } else {
          commit('SET_SIGNUPUSERSTATUS', {
            success: true,
            isError: true,
            error: response.data
          })
        }
      })
      .catch((err) => {
        commit('SET_SIGNUPUSERSTATUS', {
          success: false,
          isError: true,
          error: err.response
        })
        console.log(err)
      })
  },
  fetchUserInfo({ commit, state, dispatch, getters }, payload) {
    commit('SET_USERAUTH', payload)
    return APIService.fetchUserInfo({
      ...state.userAuth,
      clientHash:
        payload.clientHash === undefined ? state.clientHash : payload.clientHash
    })
      .then((response) => {
        if (response.data.isError) {
          commit('SET_FETCHINGUSERINFOSTATUS', {
            success: true,
            isError: true,
            error: response.data.error
          })
        } else if (response.data.userData === undefined) {
          commit('SET_FETCHINGUSERINFOSTATUS', {
            success: true,
            isError: true,
            error: 'Данные о пользователе не получены'
          })
        } else {
          commit('SET_USERDATA', response.data.userData)
          commit('SET_DISTRIBUTORDATA', response.data.distributorData || {})
          commit('SET_SPONSORDATA', response.data.sponsorData || {})
          commit('SET_FETCHINGUSERINFOSTATUS', {
            success: true,
            isError: false,
            error: ''
          })
          localStorage.setItem(
            `tf_${process.env.VUE_APP_SERVER_ID}_userAuth`,
            JSON.stringify(state.userAuth)
          )

          dispatch('catalog/fetchCart', null, { root: true })
          dispatch('getNotificationsList')
          dispatch('getClientBillingStatus')
          if (getters.isDistributor) {
            dispatch('getRequestsToJoinList')
          }
        }
      })
      .catch((err) => {
        commit('SET_FETCHINGUSERINFOSTATUS', {
          success: false,
          isError: true,
          error: err.response
        })
        console.log(err)
      })
  },
  getClientBillingStatus({ state, commit }) {
    const params = {
      userId: state.userData.id,
      sponsorId: state.userData.sponsorId
    }
    return APIService.getClientBillingStatus(params)
      .then((response) => {
        if (response.data.isError) {
          console.log(response.data.error)
        } else {
          if (
            Object.prototype.hasOwnProperty.call(
              response.data,
              'subscriptionInfo'
            )
          ) {
            commit('SET_SUBSCRIPTIONINFO', response.data.subscriptionInfo)
          }
          if (
            Object.prototype.hasOwnProperty.call(
              response.data,
              'subscriptionInfoSponsor'
            )
          ) {
            commit(
              'SET_SPONSORSUBSCRIPTIONINFO',
              response.data.subscriptionInfoSponsor
            )
          }
        }
      })
      .catch((err) => console.log(err))
  },
  setUserImage({ state, commit }, image) {
    commit('SET_USERIMAGE', image)
    APIService.uploadUserImage({ id: state.userData.id, image })
  },
  saveContactInfo({ state, commit }, contactInfo) {
    commit('SET_CONTACTINFO', contactInfo)
    return APIService.saveContactInfo({
      userId: state.userData.id,
      contactInfo
    })
  },
  saveInfSponsors({ state, commit }, sponsors) {
    commit('SET_INFSPONSORS', sponsors)
    return APIService.saveInfSponsors({
      userId: state.userData.id,
      sponsors
    })
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
  getRequestsToJoinList({ state, commit }) {
    return APIService.requestsToJoinGetList(state.userData.id).then(
      (response) => {
        if (response.data.isError) {
          console.log(response.data.error)
        } else {
          if (Object.prototype.hasOwnProperty.call(response.data, 'requests')) {
            commit('SET_REQUESTSTOJOIN', response.data.requests)
          }
        }
      }
    )
  },
  sendRequestToJoin({ state, commit }, phoneNumber) {
    return APIService.requestsToJoinAddNew({
      userId: state.userData.id,
      phoneNumber
    })
      .then((response) => {
        if (response.data.isError) {
          commit('SET_REQUESTTOJOINSTATUS', {
            isOk: false,
            message: 'Произошла ошибка. ' + response.data.error
          })
        } else {
          if (Object.prototype.hasOwnProperty.call(response.data, 'success')) {
            commit('SET_REQUESTTOJOINSTATUS', {
              isOk: true,
              message: 'Заявка успешно отправлена.'
            })
          } else {
            commit('SET_REQUESTTOJOINSTATUS', {
              isOk: false,
              message: 'Произошла ошибка. Попробуйте повторить запрос позже.'
            })
          }
        }
      })
      .catch(() => {
        commit('SET_REQUESTTOJOINSTATUS', {
          isOk: false,
          message: 'Произошла ошибка. Попробуйте повторить запрос позже.'
        })
      })
  },
  setSeenRequestsToJoin({ state }) {
    APIService.requestsToJoinSetSeen({
      userId: state.userData.id
    })
  },
  requestsToJoinSetNotVisible(context, userId) {
    return APIService.requestsToJoinSetNotVisible({
      userId
    })
  },
  getAccountTransactions({ state, commit }) {
    return APIService.getAccountTransactions(state.userData.id).then(
      (response) => {
        if (response.data.isError) {
          console.log(response.data.error)
        } else {
          if (
            Object.prototype.hasOwnProperty.call(response.data, 'transactions')
          ) {
            commit('SET_ACCOUNTTRANSACTIONS', response.data.transactions)
          }
        }
      }
    )
  },
  getDownlineTree({ state, commit }) {
    return APIService.getDownline(state.userData.id).then((response) => {
      if (response.data.isError) {
        console.log(response.data.error)
      } else {
        if (Object.prototype.hasOwnProperty.call(response.data, 'downline')) {
          let tmpData = [...response.data.downline]
          tmpData.push({
            id: state.userData.id,
            parent: null,
            name: 'Корень',
            level: 0
          })

          const idMapping = tmpData.reduce((acc, el, i) => {
            acc[el.id] = i
            return acc
          }, {})

          let root
          tmpData.forEach((el) => {
            if (el.parent === null) {
              root = el
              return
            }
            const parentEl = tmpData[idMapping[el.parent]]
            parentEl.children = [...(parentEl.children || []), el]
          })
          commit('SET_DOWNLINETREE', root)
        }
      }
    })
  },
  getNotificationsList({ state, commit }) {
    return APIService.getNotificationsList(state.userData.id).then(
      (response) => {
        if (response.data.isError) {
          console.log(response.data.error)
        } else {
          if (
            Object.prototype.hasOwnProperty.call(response.data, 'notifications')
          ) {
            commit('SET_NOTIFICATIONS', response.data.notifications)
          }
        }
      }
    )
  },
  setNotificationsAcquaintance({ state, dispatch }, params) {
    const notificationIds = []
    state.notifications.new.forEach((el) => {
      if (
        params.types.indexOf(el.type) !== -1 &&
        (!params.objectId || el.objectId === params.objectId)
      ) {
        notificationIds.push(el.id)
      }
    })
    if (notificationIds.length === 0) {
      return
    }
    return APIService.setNotificationsAcquaintance({
      userId: state.userData.id,
      notificationIds: notificationIds.join()
    }).then((response) => {
      if (response.data.isError) {
        console.log(response.data.error)
      } else {
        dispatch('getNotificationsList')
      }
    })
  },
  setUserDiscount({ state, dispatch }, params) {
    return APIService.setUserDiscount(params).then((response) => {
      if (response.data.isError) {
        console.log(response.data.error)
      } else {
        return dispatch('fetchUserInfo', state.userAuth)
      }
    })
  },
  setOrdersAutoPlacing({ state, dispatch }, params) {
    return APIService.setOrdersAutoPlacing({
      userId: state.userData.id,
      ...params
    }).then((response) => {
      if (response.data.isError) {
        console.log(response.data.error)
      } else {
        return dispatch('fetchUserInfo', state.userAuth)
      }
    })
  }
}
