<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#1d2d5b"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    :collapse="toggle"
  >
    <el-menu-item v-for="(item, i) of list" :index="i" :key="i">
      <router-link :to="item.link">
        <el-icon><i :class="item.icon"></i></el-icon>
        <span v-if="!toggle" class="pl-2">{{ item.title }} </span></router-link
      >
    </el-menu-item>
  </el-menu>
</template>
  
<script>
import { inject } from "vue";

export default {
  data() {
    return {
      list: [
        {
          icon: "fa-solid fa-gauge",
          title: "Dashboard",
          link: "/dashboard",
        },
        {
          icon: "fa-solid fa-pills",
          title: "Kasalliklar",
          link: "/ill-list",
        },
        {
          icon: "fa-solid fa-building",
          title: "Viloyatlar",
          link: "/regions",
        },
        {
          icon: "fa-solid fa-magnifying-glass-plus",
          title: "Qidiruv",
          link: "/search-patient",
        },
      ],
    };
  },
  setup() {
    const toggle = inject("toggle");
    return {
      toggle,
    };
  },
};
</script>
  
  <style lang="scss">
@import "../../styles/lib/aside.scss";
</style>