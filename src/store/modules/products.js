import DbOperations from '../helpers/DbOperations'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const collectionDB = new DbOperations('products')
export default {
    namespaced: true,
    state: () => ({
        products: [],

        loading: false,
        error: null,

        selectedFile: null,
    }),
    getters: {
        getSelectedFile: (state) => state.selectedFile,
        getProducts: (state) => state.products,
        getProductById: (state) => (id) => state.products.find(item => item.id === id),

        getProductsByCategory: (state) => (categoryProduct) => {
            if (!categoryProduct) {
                return state.products;
            }
            return state.products.filter(item => item.category === categoryProduct);
        }
    },
    mutations: {
        setProductsList(state, itemsList) {
            state.products = itemsList
        },
        deleteProduct(state, itemId) {
            state.products = state.products.filter((item) => item.id !== itemId)
        },
        setSelectedFile(state, file) {
            state.selectedFile = file
        },
    },

    actions: {
        async createPhotoStorage({ state, commit }) {
            const storage = getStorage();
            const storageRef = ref(storage, `images/${state.selectedFile.name}`);
            const metadata = {
                contentType: 'image/jpeg',
            };

            try {
                const uploadTaskSnapshot = await uploadBytes(storageRef, state.selectedFile, metadata);

                const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
                // URL
                console.log(downloadURL);
                return downloadURL
            } catch (error) {
                console.error('Error creating photo storage:', error);
                commit('setError', error.message);
            }

            commit('clearSelectedFile');
        },


        setSelectedFile({ commit }, file) {
            commit('setSelectedFile', file)
        },

        loadingProduct({ commit }) {
            commit('setError', null, { root: true });
            commit('setLoading', true, { root: true });

            collectionDB
                .loadItemsList()
                .then((list) => {
                    commit('setProductsList', list)
                })
                .catch((error) => {
                    commit('setError', error, { root: true });
                })
                .finally(() => {
                    commit('setLoading', false, { root: true })
                })
        },
        addProduct({ commit, dispatch }, item) {
            commit('setError', null, { root: true })
            commit('setLoading', true, { root: true })
            collectionDB
                .addItem(item)
                .then(() => {
                    dispatch('loadingProduct')
                })
                .catch((error) => {
                    commit('setError', error, { root: true })
                })
                .finally(() => {
                    commit('setLoading', false, { root: true })
                })
        },
        deleteProduct({ commit }, itemId) {
            commit('setError', null, { root: true })
            commit('setLoading', true, { root: true })

            collectionDB
                .deleteItem(itemId)
                .then(() => {

                    commit('deleteProduct', itemId)
                })
                .catch((error) => {
                    commit('setError', error, { root: true })
                })
                .finally(() => {
                    commit('setLoading', false, { root: true })
                })
        },
        updateProducts({ commit, dispatch }, { itemId, data }) {
            commit('setError', null, { root: true })
            commit('setLoading', true, { root: true })

            collectionDB
                .updateItem(itemId, data)
                .then(() => {
                    dispatch('loadingProduct')
                })
                .catch((error) => {
                    commit('setError', error, { root: true })
                })
                .finally(() => {
                    commit('setLoading', false, { root: true })
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