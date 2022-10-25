import { createRouter, createWebHistory } from "vue-router";
import ProductsView from "../views/Product/ProductsView.vue";
import RegisterView from "../views/Auth/RegisterView.vue";
import LoginView from "../views/Auth/LoginView.vue";

const routes = [
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
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
    path: "/products/new",
    name: "new-product",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Product/EditOrCreateProduct.vue"
      ),
  },
  {
    path: "/products/:productId/edit",
    name: "edit-product",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/Product/EditOrCreateProduct.vue"
      ),
  },
  {
    path: "/products/:productId/order",
    name: "order-product",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/OrderProductView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
