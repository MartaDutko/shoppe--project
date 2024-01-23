import { createStore } from "vuex";
import auth from "@/store/modules/auth";
import users from "@/store/modules/users";
import orders from "@/store/modules/orders";
import favorites from "@/store/modules/favorites";

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        users,
        orders,
        favorites
    },
});