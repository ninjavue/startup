<template>
  <el-card>
    <div class="card-head">
      <h1>Bemorni qidirish</h1>
    </div>

    <el-row :gutter="20">
      <el-col :span="10">
        <el-form
          class="search-border"
          label-position="top"
          label-width="100px"
          :model="searchList"
          style="max-width: 460px; min-height: 100%; padding: 5px 10px"
        >
          <el-form-item label="Familiya *">
            <el-input v-model="searchList.first_name" placeholder="Familiya" />
          </el-form-item>
          <el-form-item label="Ism *">
            <el-input v-model="searchList.last_name" placeholder="Ism" />
          </el-form-item>
          <el-form-item label="Otasi *">
            <el-input v-model="searchList.father_name" placeholder="Otasi" />
          </el-form-item>
          <el-form-item label="Viloyatni tanlang *">
            <el-select
              v-model="searchList.region"
              class="mt-2"
              placeholder="Viloyatni tanlang."
              width="100%"
              @change="handleSelectChange"
              id="regionId"
            >
              <el-option
                v-for="item of regions"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Tumanni tanlang *">
            <el-select
              v-model="searchList.district"
              class="mt-2"
              placeholder="Tumanni tanlang."
              width="100%"
            >
              <el-option
                v-for="item of districts"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              />
            </el-select>
          </el-form-item>

          <div align="right">
            <el-button @click="resetList">
              <i class="fa-solid fa-xmark mr-2"></i> Bekor qilish
            </el-button>
            <el-button type="primary" @click="add">
              <i class="fa-solid fa-magnifying-glass mr-2"></i> Qidirish
            </el-button>
          </div>
        </el-form>
      </el-col>
      <el-col :span="14" class="search-border">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-avatar
              class="search-avatar"
              shape="square"
              size="150"
              :src="squareUrl"
            />
          </el-col>
          <el-col :span="18">
            <div class="search-box">
              <div><b>Familiyasi: </b>Boltayev</div>
              <div><b>Ismi: </b>Teshabek</div>
              <div><b>Otasi: </b>Qilichbek o'g'li</div>
              <div><b>Tug'ulgan sanasi: </b>20.04.1989</div>
              <div><b>Kasallik darajasi: </b>2-DARAJA</div>
            </div>
          </el-col>
          <el-col :span="24" class="search-result">
            <div><b>Hujjat raqami: </b>AA1234567</div>
            <div><b>Bemorda kasallik: </b>02.11.2007 da aniqlangan.</div>
            <div>
              <b>Manzil: </b>Toshkent shahri Yunusobod tumani Usta Shirin MFY
            </div>
            <div align="center">
              <b class="pt-5">Ehtiyot choralari</b>
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
              aspernatur natus mollitia commodi, repellat corrupti. Reiciendis
              minima nulla labore dolor facere, est ab odit autem dolores
              corrupti quas animi possimus?
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      searchList: {},
    };
  },

  computed: {
    regions() {
      return this.$store.getters.regions;
    },
    districts() {
      return this.$store.getters.districts;
    },
  },
  methods: {
    resetList() {
      this.searchList = {};
    },
    handleSelectChange() {
      this.$store.dispatch("allDistrict", this.searchList.region);
    },
    add() {
      console.log(this.searchList);
    },
  },
  mounted() {
    document.title = "O'zbekiston Respublikasi Sog'liqni Saqlash Vazirlig";
  },
};
</script>

<style lang="scss">
@import "../../styles/admin/search.scss";
</style>