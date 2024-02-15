<template>
  <el-container>
    <el-header>
      <HeaderItem />
    </el-header>
    <el-container>
      <el-aside
        :width="`${toggle ? '70px' : '250px'}`"
        style="transition: all 0.5s"
      >
        <AsideItem />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
import { provide, ref } from "vue";
import AsideItem from "./components/lib/AsideItem.vue";
import HeaderItem from "./components/lib/HeaderItem.vue";

export default {
  components: {
    AsideItem,
    HeaderItem,
  },
  setup() {
    const toggle = ref(false);
    provide("toggle", toggle);
    return {
      toggle,
    };
  },

  mounted() {
    this.$store.dispatch("allRegion");
    this.$store.dispatch("allIll");
  },
};
</script>

<style lang="scss">
@import "bulma/css/bulma.min.css";
@import "./styles/app.scss";
</style>
