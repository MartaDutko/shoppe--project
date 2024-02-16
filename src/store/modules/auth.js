import { auth } from "@/firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export default {
    namespaced: true,
    state: {
        user: null,
        userUid: null
    },
    getters: {
        getUser: (state) => state.user,
        getUserUid: (state) => state.userUid,
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setUserUid(state, uid) {
            state.userUid = uid
        }
    },
    actions: {
        async saveLoginUserData({ commit, dispatch }, loginResult) {
            try {
                let user = loginResult?.user;
                console.log("user");
                console.log(user);

                // Збереження даних користувача в сторінку
                commit('setUser', user);

                let uid = user.uid;

                // Очікування завантаження даних користувача після входу
                commit('cart/setUserId', uid, { root: true });
                commit('favorites/setUserId', uid, { root: true });

                // Очікуємо на завантаження корзини і списку "улюблених"
                await dispatch('cart/loadCartByUid', uid, { root: true });
                await dispatch('favorites/loadFavoriteByUid', uid, { root: true });

                dispatch('users/loadUserPermissions', user.uid, { root: true })
            } catch (error) {
                console.error('Помилка при обробці saveLoginUserData:', error);
                throw error;
            }
        },
        createUser({ commit, dispatch }, userInfo) {
            let { email, password } = userInfo;

            return new Promise((resolve, reject) => {
                createUserWithEmailAndPassword(auth, email, password)
                    .then(async (userCredential) => {

                        const userToUpdate = auth.currentUser;
                        await updateProfile(userToUpdate, {
                            displayName: `${userInfo.first.toLowerCase()} ${userInfo.last.toLowerCase()}`
                        });

                        // Збереження даних аутентифікації в localStorage
                        localStorage.setItem('authCredential', JSON.stringify({
                            email: userCredential?.user?.email,
                            password: userInfo.password,
                        }));
                        dispatch("saveLoginUserData", userCredential,)

                        resolve(userCredential);
                    })
                    .catch((error) => {
                        commit('setError', error, { root: true });
                        reject(error);
                    });
            })
        },

        signInUser({ commit, dispatch }, { email, password }) {
            return new Promise((resolve, reject) => {
                signInWithEmailAndPassword(auth, email, password)
                    .then(async (userCredential) => {
                        // Збереження даних аутентифікації в localStorage
                        localStorage.setItem('authCredential', JSON.stringify({
                            email: email,
                            password: password
                        }));
                        dispatch("saveLoginUserData", userCredential,)
                        resolve(userCredential)
                    })
                    .catch((error) => {
                        console.log('error');
                        console.log(error);
                        commit('setError', error, { root: true });
                        reject(error)
                    });
            })
        },

        async loginWithCredential({ dispatch }) {
            let credential = localStorage.getItem('authCredential')
            if (credential) {
                credential = JSON.parse(credential)
                await dispatch('signInUser', credential)
            }
        },

        singOutUser({ commit, dispatch }) {
            signOut(auth).then(() => {
                localStorage.removeItem('authCredential')
                commit('setUser', null)
                commit('setUserUid', null)
                dispatch('users/clearPermissions', null, { root: true })
                // Очікуємо на завантаження корзини і списку "улюблених"
                commit('cart/setUserId', null, { root: true });
                commit('favorites/setUserId', null, { root: true });
                dispatch('cart/loadCartByUid', null, { root: true });
                dispatch('favorites/loadFavoriteByUid', null, { root: true });
            }).catch((error) => {
                commit('setError', error, { root: true })
            });
        }

    }
}

