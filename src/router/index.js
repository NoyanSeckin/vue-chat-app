import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Chat from "@/components/Chat";

Vue.use(VueRouter);

const routes = [
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    props: true,
    // router guard
    beforeEnter: (to, from, next) => {
      if (to.params.name) {
        next();
      } else {
        next({ name: "Home" });
      }
    },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
