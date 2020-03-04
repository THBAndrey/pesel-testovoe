const state = {
  favorites: []
}

const getters = {
  getFavorites: state => {
    return state.favorites
  }
}

const mutations = {
  addToFavorites(state, image) {
    state.favorites.push(image)
    localStorage.setItem('favorites', JSON.stringify(state.favorites))
  },
  removeFromFavorites(state, image) {
    state.favorites = state.favorites.filter(el => el !== image)
    localStorage.setItem('favorites', JSON.stringify(state.favorites))
  },
  initFavorites(state, data) {
    state.favorites = data
  }
}

const actions = {
  loadFavorites({ commit }) {
    commit('initFavorites', JSON.parse(localStorage.getItem('favorites')))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
