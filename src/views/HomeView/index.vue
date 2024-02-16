<template>
  <main-master-page>
    <div class="wraper_home block-home">
      <slider-page @onShop="onShop" />
      <div class="block-home-title">
        <h3>{{ $t("titles.shopLatest") }}</h3>
      </div>
      <div ref="blockProductsList" class="block_productsList">
        <list-products :dataProduct="getProducts" />
      </div>
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpage/MainMasterPage.vue";
import SliderPage from "@/components/SliderPage.vue";
import ListProducts from "@/views/HomeView/ListProducts.vue";
import { mapGetters } from "vuex";
export default {
  name: "HomeView",
  components: {
    MainMasterPage,
    SliderPage,
    ListProducts,
  },
  computed: {
    ...mapGetters("products", ["getProducts"]),
  },
  methods: {
    onShop() {
      const targetElement = this.$refs.blockProductsList;
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.block-home-title {
  margin: 5% 0px 5% 0px;
}
</style>