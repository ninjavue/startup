import { createStore } from 'vuex'
import helper from './helper'
import region from './modules/region'
import district from './modules/district'
import patient from './modules/patient'
import ill from './modules/ill'

export default createStore({
  state: {
    url: "http://localhost:3000"
  },
  getters: {
    url(state) {
      return state.url
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    helper,
    region,
    district,
    patient,
    ill
  }
})
