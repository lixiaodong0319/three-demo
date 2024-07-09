import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/demo1",
    name: "基础",
    component: () => import("../views/demo1/index.vue"),
  },
  {
    path: "/demo2",
    name: "请求动画",
    component: () => import("../views/demo2/index.vue"),
  },
  {
    path: "/demo3",
    name: "轨道控制器",
    component: () => import("../views/demo3/index.vue"),
  },
  {
    path: "/demo4",
    name: "动画",
    component: () => import("../views/demo4/index.vue"),
  },
  {
    path: "/demo5",
    name: "图形界面",
    component: () => import("../views/demo5/index.vue"),
  },
  {
    path: "/demo6",
    name: "纹理",
    component: () => import("../views/demo6/index.vue"),
  },
  {
    path: "/demo7",
    name: "金属映射",
    component: () => import("../views/demo7/index.vue"),
  },
  {
    path: "/demo8",
    name: "随机粒子特效",
    component: () => import("../views/demo8/index.vue"),
  },
  {
    path: "/demo9",
    name: "雪花特效",
    component: () => import("../views/demo9/index.vue"),
  },
  {
    path: "/demo10",
    name: "物理碰撞",
    component: () => import("../views/demo10/index.vue"),
  },
  {
    path: "/demo11",
    name: "着色器",
    component: () => import("../views/demo11/index.vue"),
  },
  {
    path: "/demo12",
    name: "智慧城市",
    component: () => import("../views/demo12/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
