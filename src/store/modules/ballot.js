import axios from "axios";
import { url } from "../../../api.config";
import router from '../../router/index';

export default {
    namespaced: true,
    state: {
        item: {
            id: null,
            name: null,
            email: null,
            options: [],
            voters: [],
        }
    },
    mutations: {
        SET_STATE_ITEM (state, data) {
            state.item = data;
        },
        SET_STATE_ITEM_ERROR (state, data) {
            state.item.error = data;
        }
    },
    actions: {
        new({ commit }, payload) {
            return axios
                .post(`${url}/ballots`, {
                    "name": payload.name,
                    "email": payload.email,
                    "options": payload.options,
                    "voters": payload.voters
                })
                .then(response => {
                    commit('SET_STATE_ITEM', response.data);
                })
                .catch(() => {
                    router.push({ name: 'RequestFailed' });
                });
        },
        fetch({ commit }, id) {
            return axios
                .get(`${url}/ballots/${id}`)
                .then(response => {
                    commit('SET_STATE_ITEM', response.data);
                })
                .catch(() => {
                    router.push({ name: 'Home' });
                });
        }
    },
    getters: {
        fetchItem(state) {
            return state.item;
        }
    }
};