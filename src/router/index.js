import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MapView from "../views/MapView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: "/map",
    name: "map",
    component: MapView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
