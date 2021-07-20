import { createStore } from 'vuex';
import admin from './modules/admin';
import voter from './modules/voter';

// Create a new store instance.
export default createStore({
  modules: {
      admin,
      voter
  }
});