<template>
  <main-master-page>
    <div class="wrapper_product">
      <div class="block_filter">
        <select-filter :itemsData="categoriesData" @choseItem="choseItem" />
      </div>

      <div class="block_products">
        <p v-if="!filteredList">oops</p>
        <template v-else
          ><list-products :dataProduct="filteredList"
        /></template>
      </div>
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpage/MainMasterPage.vue";
import ListProducts from "@/views/HomeView/ListProducts.vue";
import SelectFilter from "@/components/SelectFilter.vue";
import categoriesData from "@/views/BlogView/data/categoriesData";
import { mapGetters } from "vuex";
export default {
  name: "BlogView",
  components: {
    MainMasterPage,
    ListProducts,
    SelectFilter,
  },
  data() {
    return {
      categoriesData: categoriesData,
      choseCategory: null,
    };
  },
  computed: {
    ...mapGetters("products", ["getProductsByCategory", "getProducts"]),
    filteredList() {
      return this.getProductsByCategory(this.choseCategory);
    },
  },
  methods: {
    choseItem(val) {
      console.log(val);
      this.choseCategory = val == "all" ? null : val;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  // .wrapper_product

  &_product {
    display: flex;
    justify-content: space-between;
  }
}
.block {
  // .block_filter

  &_filter {
    width: 30%;
  }

  // .block_products

  &_products {
    width: 60%;
  }
}
</style>