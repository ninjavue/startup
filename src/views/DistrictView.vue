<template>
  <el-card>
    <div class="card-head">
      <h1>{{ region.title }} bo'yicha tumanlar ro'yhati</h1>
      <el-button
        @click="
          {
            (isModal = true), (districtList = {}), (toggleBtn = false);
          }
        "
        type="primary"
      >
        Tuman kiritish
      </el-button>
    </div>
    <el-table class="mt-4" :data="districts">
      <el-table-column label="№" width="80px">
        <template #default="scope">
          <router-link
            class="table-link"
            :to="
              '/region/' +
              region.link +
              scope.row.region_id +
              '/district/' +
              scope.row.link +
              '/' +
              scope.row.id
            "
          >
            {{ scope.$index + 1 }}
          </router-link>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="Tuman nomi">
        <template #default="scope">
          <router-link
            class="table-link"
            :to="
              '/region/' +
              region.link +
              scope.row.region_id +
              '/district/' +
              scope.row.link +
              '/' +
              scope.row.id
            "
          >
            {{ scope.row.title }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="ill_count" label="Kasallanganlar soni">
        <template #default="scope">
          <router-link
            class="table-link"
            :to="
              '/region/' +
              region.link +
              scope.row.region_id +
              '/district/' +
              scope.row.link +
              '/' +
              scope.row.id
            "
          >
            {{ scope.row.ill_count }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="Qo'shilgan sana">
        <template #default="scope">
          <router-link
            class="table-link"
            :to="
              '/region/' +
              region.link +
              scope.row.region_id +
              '/district/' +
              scope.row.link +
              '/' +
              scope.row.id
            "
          >
            {{ formatDateTime(scope.row.date) }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Ammallar" align="right">
        <template #default="scope">
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

  <el-dialog
    v-model="isModal"
    :title="`${
      toggleBtn ? 'Tumanni tahrirlash' : region.title + ' tumanini qo`shing'
    }`"
    width="500px"
  >
    <el-form :model="districtList" label-position="top" class="mt-4">
      <el-form-item label="Tuman nomi *">
        <el-input
          v-model="districtList.title"
          placeholder="Misol: Ishtixon tumani"
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
              (isModal = false), (districtList = {});
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
      id: "",
      region: {},
      toggleBtn: false,
      districtList: {
        title: "",
      },
    };
  },
  computed: {
    districts() {
      return this.$store.getters.districts;
    },
  },
  methods: {
    add() {
      if (this.districtList.title) {
        this.districtList.date = new Date();
        this.districtList.region_id = this.region.id;
        this.districtList.ill_count = 0;
        this.districtList.link = this.districtList.title
          .toLowerCase()
          .trim()
          .replace(" ", "-");
        this.$store.dispatch("postDistrict", this.districtList);
        this.$message({
          message: `${this.districtList.title} muaffaqiyatli qo'shildi`,
          type: "success",
        });
        this.districtList = {};
        this.isModal = false;
      }
    },
    save() {
      if (this.districtList) {
        this.districtList.link = this.districtList.title
          .toLowerCase()
          .trim()
          .replace(" ", "-");
        this.$store.dispatch("editDistrict", this.districtList);
        this.$message({
          message: `${this.districtList.title}  muaffaqiyatli yangilandi.`,
          type: "success",
        });
        this.districtList = {};
        this.isModal = false;
        this.toggleBtn = false;
      }
    },
    formatDateTime(date) {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      const dateTime = new Date(date);

      const formattedDate = dateTime.toLocaleDateString("en-GB", options);

      return formattedDate.replace(/\//g, ".");
    },
    edit(id) {
      if (id) {
        this.$store.dispatch("getDistrict", id).then((res) => {
          this.districtList = res.data;
          this.isModal = true;
          this.toggleBtn = true;
        });
      }
    },
    deleteRegion(id) {
      if (id) {
        this.$store.dispatch("deleteDistrict", id);
        this.$message({
          message: "Tuman muaffaqiyatli o'chirildi.",
          type: "success",
        });
      }
    },
  },

  mounted() {
    this.id = this.$route.params.id;
    this.$store.dispatch("getRegion", this.id).then((res) => {
      this.region = res.data;
      document.title = res.data.title + " bo'yicha tumanlar";
    });

    this.$store.dispatch("allDistrict", this.id);
  },
};
</script>

<style lang="scss">
@import "../styles/pages/region.scss";
</style>