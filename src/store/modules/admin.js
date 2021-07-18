import axios from "axios";
import { url } from "../../../api.config";
import router from '../../router/index';

export default {
    namespaced: true,
    state: {
        item: {
            title: null,
            admin: null,
            options: [],
            voters: [],
            slug: null,
            token: null
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
                .post(`${url}/election`, payload)
                .then(response => {
                    const slug = response.data.links[0].parameters.titleMangled;
                    const token = response.data.links[0].parameters.token;

                    commit('SET_STATE_ITEM', {
                        ...payload,
                        slug,
                        token,
                    });

                    router.push({ name: 'Election', params: { slug, token }});
                })
                .catch(() => {
                    router.push({ name: 'RequestFailed' });
                });
        },
        fetch({ commit }, { slug, token }) {
            return axios
                .get(`${url}/election/admin/${slug}/${token}`)
                .then(response => {
                    const slug = response.data.titleMangled;
                    const token = response.data.adminToken;

                    commit('SET_STATE_ITEM', {
                        title: response.data.title,
                        admin: response.data.admin.address,
                        options: response.data.options,
                        voters: response.data.voters,
                        slug,
                        token
                    });
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