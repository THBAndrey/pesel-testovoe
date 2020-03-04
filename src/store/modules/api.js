import apiCall from '@/utils/apiCall'

const state = {
  baseUrl: 'https://dog.ceo/api'
}

const actions = {
  getBreeds({ state }) {
    return apiCall(state.baseUrl + '/breeds/list')
  },
  getBreedImages({ state }, breed) {
    return apiCall(state.baseUrl + `/breed/${breed}/images`)
  },
  getBreedRandomImage({ state }, breed) {
    return apiCall(state.baseUrl + `/breed/${breed}/images/random`)
  },
  getRandomImage({ state }) {
    return apiCall(state.baseUrl + `/breeds/image/random`)
  },
  getRandomImages({ state }, quantity) {
    return apiCall(state.baseUrl + `/breeds/image/random/${quantity}`)
  }
}

export default {
  namespaced: true,
  state,
  actions
}
