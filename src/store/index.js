import { createStore } from 'vuex'
import ballot from './modules/ballot'

// Create a new store instance.
export default createStore({
  modules: {
      ballot
  }
});