import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('favorites')
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

export default {
    namespaced: true,
    state: () => ({
        favorites: {
            favoritesList: [],
        },
        userId: null,
    }),
    getters: {
        getUserId: (state) => state.userId,

        getFavorites: (state) => state.favorites,
        getFavoritesList: (state, getters, rootState, rootGetters) => {
            return state.favorites.favoritesList.map(productId =>
                rootGetters['products/getProductById'](productId))
        },
    },
    mutations: {
        setFavorites(state, favorites) {
            state.favorites = favorites
        },
        addFavorite(state, idProduct) {
            state.favorites.favoritesList.push(idProduct)
        },
        setUserId(state, id) {
            state.userId = id
        },
        deleteFavorite(state, id) {
            state.favorites.favoritesList = state.favorites.favoritesList.filter(item =>
                item !== id)
        }
    },
    actions: {
        // Знаходження, або створення favorite користувача
        async loadFavoriteByUid({ commit, dispatch, getters }) {

            const db = getFirestore();
            const favoriteCollection = collection(db, 'favorites');

            // Створення запиту до колекції, який фільтрує документи за полем 'uid'

            const q = query(favoriteCollection, where('uid', '==', getters.getUserId));
            try {
                const querySnapshot = await getDocs(q);

                // Перевірка, чи знайдено документи
                if (!querySnapshot.empty) {
                    // Отримання першого знайденого документу
                    const favoriteDoc = querySnapshot.docs[0];

                    // Повернення даних favorite користувача
                    commit('setFavorites', {
                        id: favoriteDoc.id,
                        favoritesList: favoriteDoc.data().favoritesList,
                        uid: favoriteDoc.data().uid
                    })
                } else {
                    console.log("Favorite немає");
                    const favoritesUser = { favoritesList: [], uid: getters.getUserId }
                    dispatch('addToDBFavorite', favoritesUser)
                }
            } catch (error) {
                console.log('Помилка при отриманні favorite:', error);
            }
        },
        async addToDBFavorite({ commit, dispatch }, favoriteDoc) {
            console.log("favoriteDoc addToDB");
            console.log(favoriteDoc);
            commit('setError', null, { root: true });
            commit('setLoading', true, { root: true });

            try {
                // Додавання favorite до бази даних
                await collectionDB.addItem(favoriteDoc);
                await dispatch('loadFavoriteByUid')
            } catch (error) {
                console.log(error);
                commit('setError', error, { root: true });
            } finally {
                console.log("finall");
                commit('setLoading', false, { root: true });
            }
        },

        updateFavorites({ commit, dispatch, }, { itemId, data }, shouldReloadPage) {
            commit('setError', null, { root: true })
            if (shouldReloadPage)
                commit('setLoading', true, { root: true })
            collectionDB
                .updateItem(itemId, data)
                .then(() => {
                    if (shouldReloadPage) {
                        dispatch('loadlistFavorites')
                    }
                })
                .catch((error) => {
                    commit('setError', error, { root: true })
                })
                .finally(() => {
                    commit('setLoading', false, { root: true })
                })
        },

        async addFavorite({ commit, getters, dispatch }, idProduct) {
            let isExist = getters.getFavorites.favoritesList.find(item => item === idProduct)
            if (!isExist)
                await commit('addFavorite', idProduct)
            else
                commit('deleteFavorite', idProduct)
            let dataFav = {
                itemId: getters.getFavorites.id,
                data: getters.getFavorites
            }
            await dispatch('updateFavorites', dataFav, false)
        },
        async deleteFavorite({ commit, getters, dispatch }, idProduct) {
            await commit('deleteFavorite', idProduct)
            let data = {
                itemId: getters.getFavorites.id,
                data: getters.getFavorites
            }
            await dispatch('updateFavorites', data, false)
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