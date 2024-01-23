<template>
  <main-master-page>
    <!-- <div v-if="showAlert">
      <alert-card />
    </div> -->
    <div class="wraper_home block-home">
      <slider-page />
      <div class="block-home-title">
        <!-- <title-component title="Shop The Latest" />
         -->
        <h3>{{ $t("titles.shopLatest") }}</h3>
      </div>
      <div class="block_productsList">
        <list-products />
      </div>
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpage/MainMasterPage.vue";
import SliderPage from "@/components/SliderPage.vue";
// import TitleComponent from "@/components/TitleComponent.vue";
import ListProducts from "@/views/HomeView/ListProducts.vue";
//
// import AlertCard from "@/components/AlertCard.vue";
export default {
  name: "HomeView",
  components: {
    MainMasterPage,
    SliderPage,
    // TitleComponent,
    ListProducts,
    // AlertCard,
  },
  // data() {
  //   return {
  //     showAlert: false,
  //   };
  // },
  // methods: {
  //   onBanner() {
  //     this.showAlert = true;
  //     this.closeAlert();
  //   },
  //   closeAlert() {
  //     setTimeout(() => {
  //       this.showAlert = false;
  //     }, 3000);
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.wraper {
  // .wraper_home

  &_home {
  }
}
.block-home {
}
.block-home-title {
  margin: 5% 0px 5% 0px;
}
</style>