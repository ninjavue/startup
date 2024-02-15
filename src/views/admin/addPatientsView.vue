<template>
  <el-card>
    <div class="card-head">
      <h1>{{ district.title }} bo'yicha bemorlar ro'yhati</h1>
      <el-button
        @click="
          {
            (isModal = true), (patientList = {}), (toggleBtn = false);
          }
        "
        type="primary"
      >
        Bemor kiritish
      </el-button>
    </div>
    <el-table class="mt-4" :data="patients">
      <el-table-column label="№" width="50px">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="Rasm" width="80px">
        <template #default="scope">
          <el-avatar shape="square" size="50" :src="scope.row.image" />
        </template>
      </el-table-column>

      <el-table-column label="F.I.O">
        <template #default="scope">
          {{ scope.row.last_name }} {{ scope.row.first_name }}
          {{ scope.row.father_name }}
        </template>
      </el-table-column>
      <el-table-column label="Passport">
        <template #default="scope">
          {{ scope.row.passport }}
        </template>
      </el-table-column>
      <el-table-column label="Kassalik turi">
        <template #default="scope">
          {{ IllType(scope.row.ill_type) }}
        </template>
      </el-table-column>
      <el-table-column label="Mahallasi">
        <template #default="scope">
          {{ scope.row.neighborhood }}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="Kasallik a-q sana">
        <template #default="scope">
          {{ formatDateTime(scope.row.patient_start) }}
        </template>
      </el-table-column>
      <el-table-column prop="date" label="Tizmga q-q sana">
        <template #default="scope">
          {{ formatDateTime(scope.row.date) }}
        </template>
      </el-table-column>
      <el-table-column label="Ammallar" align="right">
        <template #default="scope">
          <el-button type="primary" @click="edit(scope.row.id)">
            <i class="fa-solid fa-pen-to-square"></i>
          </el-button>
          <el-button type="danger" @click="deletePatient(scope.row.id)">
            <i class="fa-solid fa-trash"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!-- dialog code  -->
  <el-dialog
    v-model="isModal"
    :title="`${toggleBtn ? 'Bemorni tahrirlash' : 'Yangi bemor'}`"
    width="800px"
  >
    <el-form :model="patientList" label-position="top" class="mt-4">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="Familiyasi *">
            <el-input
              v-model="patientList.last_name"
              placeholder="Misol: Xalbekov"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Ism *">
            <el-input
              v-model="patientList.first_name"
              placeholder="Misol: Valibek"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Otasini ismi *">
            <el-input
              v-model="patientList.father_name"
              placeholder="Misol: Ali o'g'li"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Passport seriyasi *">
            <el-input
              v-model="patientList.passport"
              placeholder="Misol: AA1234567"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Tug'ulgan sana *" style="width: 100%">
            <div class="demo-date-picker" style="width: 100%">
              <div class="block w-full" style="width: 100%">
                <el-date-picker
                  style="width: 100%"
                  v-model="patientList.birth_date"
                  type="date"
                  placeholder="Sanani tanlang"
                />
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Kassalik turi *">
            <el-select v-model="patientList.ill_type">
              <el-option
                v-for="(item, index) of ills"
                :key="index"
                :label="item.title"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Bemor rasmi *">
            <div style="display: flex">
              <div
                v-if="!fileImage"
                class="upload"
                for="image"
                @click="uploadImage"
              >
                <i class="fa-solid fa-plus"></i>
              </div>
              <input
                @change="imageHandle"
                type="file"
                accept="image/*"
                ref="imageInput"
                style="display: none"
              />
              <img
                class="upload-image"
                :src="fileImage"
                alt="Tanlangan Rasm"
                v-if="fileImage"
              />
              <div class="gr-btn" v-if="fileImage">
                <el-button circle type="primary" @click="imageViewHandle">
                  <i class="fa-solid fa-magnifying-glass-plus"></i>
                </el-button>
                <el-button type="danger" circle @click="imageDelHandle">
                  <i class="fa-solid fa-trash-can"></i>
                </el-button>
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Kasalik boshlangan sana *" style="width: 100%">
            <div class="demo-date-picker" style="width: 100%">
              <div class="block w-full" style="width: 100%">
                <el-date-picker
                  style="width: 100%"
                  v-model="patientList.patient_start"
                  type="date"
                  placeholder="Sanani tanlang"
                  size="large"
                />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="Mahhalla *">
            <el-input
              v-model="patientList.neighborhood"
              placeholder="Misol: Tadbirkorlar mahallasi"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
              (isModal = false), (patientList = {});
            }
          "
          type="danger"
          >Bekor qilish</el-button
        >
      </div>
    </el-form>
  </el-dialog>
  <el-dialog v-model="dialogVisible" style="max-width: 400px; max-height: auto">
    <img
      style="width: 100%; height: auto"
      :src="dialogImageUrl"
      alt="Preview Image"
    />
  </el-dialog>
</template>
  
  <script>
export default {
  data() {
    return {
      id: "",
      isModal: false,
      toggleBtn: false,
      district: {},
      patientList: {},
      options: ["OITS", "OIV"],
      fileImage: "",
      dialogVisible: false,
      dialogImageUrl: "",
      showImage: false,
      image:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
    };
  },
  computed: {
    patients() {
      return this.$store.getters.patients;
    },
    ills() {
      return this.$store.getters.ills;
    },
  },

  methods: {
    imageViewHandle() {
      this.dialogImageUrl = this.fileImage;
      this.dialogVisible = true;
    },
    imageDelHandle() {
      this.fileImage = "";
    },
    uploadImage() {
      this.$refs.imageInput.click();
    },
    imageHandle(event) {
      const file = event.target.files[0];
      if (file) {
        const image = URL.createObjectURL(file);
        this.fileImage = image;
      }
    },
    IllType(id) {
      let t = "";
      this.ills.map((ill) => {
        if (ill.id == id) {
          t = ill.title;
        }
      });
      return t;
    },
    add() {
      if (
        this.patientList.first_name &&
        this.patientList.last_name &&
        this.patientList.father_name &&
        this.patientList.passport &&
        this.patientList.ill_type &&
        this.patientList.patient_start &&
        this.patientList.neighborhood &&
        this.patientList.birth_date
      ) {
        this.patientList.date = new Date();
        this.patientList.image = this.image;
        this.patientList.district_id = this.district.id;
        this.patientList.region_id = this.id;
        this.$store.dispatch("postPatient", this.patientList);
        this.$message({
          message: `Bemor muaffaqiyatli qo'shildi.`,
          type: "success",
        });
        this.patientList = {};
        this.isModal = false;
      }
    },
    edit(id) {
      if (id) {
        this.$store.dispatch("getPatient", id).then((res) => {
          this.patientList = res.data;
          this.isModal = true;
          this.toggleBtn = true;
          this.fileImage = this.image;
        });
      }
    },
    save() {
      if (
        this.patientList.first_name &&
        this.patientList.last_name &&
        this.patientList.father_name &&
        this.patientList.passport &&
        this.patientList.ill_type &&
        this.patientList.patient_start &&
        this.patientList.neighborhood &&
        this.patientList.birth_date
      ) {
        this.$store.dispatch("editPatient", this.patientList);
        this.$message({
          message: `Bemor muaffaqiyatli yangilandi.`,
          type: "success",
        });
        this.patientList = {};
        this.isModal = false;
        this.toggleBtn = false;
      }
    },
    deletePatient(id) {
      if (id) {
        this.$store.dispatch("deletePatient", id);
        this.$message({
          message: "Bemor muaffaqiyatli o'chirildi.",
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
    this.id = this.$route.params.id;
    this.$store.dispatch("getDistrict", this.id).then((res) => {
      this.district = res.data;
      this.$store.dispatch("allPatient", res.data.id);
      document.title = `${res.data.title} bo'yicha bemorlar`;
    });
  },
};
</script>
  
  <style lang="scss" scoped>
@import "../../styles/admin/region.scss";

.upload {
  width: 120px;
  height: 120px;
  border: 1px dashed #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    border: 1px dashed #4980e6;
    & i {
      color: #4980e6;
    }
  }
  & i {
    font-size: 32px;
    color: #ccc;
  }
  &-image {
    width: 120px;
    height: 120px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
}

.gr-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  & .el-button:last-child {
    margin-top: 6px;
    margin-left: -1px;
  }
}
</style>