import APIService from '@/services/backendAPIService.js'

export const namespaced = true

const getDefaultState = () => {
  return {
    products: [],
    categories: [],
    cartItems: [],
    fetchProductsError: '',
    cartError: ''
  }
}

export const state = getDefaultState()

export const mutations = {
  RESET_STATE(state) {
    Object.assign(state, getDefaultState())
  },
  SET_PRODUCTS(state, data) {
    state.products = data
  },
  SET_FETCHPRODUCTSERROR(state, data) {
    state.fetchProductsError = data
  },
  SET_CARTERROR(state, data) {
    state.cartError = data
  },
  SET_CATEGORIES(state, data) {
    state.categories = data
  },
  SET_CARTITEMS(state, cart) {
    state.cartItems = cart
  }
}

export const actions = {
  resetState({ commit }) {
    commit('RESET_STATE')
  },
  saveCart({ rootState, commit }, cart) {
    commit('SET_CARTITEMS', cart)
    APIService.saveCart(rootState.user.userData.id, cart)
      .then((response) => {
        if (response.data.isError) {
          commit('SET_CARTERROR', response.data.error)
        }
      })
      .catch((err) => {
        console.log(err)
        commit('SET_CARTERROR', err.response)
      })
  },
  fetchCart({ rootState, commit }) {
    return APIService.fetchCart(rootState.user.userData.id).then((response) => {
      if (response.data.isError) {
        commit('SET_CARTERROR', response.data.error)
      } else if (response.data.cart) {
        commit('SET_CARTITEMS', response.data.cart)
      } else {
        commit('SET_CARTERROR', 'Данные с сервера не получены')
      }
    })
  },
  addItemToCart({ state, dispatch }, item) {
    let newCart = state.cartItems
    const itemInCart = newCart.find((el) => {
      return el.productId === item.productId
    })
    if (itemInCart) {
      itemInCart.quantity += item.quantity
    } else {
      newCart.push(item)
    }
    dispatch('saveCart', newCart)
  },
  setItemQuantity({ state, dispatch }, { productId, quantity }) {
    let newCart = state.cartItems.map((el) => {
      if (el.productId === productId) {
        el.quantity = quantity
      }
      return el
    })
    dispatch('saveCart', newCart)
  },
  removeItemFromCart({ state, dispatch }, productId) {
    let newCart = state.cartItems.filter((el) => {
      return el.productId !== productId
    })
    dispatch('saveCart', newCart)
  },
  clearCart({ dispatch }) {
    dispatch('saveCart', [])
  },
  fetchProducts({ rootState, commit, dispatch }) {
    return APIService.fetchProducts(rootState.user.userData.id)
      .then((response) => {
        if (response.data.isError) {
          commit('SET_FETCHPRODUCTSERROR', response.data.error)
        } else if (response.data.products) {
          commit('SET_PRODUCTS', response.data.products)
          commit('SET_FETCHPRODUCTSERROR', '')
          dispatch('updateCategories')
        } else {
          commit('SET_FETCHPRODUCTSERROR', 'Данные с сервера не получены')
        }
      })
      .catch((err) => {
        console.log(err)
        commit('SET_FETCHPRODUCTSERROR', err.response)
      })
  },
  updateCategories({ state, commit }) {
    let cat = []
    state.products.forEach((element) => {
      const currentCat = {
        id: element.categoryId,
        name: element.categoryId ? element.categoryName : 'Без категории'
      }
      if (
        !cat.find((el) => {
          return el.id === element.categoryId
        })
      )
        cat.push(currentCat)
    })
    cat.sort((item1, item2) => {
      if (item1.id && item2.id) {
        return 0
      } else if (item1.id) {
        return -1
      } else {
        return 1
      }
    })
    commit('SET_CATEGORIES', cat)
  },
  getItemById({ state }, id) {
    return state.products.find((el) => {
      return el.productId === id
    })
  },
  setVisitedProduct({ rootState }, productId) {
    return APIService.setVisitedProduct({
      userId: rootState.user.userData.id,
      productId
    })
  }
}
