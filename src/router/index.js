import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import HomeView from "@/views/HomeView";
import ShopView from "@/views/ShopView";
import BlogView from "@/views/BlogView";
import OurStoryView from "@/views/OurStoryView";
import SearchView from "@/views/SearchView";
import BasketView from "@/views/BasketView";
import UserView from "@/views/UserView";
import ContactView from "@/views/ContactView";
import TearmsOfServices from "@/views/TearmsOfServices";
import ShipingAndReturns from "@/views/ShipingAndReturns";
import LoginView from "@/views/LoginView";
// 
// import DashboardView from "@/views/UserView/DashboardView.vue";
// import OrdersView from "@/views/UserView/OrdersView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiredAuth: false }

  },
  {
    path: "/shop",
    name: "shop",
    component: ShopView,
    meta: { requiredAuth: false }
  },
  {
    path: "/blog",
    name: "blog",
    component: BlogView,
    meta: { requiredAuth: true }
  },
  {
    path: "/our_story",
    name: "our_story",
    component: OurStoryView,
    meta: { requiredAuth: false }
  },
  // ! delete
  {
    path: "/search",
    name: "search",
    component: SearchView,
    meta: { requiredAuth: false }
  },
  // !
  {
    path: "/basket",
    name: "basket",
    component: BasketView,
    meta: { requiredAuth: false }
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
    // meta: { requiredAuth: true }
    children: [
      // {
      //   path: 'dashboard',
      //   name: 'dashboard',
      //   component: () => import('@/views/UserView/DashboardView.vue'),
      //   // component: DashboardView
      // },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/views/UserView/OrdersView.vue'),
        // component: OrdersView
      },
      // {
      //   path: 'adresses',
      //   name: 'adresses',
      //   component: () => import('@/views/UserView/AddressesView.vue'),
      //   // component:DashboardView
      // },
      {
        path: 'favorires',
        name: 'favorires',
        component: () => import('@/views/UserView/FavoritesView.vue'),
        // component:DashboardView
      },
    ]

  },
  // !!!!!!!!!!!!!!!!!!!!!!!!!
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
    meta: { requiredAuth: false }
  },
  {
    path: "/tearms_services",
    name: "tearms_of_services",
    component: TearmsOfServices,
    meta: { requiredAuth: false }
  },
  {
    path: "/shiping_returns",
    name: "shiping_end_returns",
    component: ShipingAndReturns,
    meta: { requiredAuth: false }
  },
  // !!!!!!!!!!!!!!!!
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not_found',
    component: () => import('@/views/ErrorView'),
    meta: { requiresAuth: false }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHashHistory(),
  routes,
});

// if (!isAuthenticated) isAuthenticated = await store.dispatch('auth/loginWithCredential')

// router.beforeEach(async (to) => {
//   if (to.meta?.requiredAuth) {
//     let isAuthenticated = await store.state.auth.user
//     console.log("isAuthenticated2222222");
//     console.log(isAuthenticated);
//     if (!isAuthenticated)
//       return {
//         name: "login",
//         query: { redirect: to.fullPath }
//       }
//   }
// })

// const redirect = to.query.redirect || '/';

router.beforeEach(async (to, from, next) => {

  if (to.meta?.requiredAuth) {
    try {
      let isAuthenticated = await store.state.auth.user;
      console.log("isAuthenticated2222222");
      console.log(isAuthenticated);

      if (!isAuthenticated) {
        return next({ name: "login", query: { redirect: to.fullPath } });

      }
    } catch (error) {
      console.error("Error during authentication:", error);
      next({ name: "error" });
    }
  }

  // Продовжити навігацію
  next();
});

// router.beforeEach(async (to) => {
//   if (to.meta?.requiredAuth) {
//     let isAuthenticated = store.state.auth.user;
//     console.log("isAuthenticated:", isAuthenticated);
//     console.log("to.fullPath:", to.fullPath);

//     if (!isAuthenticated) {
//       // Редирект на сторінку логіну з параметром redirect
//       return {
//         name: "login",
//         // query: { redirect: "/blog" }
//       };
//     }
//   }

// });

export default router;
