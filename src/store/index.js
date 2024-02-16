import { createStore } from "vuex";
import auth from "@/store/modules/auth";
import users from "@/store/modules/users";
import favorites from "@/store/modules/favorites";
import cart from "@/store/modules/cart";
import products from "@/store/modules/products";

export default createStore({
    state: {
        loading: false,
        error: null,
    },
    getters: {
        getError: (state) => state.error,
        getLoadind: (state) => state.loading,
    },
    mutations: {
        setLoading(state, loading) {
            state.loading = loading
        },
        setError(state, error) {
            state.error = error
        },
    },
    actions: {
        setError({ commit }, error) {
            commit('setError', error)
        },
        setLoading({ commit }, boolean) {
            commit('setLoading', boolean)
        }
    },
    modules: {
        auth,
        users,
        favorites,
        cart,
        products
    },
});