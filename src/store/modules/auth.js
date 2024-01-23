import { auth } from "@/firebase-config.js";
// import { reject, resolve } from "core-js/fn/promise";
// import DbOperations from '../helpers/DbOperations'
// const collectionDB = new DbOperations('users')
// import { reject, resolve } from "core-js/fn/promise";
// import { EmailAuthProvider, signInWithCredential, signInWithEmailAndPassword, signOut } from 'firebase/auth'
// 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export default {
    namespaced: true,
    state: {
        user: null,

        loading: false,
        error: null,
    },
    getters: {
        getUser: (state) => state.user,
        getError: (state) => state.error,
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setLoading(state, loading) {
            state.loading = loading
        },
        setError(state, error) {
            state.error = error
        },
    },
    actions: {
        createUser({ commit, dispatch }, userInfo) {
            let { email, password } = userInfo;

            return new Promise((resolve, reject) => {
                createUserWithEmailAndPassword(auth, email, password)
                    .then(async (userCredential) => {
                        const user = userCredential.user;
                        commit('setUser', user);

                        console.log('Реєстрація успішна. Додаткові дії з користувачем:', user);

                        const userToUpdate = auth.currentUser;

                        try {
                            await updateProfile(userToUpdate, {
                                displayName: `${userInfo.first.toLowerCase()} ${userInfo.last.toLowerCase()}`
                            });

                            let credential = user?.uid;
                            localStorage.setItem('authCredential', JSON.stringify(credential));
                            console.log("user.uid");
                            console.log(user.uid);

                            const userDoc = {
                                uid: user.uid,
                                email: user?.email,
                                password: userInfo.password,
                                first: userInfo.first.toLowerCase(),
                                last: userInfo.last.toLowerCase()
                            };

                            await dispatch('users/addToDB', userDoc, { root: true });
                            resolve(user);
                        } catch (error) {
                            commit('setError', error);
                            reject(error);
                        }
                    })
                    .catch((error) => {
                        commit('setError', error);
                        reject(error);
                    });
            })
        },

        signInUser({ commit }, { email, password }) {
            console.log(email);
            console.log("email");
            console.log("state.user");
            // console.log(state.user);

            return new Promise((resolve, reject) => {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log("userCredential");
                        console.log(user);
                        console.log("user.displayName");
                        console.log(user.displayName);
                        commit('setUser', user);
                        resolve(user)
                        // console.log(');
                    })
                    .catch((error) => {
                        console.log('err');
                        console.log(error);
                        commit('setError', error);
                        reject(error)
                    });
            })
        },

        singOutUser({ commit }) {
            signOut(auth).then(() => {
                // localStorage.removeItem('authCredential')
                commit('setUser', null)
                // dispatch('users/clearPermissions', null, { root: true })
            }).catch((error) => {
                commit('setError', error)
            });
        }

    }
}

