import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import HomeView from "@/views/HomeView";
import AdminAddView from "@/views/AdminAddView";
import BlogView from "@/views/BlogView";
import OurStoryView from "@/views/OurStoryView";
import BasketView from "@/views/BasketView";
import UserView from "@/views/UserView";
import ContactView from "@/views/ContactView";
import PrivicyPolicyView from "@/views/PrivicyPolicyView";
import LoginView from "@/views/LoginView";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiredAuth: false }

  },

  {
    path: "/admin_add:id?",
    name: "admin_add",
    props: true,
    component: AdminAddView,
    meta: { requiredAuth: false }
  },
  {
    path: "/blog",
    name: "blog",
    component: BlogView,
    meta: { requiredAuth: false }
  },
  {
    path: "/our_story",
    name: "our_story",
    component: OurStoryView,
    meta: { requiredAuth: false }
  },
  {
    path: "/basket",
    name: "basket",
    component: BasketView,
    meta: { requiredAuth: true }
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
    meta: { requiredAuth: true },
    children: [
      {
        path: 'favorires',
        name: 'favorires',
        component: () => import('@/views/UserView/FavoritesView.vue'),
      },
    ]

  },
  // footer nav-bar
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
    meta: { requiredAuth: false }
  },
  {
    path: "/privicy_policyView",
    name: "privicy_policyView",
    component: PrivicyPolicyView,
    meta: { requiredAuth: false }
  },

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
  routes,
});

router.beforeEach(async (to) => {
  let isAuthenticated = store.state.auth.user
  if (!isAuthenticated) isAuthenticated = await store.dispatch('auth/loginWithCredential')

  if (to.meta?.requiredAuth) {
    if (!isAuthenticated)
      return ({ name: "login", query: { redirect: to.fullPath ? to.fullPath : "home" } });

  }
})

export default router;
