import axios from 'axios'

const apiClient1C = axios.create({
  baseURL: `https://www.tfapps.ru/base/${process.env.VUE_APP_SERVER_ID}/hs/Tfb`,
  withCredentials: false,
  auth: { username: 'mobileapp', password: 'gREs5He73rtSD' },
  timeout: 20000
})

const apiClientWP = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' &&
    process.env.VUE_APP_SERVER_ID !== 'rc001'
      ? `https://www.tfapps.ru/kb/${process.env.VUE_APP_SERVER_ID}/wp-json/wp/v2`
      : 'https://www.tfapps.ru/kb/rc52/wp-json/wp/v2',
  withCredentials: false,
  auth: { username: 'rixap', password: 'Null234E' },
  timeout: 20000
})

const apiClientKB = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? `https://www.tfapps.ru/kb/${process.env.VUE_APP_SERVER_ID}/sqapi`
      : 'https://www.tfapps.ru/kb/rc52/sqapi',
  withCredentials: false,
  auth: { username: 'apiconn', password: 'Ryjgrf99' },
  timeout: 20000
})

export default {
  // users
  fetchUserInfo(userData) {
    return apiClient1C.post('/users/checkUser', userData)
  },
  signupUser(userData) {
    return apiClient1C.post('/users/signup', userData)
  },
  sendUserPin(userId) {
    return apiClient1C.post('/users/sendPin', userId)
  },
  uploadUserImage(data) {
    return apiClient1C.post('/users/uploadImage', data)
  },

  saveContactInfo(params) {
    return apiClient1C.post('/users/saveContactInfo', params)
  },

  saveInfSponsors(params) {
    return apiClient1C.post('/users/saveInfSponsors', params)
  },

  getAccountTransactions(userId) {
    return apiClient1C.get(`/users/getAccountTransactions?userId=${userId}`)
  },

  getDownline(userId) {
    return apiClient1C.get(`/users/getDownline?userId=${userId}`)
  },

  setUserDiscount(params) {
    return apiClient1C.post('/users/setUserDiscount', params)
  },

  setOrdersAutoPlacing(params) {
    return apiClient1C.post('/users/setOrdersAutoPlacing', params)
  },

  // products
  fetchProducts(userId) {
    return apiClient1C.get(`/products/getList?userId=${userId}`)
  },
  saveCart(userId, cart) {
    return apiClient1C.post('/products/setCart', { userId, cart })
  },
  fetchCart(userId) {
    return apiClient1C.get(`/products/getCart?userId=${userId}`)
  },
  setVisitedProduct(params) {
    return apiClient1C.post('/products/setVisited', params)
  },
  getVisitedProductsDownline(params) {
    return apiClient1C.get(
      `/products/getVisitedDownline?userId=${params.userId}&numberOfMonths=${params.numberOfMonths}`
    )
  },
  getVisitedProducts(params) {
    return apiClient1C.get(
      `/products/getVisited?userId=${params.userId}&numberOfMonths=${params.numberOfMonths}`
    )
  },

  // knowledge base 1c
  getPercentOfRead(userId, articleId) {
    return apiClient1C.get(
      `/articles/getPercentOfRead?userId=${userId}&articleId=${articleId}`
    )
  },
  setPercentOfRead(params) {
    //userId, articleId, percent
    return apiClient1C.post('/articles/setPercentOfRead', params)
  },
  getVisitedArticlesDownline(params) {
    return apiClient1C.get(
      `/articles/getVisitedDownline?userId=${params.userId}&numberOfMonths=${params.numberOfMonths}`
    )
  },
  getVisitedArticles(params) {
    return apiClient1C.get(
      `/articles/getVisited?userId=${params.userId}&numberOfMonths=${params.numberOfMonths}`
    )
  },

  // knowledge base wp
  fetchArticles(params) {
    let wpParams = '/posts?_embed&context=embed'
    wpParams = wpParams + '&per_page=' + (params.perPage ? params.perPage : 3)
    wpParams = wpParams + '&page=' + (params.page ? params.page : 3)
    if (params.tag.id) {
      wpParams = wpParams + '&tags=' + params.tag.id
    } else if (params.searchString) {
      wpParams = wpParams + '&search=' + params.searchString
    } else if (params.category.id) {
      wpParams = wpParams + '&categories=' + params.category.id
    }
    return apiClientWP.get(wpParams)
  },
  fetchArticle(articleId) {
    return apiClientWP.get('/posts/' + articleId + '?_embed')
  },
  fetchCategories() {
    return apiClientWP.get('/categories?hide_empty=1&per_page=100')
  },
  fetchTags(page) {
    return apiClientWP.get(`/tags?hide_empty=1&per_page=100&page=${page}`)
  },

  // new interface
  fetchArticleByTitle(title) {
    return apiClientKB.get(
      `/api/wp_posts?_where=(post_title,like,${title}~)~and(post_status,eq,publish)~and(post_type,eq,post)`
    )
  },
  fetchCategoriesAndTags(page = 0) {
    return apiClientKB.get(
      `/api/xjoin?_join=pl.wp_terms,_j,pr.wp_term_taxonomy&_on1=(pl.term_id,eq,pr.term_id)&_fields=pl.term_id,pl.name,pr.taxonomy,pr.parent,pr.count&_size=100&_p=${page}`
    )
  },
  fetchAllArticles({ page = 1 }) {
    return apiClientKB.get(
      `/api/wp_posts?_where=(post_status,eq,publish)&_sort=-post_date&_size=20&_p=${
        page - 1
      }`
    )
  },
  fetchAllArticlesIdTitle(page = 0) {
    return apiClientKB.get(
      `/api/wp_posts?_fields=ID,post_title&_where=(post_status,eq,publish)&_size=100&_p=${page}`
    )
  },

  fetchFAQArticles({ page = 1 }) {
    return apiClientKB.get(
      `/api/xjoin?_join=pl.wp_posts,_j,pr.wp_term_relationships&_on1=(pl.id,eq,pr.object_id)&_fields=pl.id,pl.post_title,pl.post_date&_where=(pr.term_taxonomy_id,eq,171)~and(pl.post_status,eq,publish)&_size=100&_p=${
        page - 1
      }`
    )
  },
  fetchArticlesBySearch({ search, page = 1 }) {
    return apiClientKB.get(
      `/api/xjoin?_join=pl.wp_posts,_j,pr.wp_term_relationships&_on1=(pl.id,eq,pr.object_id)&_fields=pl.id,pl.post_title,pl.post_date&_where=(pl.post_status,eq,publish)~and((pl.post_title,like,~${search}~)~or(pl.post_content,like,~${search}~))&_sort=-pl.post_date&_size=20&_p=${
        page - 1
      }`
    )
    // return apiClientKB.get(
    //   `/api/wp_posts?_where=(post_status,eq,publish)~and((post_title,like,~${search}~)~or(post_content,like,~${search}~))&_size=20&_p=${page -
    //     1}`
    // )
  },
  fetchTumnbnails(postIds) {
    return apiClientKB.get(
      `/api/xjoin?_join=pl.wp_postmeta,_j,pr.wp_posts&_on1=(pl.meta_value,eq,pr.ID)&_fields=pl.post_id,pr.guid&_where=(pl.post_id,in,${postIds})~and(pl.meta_key,eq,_thumbnail_id)`
    )
  },
  fetchArticlesByFilter({ filterId, page = 1 }) {
    return apiClientKB.get(
      `/api/xjoin?_join=pl.wp_posts,_j,pr.wp_term_relationships&_on1=(pl.id,eq,pr.object_id)&_fields=pl.id,pl.post_title,pl.post_date&_where=(pr.term_taxonomy_id,eq,${filterId})~and(pl.post_status,eq,publish)&_sort=-pl.post_date&_size=20&_p=${
        page - 1
      }`
    )
  },

  //news
  fetchNews({ page = 1, perPage = 20, userId }) {
    return apiClient1C.get(
      `/news/getList?userId=${userId}&page=${page}&perPage=${perPage}`
    )
  },
  fetchNewsItem(newsId) {
    return apiClient1C.get(`/news/getNewsContent?newsId=${newsId}`)
  },

  //billing
  getSubscriptions(userId) {
    return apiClient1C.get(`/payment/getSubscriptions?userId=${userId}`)
  },

  startPayment(params) {
    return apiClient1C.post('/payment/startPayment', params)
  },

  getPaymentStatus(params) {
    return apiClient1C.get(`/payment/getPaymentStatus?userId=${params.userId}`)
  },

  getClientBillingStatus(params) {
    return apiClient1C.get(
      `/billing/getClientStatus?userId=${params.userId}&sponsorId=${params.sponsorId}`
    )
  },

  activateTrustPayment(params) {
    return apiClient1C.post('/payment/activateTrustPayment', params)
  },

  //requestsToJoin
  requestsToJoinGetList(userId) {
    return apiClient1C.get(`/requests-to-join/getList?userId=${userId}`)
  },

  requestsToJoinSetSeen(params) {
    return apiClient1C.post('/requests-to-join/setSeen', params)
  },

  requestsToJoinSetNotVisible(params) {
    return apiClient1C.post('/requests-to-join/setNotVisible', params)
  },

  requestsToJoinAddNew(params) {
    return apiClient1C.post('/requests-to-join/addNew', params)
  },

  // orders
  placeOrder(orderData) {
    return apiClient1C.post('/orders/placeOrder', orderData)
  },

  getSponsorPreOrdersList(userId, numberOfMonths) {
    return apiClient1C.get(
      `/orders/getSponsorPreOrdersList?userId=${userId}&numberOfMonths=${numberOfMonths}`
    )
  },

  getMainOrdersList(userId) {
    return apiClient1C.get(`/orders/getOrdersList?userId=${userId}`)
  },

  confirmOrder(orderData) {
    return apiClient1C.post('/orders/confirmOrder', orderData)
  },

  archiveOrder(orderData) {
    return apiClient1C.post('/orders/archiveOrder', orderData)
  },

  // downline client
  getDownlineClientInfo(userId) {
    return apiClient1C.get(`/downline-clients/getClientInfo?userId=${userId}`)
  },

  getDownlineClientOrders(userId) {
    return apiClient1C.get(`/downline-clients/getClientOrders?userId=${userId}`)
  },

  // activities
  getClientsActivities(userId) {
    return apiClient1C.get(`/activities/getActivities?userId=${userId}`)
  },

  setActivitiesAcquaintance(userId) {
    return apiClient1C.post('/activities/setAcquaintance', { userId })
  },

  //notifications
  getNotificationsList(userId) {
    return apiClient1C.get(`/notifications/getList?userId=${userId}`)
  },

  setNotificationsAcquaintance({ userId, notificationIds }) {
    return apiClient1C.post('/notifications/setAcquaintance', {
      userId,
      notificationIds
    })
  }
}
