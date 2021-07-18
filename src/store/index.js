import { createStore } from 'vuex'
import admin from './modules/admin'

// Create a new store instance.
export default createStore({
  modules: {
      admin
  }
});