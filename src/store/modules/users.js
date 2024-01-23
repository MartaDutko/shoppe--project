import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('users')
export default {
    namespaced: true,
    state: () => ({
        // permissions: {},

        loading: false,
        error: null,
        // 

        // userDoc:
    }),
    getters: {
        isLoading: (state) => state.loading,
        hasError: (state) => state.error,

        // userPermissions: (state) => state.permissions,
    },
    mutations: {
        // setPermissions(state, permissions) {
        //     state.permissions = permissions
        // },

        setLoading(state, value) {
            state.loading = value
        },
        setError(state, error) {
            state.error = error
        },

        // addToDB(state,userDoc){
        //     state.
        // }
    },
    actions: {
        // !
        // loadUserPermissions({ commit, rootGetters }, userId) {
        //     userId ??= rootGetters['bar/someGetter'].getUser.uid
        //     collectionDB.getItemById(userId).then((permissions) => {
        //         commit('setPermissions', permissions)
        //     })
        // },
        // !
        // clearPermissions({ commit }) {
        //     commit('setPermissions', {})
        // },

        addToDB({ commit }, userDoc) {
            console.log("user addToDB");
            console.log(userDoc);

            commit('setError', null)
            commit('setLoading', true)
            collectionDB
                .addItem(userDoc)
                .then((a) => {
                    console.log(a);
                    // dispatch('loadlistBuses')
                })
                .catch((error) => {
                    console.log(error);
                    commit('setError', error)
                })
                .finally(() => {
                    console.log("finall");
                    commit('setLoading', false)
                })
        }
    },
}