import { createRouter, createWebHistory } from "vue-router";
import ProductsView from "../views/ProductsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: ProductsView,
  },
  {
    path: "/orders",
    name: "orders",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/OrdersView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
