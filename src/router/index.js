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
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/OrdersView.vue"),
  },
  {
    path: "/products/:productId/order",
    name: "order-product",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/OrderProductView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
