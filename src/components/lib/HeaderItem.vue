<template>
  <div class="header">
    <div class="header-left">
      <div class="logo">
        <img src="../../assets/images/logo.png" alt="logo" />
        <div class="logo-text">
          O'zbekiston Respublikasi Sog'liqni Saqlash Vazirligi
        </div>
      </div>
      <button @click="toggleAside" class="header-btn mt-2">
        <i class="fa-solid fa-bars"></i>
      </button>
    </div>
    <div class="header-right">
      <el-avatar :src="imageUrl"> </el-avatar>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  data() {
    return {
      imageUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  setup() {
    const toggle = inject("toggle");

    const toggleAside = () => {
      toggle.value = !toggle.value;
    };

    return {
      toggleAside,
    };
  },
};
</script>

<style lang="scss">
@import "../../styles/lib/header.scss";
</style>