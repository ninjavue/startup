<template>
  <el-card>
    <ChartItem :chartData="chartTitle(regions)" />
  </el-card>
</template>

<script>
import ChartItem from "@/components/admin-component/ChartItem.vue";

export default {
  data() {
    return {
      datasets: [
        {
          label: "1-DARAJA",
          backgroundColor: "#2432AD",
          data: [40, 20, 12, 60, 10, 14, 36, 70, 45, 5, 90, 76],
        },
        {
          label: "2-DARAJA",
          backgroundColor: "#E3EF3B",
          data: [10, 50, 32, 25, 78, 67, 43, 45, 32, 86, 56, 36],
        },
        {
          label: "3-DARAJA",
          backgroundColor: "#47CA06",
          data: [20, 70, 72, 55, 38, 37, 55, 85, 12, 46, 76, 36],
        },
      ],
    };
  },
  computed: {
    regions() {
      return this.$store.getters.regions;
    },
  },
  methods: {
    chartTitle(data) {
      let array = [];
      data.map((region) => {
        region.title = region.title.replace(" respublikasi", " ");
        array.push(region.title);
      });
      return { labels: array, datasets: this.datasets };
    },
  },
  mounted() {
    document.title = "Dashboard";
  },
  components: { ChartItem },
};
</script>

<style lang="scss" scoped>
.el-card {
  max-height: calc(100vh - 110px);
  padding-bottom: 10px;
}
</style>
