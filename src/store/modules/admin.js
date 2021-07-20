import axios from "axios";
import { url } from "../../../api.config";
import router from '../../router/index';

export default {
    namespaced: true,
    state: {
        election: {
            title: null,
            admin: null,
            options: [],
            voters: [],
            slug: null,
            token: null
        }
    },
    mutations: {
        SET_STATE (state, data) {
            state.election = data;
        }
    },
    actions: {
        new({ commit }, payload) {
            return axios
                .post(`${url}/election`, payload)
                .then(response => {
                    const slug = response.data.links[0].parameters.titleMangled;
                    const token = response.data.links[0].parameters.token;

                    commit('SET_STATE', {
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

                    commit('SET_STATE', {
                        title: response.data.title,
                        admin: response.data.admin.address,
                        options: response.data.options,
                        voters: response.data.voters,
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
        fetch(state) {
            return state.election;
        }
    }
};