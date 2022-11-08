import APIService from '@/services/backendAPIService.js'

export const namespaced = true

const getDefaultState = () => {
  return {
    news: [],
    newsItem: {},
    attendedNewsIds: []
  }
}

export const state = getDefaultState()

export const mutations = {
  RESET_STATE(state) {
    Object.assign(state, getDefaultState())
  },
  SET_NEWSITEM(state, data) {
    state.newsItem = data
  },
  ADD_NEWS(state, data) {
    data.forEach((element) => {
      if (!state.news.find((el) => el.newsId === element.newsId)) {
        state.news.push(element)
      }
    })
  },
  ADD_ATTENDEDNEWSID(state, id) {
    if (!state.attendedNewsIds.find((el) => el === id)) {
      state.attendedNewsIds.push(id)
    }
  }
}
export const actions = {
  resetState({ commit }) {
    commit('RESET_STATE')
  },
  addAttendedNewsId({ commit }, id) {
    commit('ADD_ATTENDEDNEWSID', id)
  },
  fetchNews({ rootState, commit, state }, perPage) {
    const page = Math.floor(state.news.length / perPage) + 1
    const params = { page, perPage, userId: rootState.user.userData.id }
    return APIService.fetchNews(params)
      .then((response) => {
        if (!response.data.isError && response.data.newsList) {
          commit('ADD_NEWS', response.data.newsList)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  getNewsItemById({ state, commit }, newsId) {
    if (state.newsItem.newsId !== newsId) {
      let item = state.news.find((el) => {
        return el.newsId === newsId
      })
      if (item) {
        return APIService.fetchNewsItem(newsId)
          .then((response) => {
            if (
              !response.data.isError &&
              Object.prototype.hasOwnProperty.call(response.data, 'newsContent')
            ) {
              item.content = response.data.newsContent
              commit('SET_NEWSITEM', item)
            } else {
              commit('SET_NEWSITEM', {})
            }
          })
          .catch((err) => {
            console.log(err)
            commit('SET_NEWSITEM', {})
          })
      } else {
        commit('SET_NEWSITEM', {})
      }
    }
  }
}
