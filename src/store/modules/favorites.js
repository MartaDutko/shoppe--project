import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('favorites')
export default {
    namespaced: true,
    state: () => ({
        // permissions: {},
        favoritesData: [
            // {
            //     id: 1212,
            //     productsIds: [111, 11111],
            //     status: 'check'
            // },
            // {
            //     id: 1212,
            //     productsIds: [111, 11111],
            //     status: 'check'
            // }
        ],

        loading: false,
        error: null,
    }),
    getters: {
        isLoading: (state) => state.loading,
        hasError: (state) => state.error,

        getFavoritesData: (state) => state.favoritesData,
        // getBusById: (state) => (itemId) => state.listBuses.find((item) => item.id == itemId),
    },
    mutations: {
        setItemsList(state, itemsList) {
            state.listBuses = itemsList
        },
        deleteItem(state, itemId) {
            state.listBuses = state.listBuses.filter((item) => item.id !== itemId)
        },

        setLoading(state, value) {
            state.loading = value
        },
        setError(state, error) {
            state.error = error
        },
    },
    actions: {
        loadlistBuses({ commit }) {
            commit('setError', null)
            commit('setLoading', true)

            collectionDB
                .loadItemsList()
                .then((list) => {
                    commit('setItemsList', list)
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        addBuses({ commit, dispatch }, item) {
            commit('setError', null)
            commit('setLoading', true)
            collectionDB
                .addItem(item)
                .then(() => {
                    dispatch('loadlistBuses')
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        deleteBuses({ commit }, itemId) {
            commit('setError', null)
            commit('setLoading', true)

            collectionDB
                .deleteItem(itemId)
                .then(() => {

                    commit('deleteItem', itemId)
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        updateBuses({ commit, dispatch }, { itemId, data }) {
            commit('setError', null)
            commit('setLoading', true)

            collectionDB
                .updateItem(itemId, data)
                .then(() => {
                    dispatch('loadlistBuses')
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        loadFiltered({ commit }, { fieldTitle, compareOperator, valueToCompare }) {
            commit('setError', null)
            commit('setLoading', true)
            console.log({ fieldTitle, compareOperator, valueToCompare });
            collectionDB
                .loadFilteredData(fieldTitle, compareOperator, valueToCompare)
                .then((list) => {
                    commit('setItemsList', list)
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
    },
}