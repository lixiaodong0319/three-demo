<template>
  <nav>
    <router-link v-for="(item, index) in routes" :key="index" :to="item.path"
      >{{ item.name }} |
    </router-link>
  </nav>
  <router-view class="routerView" />
</template>

<script lang="ts" setup>
import { routes } from "@/router/index";
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  height: 100%;
}
nav {
  position: fixed;
  left: 0;
  top: 0;
  background: #fff;
  z-index: 100000000000;
}
</style>
