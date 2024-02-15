<template>
  <el-card>
    <div class="card-head">
      <h1>Kasalliklar ro'yhati</h1>
      <el-button
        @click="
          {
            (isModal = true), (illList = {}), (toggleBtn = false);
          }
        "
        type="primary"
      >
        Viloyat kiritish
      </el-button>
    </div>
    <el-table class="mt-4" :data="ills">
      <el-table-column label="№" width="80px">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="Kasallik nomi">
        <template #default="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Ehtiyot choralari">
        <template #default="scope">
          {{ scope.row.text }}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="Qo'shilgan sana">
        <template #default="scope">
          {{ formatDateTime(scope.row.date) }}
        </template>
      </el-table-column>
      <el-table-column label="Ammallar" align="right">
        <template #default="scope">
          <el-button type="primary" @click="edit(scope.row.id)">
            <i class="fa-solid fa-pen-to-square"></i>
          </el-button>
          <el-button type="danger" @click="deleteIll(scope.row.id)">
            <i class="fa-solid fa-trash"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!-- dialog code  -->
  <el-dialog
    v-model="isModal"
    :title="`${toggleBtn ? 'Kasallik tahrirlash' : 'Yangi kasillik'}`"
    width="500px"
  >
    <el-form :model="illList" label-position="top" class="mt-4">
      <el-form-item label="Kasallik nomi *">
        <el-input v-model="illList.title" placeholder="Misol: OITS"> </el-input>
      </el-form-item>
      <el-form-item label="Ehtiyot choralari *">
        <el-input
          v-model="illList.text"
          :rows="2"
          type="textarea"
          placeholder="Misol: Qo'lni yuvish...."
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
              (isModal = false), (illList = {});
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
      illList: {},
    };
  },
  computed: {
    ills() {
      return this.$store.getters.ills;
    },
  },

  methods: {
    add() {
      if (this.illList.title && this.illList.text) {
        this.illList.date = new Date();
        this.illList.title = this.illList.title.toUpperCase();
        this.$store.dispatch("postIll", this.illList);
        this.$message({
          message: `${this.illList.title} muaffaqiyatli qo'shildi.`,
          type: "success",
        });
        this.illList = {};
        this.isModal = false;
      }
    },
    edit(id) {
      if (id) {
        this.$store.dispatch("getIll", id).then((res) => {
          this.illList = res.data;
          this.isModal = true;
          this.toggleBtn = true;
        });
      }
    },
    save() {
      if (this.illList) {
        this.illList.title = this.illList.title.toUpperCase();
        this.$store.dispatch("editIll", this.illList);
        this.$message({
          message: `${this.illList.title}  muaffaqiyatli yangilandi.`,
          type: "success",
        });
        this.illList = {};
        this.isModal = false;
        this.toggleBtn = false;
      }
    },
    deleteIll(id) {
      if (id) {
        this.$store.dispatch("deleteIll", id);
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
    document.title = "Kasalliklar ro'yhati";
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/admin/region.scss";
</style>