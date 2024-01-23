<template>
  <div>
    <alert-card :mesageAlert="textAllert" v-show="visibleAlert" />
    <!-- <alert-card :mesageAlert="$t()" v-show="visibleAlert" /> -->
    <div class="block__list">
      <product-card
        v-for="(product, index) in paginatedProducts"
        :key="index"
        :data-card="product"
        @addCart="addToCart"
        @addFavorite="addToFavorire"
      />
    </div>

    <div class="block_pagination">
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="totalPages"
          rounded="circle"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import AlertCard from "@/components/AlertCard.vue";
// import i18n from "@/plugins/i18n";

export default {
  name: "ListProducts",
  components: { ProductCard, AlertCard },
  data() {
    return {
      page: 1,
      itemsPerPage: 8, // Кількість продуктів на сторінці
      visibleAlert: false,
      textAllert: null,
      //   test
      dataP: [
        {
          img: require("@/assets/img/2.png"),
          title: {
            ua: "ua",
            en: "en",
          },
          price: "123",
        },
        {
          img: require("@/assets/img/2.png"),
          discount: 21,
          title: {
            ua: "ua",
            en: "en",
          },
          price: "123",
        },
        {
          img: require("@/assets/img/2.png"),

          title: {
            ua: "ua",
            en: "en",
          },
          price: "123",
        },
        {
          img: require("@/assets/img/2.png"),

          title: {
            ua: "ua",
            en: "en",
          },
          price: "123",
        },
        {
          img: require("@/assets/img/2.png"),

          title: {
            ua: "ua",
            en: "en",
          },
          price: "123",
        },
        {
          img: require("@/assets/img/2.png"),

          title: {
            ua: "ua",
            en: "en",
          },
          price: "123",
        },
        {
          img: require("@/assets/img/2.png"),

          title: {
            ua: "ua",
            en: "en",
          },
          price: "123",
        },
        {
          img: require("@/assets/img/2.png"),

          title: {
            ua: "ua",
            en: "en",
          },
          price: "123",
        },
      ],
    };
  },
  computed: {
    paginatedProducts() {
      const startIndex = (this.page - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.dataP.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.dataP.length / this.itemsPerPage);
    },
  },
  methods: {
    addToCart() {
      this.visibleAlert = true;
      this.textAllert = this.$t("alertMessage.addBasket");
      this.closeAlert();
    },
    addToFavorire() {
      this.visibleAlert = true;
      this.textAllert = this.$t("alertMessage.addFavorite");
      this.closeAlert();
    },
    closeAlert() {
      setTimeout(() => {
        this.visibleAlert = false;
        this.textAllert = null;
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
.block__list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  // gap: 5%;
  justify-content: center;
}

.block_pagination {
  margin-top: 20px;
}
</style>
