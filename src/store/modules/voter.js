import axios from "axios";
import { url } from "../../../api.config";
import router from '../../router/index';

export default {
    namespaced: true,
    state: {
        ballot: {
            title: null,
            slug: null,
            token: null,
            options: []
        }
    },
    mutations: {
        SET_STATE (state, data) {
            state.ballot = data;
        },
    },
    actions: {
        // new({ commit }, payload) {
        //     return axios
        //         .post(`${url}/election`, payload)
        //         .then(response => {
        //             const slug = response.data.links[0].parameters.titleMangled;
        //             const token = response.data.links[0].parameters.token;

        //             commit('SET_STATE', {
        //                 ...payload,
        //                 slug,
        //                 token,
        //             });

        //             router.push({ name: 'Election', params: { slug, token }});
        //         })
        //         .catch(() => {
        //             router.push({ name: 'RequestFailed' });
        //         });
        // },
        fetch({ commit }, { slug, token }) {
            return axios
                .get(`${url}/election/${slug}/${token}`)
                .then(response => {
                    const slug = response.data.titleMangled;
                    const token = response.data.voterToken;

                    commit('SET_STATE', {
                        title: response.data.title,
                        options: response.data.options,
                        slug,
                        token
                    });
                })
                .catch(() => {
                    router.push({ name: 'RequestFailed' });
                });
        }
    },
    getters: {
        fetchItem(state) {
            return state.ballot;
        }
    }
};