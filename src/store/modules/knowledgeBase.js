import APIService from '@/services/backendAPIService.js'
import { getFormattedDate } from '@/services/utilities.js'

function calcCounts(obj) {
  if (obj.children) {
    obj.children.forEach((element) => {
      calcCounts(element)
    })
    obj.count =
      obj.count +
      obj.children.reduce((acc, el) => {
        acc += el.count
        return acc
      }, 0)
  }
  obj.nameWithCount = obj.name + ' (' + obj.count + ')'
}

function getImage(articleId, thumbnails) {
  const thumbnailElement = thumbnails.find((el) => {
    return el.pl_post_id === articleId
  })
  if (thumbnailElement) {
    return thumbnailElement.pr_guid
  }
}

function fillArticlesData(state, data, thumbnails, fieldNamesFromJoin) {
  data.forEach((element) => {
    const articleId = fieldNamesFromJoin ? element.pl_id : element.ID
    const isFAQArticle = state.faqArticles.find((el) => {
      return el.id === articleId
    })
    if (!isFAQArticle) {
      let imageUrl = getImage(articleId, thumbnails)
      if (
        !state.articles.find(
          (elementArticles) => elementArticles.id === articleId
        )
      ) {
        let img = new Image()
        img.src = imageUrl
        state.preloadedImages.push(img)

        state.articles.push({
          id: articleId,
          title: fieldNamesFromJoin
            ? element.pl_post_title
            : element.post_title,
          date: fieldNamesFromJoin ? element.pl_post_date : element.post_date,
          image: imageUrl,
          formatted_date: getFormattedDate(
            fieldNamesFromJoin ? element.pl_post_date : element.post_date
          )
        })
      }
    }
  })
}

export const namespaced = true

const getDefaultState = () => {
  return {
    welcomeArticleTitle: 'Главная страница мобильного приложения',
    joinArticleTitle: 'Заявки на вступление',
    welcomeArticle: {},
    joinArticle: {},
    articles: [],
    allArticlesIdTitle: [],
    article: {},
    categories: {},
    faqId: 171,
    categoriesRaw: [],
    tags: [],
    currentTag: {},
    currentCategory: {},
    currentSearch: '',
    preloadedImages: [],
    faqArticles: []
  }
}

export const state = getDefaultState()

export const mutations = {
  RESET_STATE(state) {
    Object.assign(state, getDefaultState())
  },
  SET_WELCOMEARTICLE(state, data) {
    state.welcomeArticle = data
  },
  SET_JOINARTICLE(state, data) {
    state.joinArticle = data
  },
  SET_ARTICLES(state, { data, thumbnails, fieldNamesFromJoin }) {
    state.articles = []
    state.preloadedImages = []
    fillArticlesData(state, data, thumbnails, fieldNamesFromJoin)
  },
  ADD_ARTICLES(state, { data, thumbnails, fieldNamesFromJoin }) {
    fillArticlesData(state, data, thumbnails, fieldNamesFromJoin)
  },
  SET_FAQARTICLES(state, { data, add = false }) {
    if (add) {
      state.faqArticles = [...state.faqArticles, ...data]
    } else {
      state.faqArticles = data
    }
  },
  SET_CURRENTSEARCH(state, searchString) {
    state.currentSearch = searchString
  },
  SET_CURRENTCATEGORY(state, category) {
    state.currentCategory = category
  },
  SET_CURRENTTAG(state, tag) {
    state.currentTag = tag
  },
  SET_CATEGORIESRAW(state, { data, add = false }) {
    if (add) {
      state.categoriesRaw = [...state.categoriesRaw, ...data]
    } else {
      state.categoriesRaw = data
    }
  },
  SET_CATEGORIES(state, data) {
    state.categories = data
  },
  SET_TAGS(state, { data, add = false }) {
    if (add) {
      state.tags = [...state.tags, ...data]
    } else {
      state.tags = data
    }
    state.tags.sort((item1, item2) => {
      if (item1.name.toUpperCase() > item2.name.toUpperCase()) {
        return 1
      } else if (item1.name.toUpperCase() < item2.name.toUpperCase()) {
        return -1
      } else {
        return 0
      }
    })
  },
  SET_ARTICLE(state, data) {
    data.formatted_date = getFormattedDate(data.date)
    state.article = data
  },
  SET_FAQARTICLECONTENT(state, { id, content }) {
    const faqArticle = state.faqArticles.find((el) => {
      return el.id === id
    })
    if (faqArticle) {
      faqArticle.content = content
    }
  },
  SET_ALLARTICLESIDTITLE(state, { data, add, thumbnails }) {
    data.map((elData) => {
      const imageLink = thumbnails.find((elT) => {
        return elT.pl_post_id === elData.ID
      })
      elData.imageLink = imageLink ? imageLink.pr_guid : ''
    })
    if (add) {
      state.allArticlesIdTitle = [...state.allArticlesIdTitle, ...data]
    } else {
      state.allArticlesIdTitle = data
    }
  }
}

export const actions = {
  resetState({ commit }) {
    commit('RESET_STATE')
  },
  fetchJoinArticle({ state, commit }) {
    return APIService.fetchArticleByTitle(state.joinArticleTitle)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          return APIService.fetchArticle(response.data[0].ID)
            .then((response) => {
              commit('SET_JOINARTICLE', response.data)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchWelcomeArticle({ state, commit }) {
    return APIService.fetchArticleByTitle(state.welcomeArticleTitle)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          return APIService.fetchArticle(response.data[0].ID)
            .then((response) => {
              commit('SET_WELCOMEARTICLE', response.data)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchArticles({ state, commit }, page) {
    let fetchMethod
    let fetchParams = {}
    let fieldNamesFromJoin = false
    if (state.currentSearch) {
      fetchMethod = APIService.fetchArticlesBySearch
      fetchParams = { search: state.currentSearch, page }
      fieldNamesFromJoin = true
    } else if (state.currentCategory.id) {
      fetchMethod = APIService.fetchArticlesByFilter
      fetchParams = { filterId: state.currentCategory.id, page }
      fieldNamesFromJoin = true
    } else if (state.currentTag.id) {
      fetchMethod = APIService.fetchArticlesByFilter
      fetchParams = { filterId: state.currentTag.id, page }
      fieldNamesFromJoin = true
    } else {
      fetchMethod = APIService.fetchAllArticles
      fetchParams = { page }
    }
    return fetchMethod(fetchParams)
      .then((responseArticles) => {
        let articleIds = []
        responseArticles.data.forEach((element) => {
          articleIds.push(fieldNamesFromJoin ? element.pl_id : element.ID)
        })

        if (articleIds.length > 0) {
          return APIService.fetchTumnbnails(articleIds)
            .then((responseThumbnails) => {
              if (page === 1) {
                commit('SET_ARTICLES', {
                  data: responseArticles.data,
                  thumbnails: responseThumbnails.data,
                  fieldNamesFromJoin
                })
              } else {
                commit('ADD_ARTICLES', {
                  data: responseArticles.data,
                  thumbnails: responseThumbnails.data,
                  fieldNamesFromJoin
                })
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  setCurrentFilters({ commit }, { category, search, tag }) {
    commit('SET_CURRENTCATEGORY', category || { id: 0, name: 'Все рубрики' })
    commit('SET_CURRENTTAG', tag || { id: 0, name: 'Все тэги' })
    commit('SET_CURRENTSEARCH', search)
  },
  fetchFAQArticles({ commit, dispatch }, page = 0) {
    return APIService.fetchFAQArticles(page).then((response) => {
      if (response.data.length > 0) {
        let dataMapped = []
        response.data.forEach((element) => {
          let newEl = {}
          newEl.id = element.pl_id
          newEl.title = element.pl_post_title
          newEl.date = element.pl_post_date
          dataMapped.push(newEl)
        })

        commit('SET_FAQARTICLES', { data: dataMapped, add: page > 0 })
        if (response.data.length === 100) {
          return dispatch('fetchFAQArticles', page + 1)
        }
      }
    })
  },
  fetchCategoriesAndTags({ commit, dispatch }, page = 0) {
    return APIService.fetchCategoriesAndTags(page)
      .then((response) => {
        if (response.data.length > 0) {
          let dataMapped = []
          response.data.forEach((element) => {
            let newEl = {}
            newEl.id = element.pl_term_id
            newEl.name = element.pl_name
            newEl.taxonomy = element.pr_taxonomy
            newEl.parent = element.pr_parent
            newEl.count = element.pr_count
            dataMapped.push(newEl)
          })

          const newCategories = dataMapped.filter((el) => {
            return el.taxonomy === 'category'
          })
          if (newCategories) {
            commit('SET_CATEGORIESRAW', {
              data: newCategories,
              add: page > 0
            })
          }

          const newTags = dataMapped.filter((el) => {
            return el.taxonomy === 'post_tag'
          })
          if (newTags) {
            commit('SET_TAGS', { data: newTags, add: page > 0 })
          }
        }
        if (response.data.length === 100) {
          return dispatch('fetchCategoriesAndTags', page + 1)
        } else {
          return dispatch('transformCategoriesToTree')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  transformCategoriesToTree({ state, rootState, commit }) {
    let tmpCategories = state.categoriesRaw
    tmpCategories.push({ id: 0, parent: null, name: 'Все рубрики', count: 0 })

    const idMapping = tmpCategories.reduce((acc, el, i) => {
      acc[el.id] = i
      return acc
    }, {})

    let root
    tmpCategories.forEach((el) => {
      if (el.parent === null) {
        root = el
        return
      }
      // Use our mapping to locate the parent element in our data array
      const parentEl = tmpCategories[idMapping[el.parent]]
      if (
        el.id !== state.faqId &&
        (el.name !== 'Бизнес' || !!rootState.user.userData.id4Life)
      ) {
        //exclude FAQ for all and biz for non-distributors
        parentEl.children = [...(parentEl.children || []), el]
      }
    })
    calcCounts(root)
    commit('SET_CATEGORIES', root)
  },
  fetchCategories({ commit }) {
    return APIService.fetchCategories()
      .then((response) => {
        commit('SET_CATEGORIES', response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchTags({ commit, dispatch }, page = 1) {
    APIService.fetchTags(page)
      .then((response) => {
        if (page === 1) {
          commit('SET_TAGS', response.data)
        } else {
          commit('ADD_TAGS', response.data)
        }
        if (response.data.length === 100) {
          dispatch('fetchTags', page + 1)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  fetchFAQArticleContent({ commit }, id) {
    return APIService.fetchArticle(id).then((response) => {
      const content = response.data.content
      if (content) {
        commit('SET_FAQARTICLECONTENT', { id, content })
      }
    })
  },
  getArticleById({ state, rootState, commit }, articleId) {
    if (state.article.id === articleId) {
      return state.article
    } else {
      return APIService.fetchArticle(articleId)
        .then((response) => {
          let fetchedArticle = response.data
          fetchedArticle.formatted_date = getFormattedDate(fetchedArticle.date)

          return APIService.getPercentOfRead(
            rootState.user.userData.id,
            articleId
          )
            .then((response) => {
              if (response.data.isError) {
                fetchedArticle.percentOfRead = 0
              } else {
                fetchedArticle.percentOfRead = response.data.percent
              }
              commit('SET_ARTICLE', fetchedArticle)
            })
            .catch((err) => {
              fetchedArticle.percentOfRead = 0
              commit('SET_ARTICLE', fetchedArticle)
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  setPercentOfRead({ state, rootState, commit }, percent) {
    const currentArticle = state.article
    currentArticle.percentOfRead = percent
    commit('SET_ARTICLE', currentArticle)
    APIService.setPercentOfRead({
      userId: rootState.user.userData.id,
      articleId: state.article.id,
      percent
    })
  },
  fetchAllArticlesIdTitle({ commit, dispatch }, page = 0) {
    return APIService.fetchAllArticlesIdTitle(page).then((response) => {
      let articleIds = []
      response.data.forEach((element) => {
        articleIds.push(element.ID)
      })
      return APIService.fetchTumnbnails(articleIds).then(
        (responseThumbnails) => {
          commit('SET_ALLARTICLESIDTITLE', {
            data: response.data,
            add: page > 0,
            thumbnails: responseThumbnails.data
          })
          if (response.data.length === 100) {
            return dispatch('fetchAllArticlesIdTitle', page + 1)
          }
        }
      )
    })
  }
}
