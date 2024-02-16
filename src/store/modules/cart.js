import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('cart')
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { calculateDiscount } from "@/store/helpers/discountUtils";

export default {
    namespaced: true,
    state: () => ({
        userId: null,
        cart: [],
        cartSum: null
    }),
    getters: {

        getCart: (state) => state.cart,
        getUserId: (state) => state.userId,
        getCartData: (state) => state.cart.dataCart,
        getCartSum: (state) => state.cartSum,
    },
    mutations: {
        setCart(state, dataCart) {
            state.cart = dataCart
        },

        setCartSum(state) {
            let totalSum = 0;
            if (state.cart && state.cart.dataCart && state.cart.dataCart.length > 0) {
                state.cart.dataCart.forEach(item => {
                    let discountedPrice = item.product.discount ? calculateDiscount(item.product.price, item.product.discount) : 0
                    totalSum += item.count * (parseFloat(item.product.price) - discountedPrice)
                });
            }
            state.cartSum = parseFloat(totalSum.toFixed(2));
        },

        setUserId(state, id) {
            state.userId = id
        },

        // додавання id до поля з продуктами
        addInUidByDataCart(state, productObj) {
            const cartItem = {
                product: productObj,
                count: 1
            };
            if (state.cart && state.cart.dataCart) {
                const existProduct = state.cart.dataCart.find(item => item.product.id == productObj.id);

                console.log("existProduct");
                console.log(existProduct);

                if (existProduct) {
                    existProduct.count += 1;
                } else {
                    state.cart.dataCart.push(cartItem);
                }
            } else {
                console.error("state.cart або state.cart.dataCart не визначені!");
            }

        },
        updateCartCount(state, { idProduct, operation }) {
            if (state.cart && state.cart.dataCart) {
                const productCart = state.cart.dataCart.find(item => item.product.id === idProduct);

                const productCount = productCart.product.count

                if (operation === 'add' && productCount > productCart.count)
                    productCart.count++
                else if (operation === 'minus' && productCart.count > 1)
                    productCart.count--;
            }
            else {
                console.log('error');
            }
        }
    },
    actions: {
        loadCartList({ commit }) {
            commit('setError', null, { root: true })
            commit('setLoading', true, { root: true })

            collectionDB
                .loadItemsList()
                .then((list) => {
                    commit('setCart', list)
                })
                .catch((error) => {
                    commit('setError', error, { root: true })
                })
                .finally(() => {
                    commit('setLoading', false, { root: true })
                })
        },

        //Знаходження, або створення корзини користувача
        async loadCartByUid({ commit, getters, dispatch }) {
            const db = getFirestore();
            const cartCollection = collection(db, 'cart');

            // Створення запиту до колекції, який фільтрує документи за полем 'uid'

            const q = query(cartCollection, where('uid', '==', getters.getUserId));
            console.log("q");
            console.log(q);
            try {
                const querySnapshot = await getDocs(q);

                // Перевірка, чи знайдено документи
                if (!querySnapshot.empty) {
                    // Отримання першого знайденого документу
                    const cartDoc = querySnapshot.docs[0];

                    // Повернення даних корзини користувача
                    console.log("cartDoc.data()");
                    console.log(cartDoc.data().uid);
                    commit('setCart', {
                        id: cartDoc.id,
                        dataCart: cartDoc.data().dataCart,
                        uid: cartDoc.data().uid
                    })

                    commit('setCartSum')
                    console.log("setCartSum is called")
                } else {
                    console.log("Корзини немає");
                    const cartUser = { dataCart: [], uid: getters.getUserId }
                    dispatch('addToDBCart', cartUser)
                }
            } catch (error) {
                console.log('Помилка при отриманні корзини користувача:', error);
            }
        },

        setUserId({ commit }, id) {
            commit("setUserId", id)
        },

        async addToDBCart({ commit, dispatch }, cartDoc) {
            console.log("cartDoc addToDB");
            console.log(cartDoc);

            commit('setError', null, { root: true });
            commit('setLoading', true, { root: true });

            try {
                // Додаємо корзину до бази даних
                await collectionDB.addItem(cartDoc);

                // Завантажуємо оновлену корзину
                await dispatch('loadCartByUid');
            } catch (error) {
                console.log(error);
                commit('setError', error, { root: true });
            } finally {
                console.log("finall");
                commit('setLoading', false, { root: true });
            }
        },

        async deleteProductByCart({ commit, dispatch, getters }, productId) {
            commit('setError', null, { root: true });
            commit('setLoading', true, { root: true });

            try {
                // Отримати індекс товару в масиві
                const index = getters.getCart.dataCart.findIndex(item => item.product.id === productId);

                if (index !== -1) {
                    // Видалити товар за індексом
                    getters.getCart.dataCart.splice(index, 1);

                    // Оновити стан корзини в Vuex
                    commit('setCart', getters.getCart);

                    // Оновити корзину в базі даних
                    const updatedCart = {
                        itemId: getters.getCart.id,
                        data: getters.getCart
                    };

                    await dispatch('updateCart', updatedCart, false);
                } else {
                    console.error(`Товар із id ${productId} не знайдено у корзині.`);
                }
            } catch (error) {
                commit('setError', error, { root: true });
            } finally {
                commit('setLoading', false, { root: true });
            }
        },

        updateCart({ commit, dispatch, }, { itemId, data }, shouldReloadPage) {
            commit('setError', null, { root: true })
            if (shouldReloadPage)
                commit('setLoading', true, { root: true })
            collectionDB
                .updateItem(itemId, data)
                .then(() => {
                    if (shouldReloadPage) {
                        dispatch('loadCartList')

                    }
                    commit('setCartSum')
                    console.log("setCartSum is called")
                })
                .catch((error) => {
                    commit('setError', error, { root: true })
                })
                .finally(() => {
                    commit('setLoading', false, { root: true })
                })
        },

        async addInUidByDataCart({ commit, dispatch, getters }, productObj) {
            await commit('addInUidByDataCart', productObj)
            const updatedCart = {
                itemId: getters.getCart.id,
                data: getters.getCart
            };
            await dispatch('updateCart', updatedCart, false);
        },

        async updateCartCount({ commit, dispatch, getters }, { idProduct, operation }) {
            await commit("updateCartCount", { idProduct, operation })
            const updatedCart = {
                itemId: getters.getCart.id,
                data: getters.getCart
            };
            await dispatch('updateCart', updatedCart, false);
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