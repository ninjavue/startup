<template>
  <el-card>
    <div class="card-head">
      <h1>Viloyatlar</h1>
      <el-button
        @click="
          {
            (isModal = true), (regionList = {}), (toggleBtn = false);
          }
        "
        type="primary"
      >
        Viloyat kiritish
      </el-button>
    </div>
    <el-table class="mt-4" :data="regions">
      <el-table-column label="№" width="80px">
        <template #default="scope">
          <router-link
            class="table-link"
            :to="'/admin/region/' + scope.row.link + '/' + scope.row.id"
          >
            {{ scope.$index + 1 }}
          </router-link>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="Viloyat nomi">
        <template #default="scope">
          <router-link
            class="table-link"
            :to="'/admin/region/' + scope.row.link + '/' + scope.row.id"
          >
            {{ scope.row.title }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="Qo'shilgan sana">
        <template #default="scope">
          <router-link
            class="table-link"
            :to="'/admin/region/' + scope.row.link + '/' + scope.row.id"
          >
            {{ formatDateTime(scope.row.date) }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Ammallar" align="right">
        <template #default="scope">
          <router-link
            class="mr-3"
            :to="'/admin/region/' + scope.row.link + '/' + scope.row.id"
          >
            <el-button type="info">
              <i class="fa-solid fa-eye" style="color: #1d2d5b"></i>
            </el-button>
          </router-link>
          <el-button type="primary" @click="edit(scope.row.id)">
            <i class="fa-solid fa-pen-to-square"></i>
          </el-button>
          <el-button type="danger" @click="deleteRegion(scope.row.id)">
            <i class="fa-solid fa-trash"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!-- dialog code  -->
  <el-dialog
    v-model="isModal"
    :title="`${toggleBtn ? 'Viloyatni tahrirlash' : 'Yangi viloyat'}`"
    width="500px"
  >
    <el-form :model="regionList" label-position="top" class="mt-4">
      <el-form-item label="Viloyat nomi *">
        <el-input
          v-model="regionList.title"
          placeholder="Misol: Samarqand viloyati"
        >
        </el-input>
      </el-form-item>
      <div align="right">
        <el-button @click="add" v-if="!toggleBtn" type="primary"
          >Kiritish</el-button
        >
        <el-button @click="save" v-if="toggleBtn" type="primary"
          >Tahrirlash</el-button
        >
        <el-button
          @click="
            {
              (isModal = false), (regionList = {});
            }
          "
          type="danger"
          >Bekor qilish</el-button
        >
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      isModal: false,
      toggleBtn: false,
      regionList: {},
    };
  },
  computed: {
    regions() {
      return this.$store.getters.regions;
    },
  },

  methods: {
    add() {
      if (this.regionList.title) {
        this.regionList.date = new Date();
        this.regionList.link = this.regionList.title
          .toLowerCase()
          .trim()
          .replace(" ", "-");
        this.$store.dispatch("postRegion", this.regionList);
        this.$message({
          message: `${this.regionList.title} muaffaqiyatli qo'shildi.`,
          type: "success",
        });
        this.regionList = {};
        this.isModal = false;
      }
    },
    edit(id) {
      if (id) {
        this.$store.dispatch("getRegion", id).then((res) => {
          this.regionList = res.data;
          this.isModal = true;
          this.toggleBtn = true;
        });
      }
    },
    save() {
      if (this.regionList) {
        this.regionList.link = this.regionList.title
          .toLowerCase()
          .trim()
          .replace(" ", "-");
        this.$store.dispatch("editRegion", this.regionList);
        this.$message({
          message: `${this.regionList.title}  muaffaqiyatli yangilandi.`,
          type: "success",
        });
        this.regionList = {};
        this.isModal = false;
        this.toggleBtn = false;
      }
    },
    deleteRegion(id) {
      if (id) {
        this.$store.dispatch("deleteRegion", id);
        this.$message({
          message: "Viloyat muaffaqiyatli o'chirildi.",
          type: "success",
        });
      }
    },
    formatDateTime(date) {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      const dateTime = new Date(date);

      const formattedDate = dateTime.toLocaleDateString("en-GB", options);

      return formattedDate.replace(/\//g, ".");
    },
  },

  mounted() {
    document.title = "Viloyatlar";
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/admin/region.scss";
</style>