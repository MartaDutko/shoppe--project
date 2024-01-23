<template>
  <div
    class="block_product"
    @mouseenter="showIcons = true"
    @mouseleave="showIcons = false"
  >
    <v-card class="mx-auto" max-width="200" hover>
      <v-card-item>
        <div v-show="dataCard.discount" class="block__discount">
          <span>-</span> {{ dataCard.discount }} <span>%</span>
        </div>
        <img :src="dataCard.img" alt="picture product" />
        <v-card-subtitle class="title_product">{{
          languageTitle
        }}</v-card-subtitle>
      </v-card-item>

      <v-card-text class="product_sub-tittle">
        {{ dataCard.price }}<span>₴</span>
      </v-card-text>

      <!-- блок для чорного фону та іконок -->
      <div class="overlay">
        <v-icon class="icon heart" @click="addToFavorites">mdi-heart</v-icon>
        <v-icon class="icon cart" @click="addToCart">mdi-cart</v-icon>
      </div>
    </v-card>
  </div>
</template>


<script>
export default {
  name: "ProductCard",
  props: {
    dataCard: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      showIcons: false,
    };
  },
  computed: {
    languageTitle() {
      return this.$i18n.locale === "ua"
        ? this.dataCard.title.ua
        : this.dataCard.title.en;
    },

    // currentCurrency() {
    //   return this.languageTitle === "ua" ? "₴" : "$";
    // },
  },
  methods: {
    addToCart() {
      console.log("Додано в корзину");
      this.$emit("addCart");
    },
    addToFavorites() {
      console.log("Додано в улюблене");
      this.$emit("addFavorite");
    },
  },
};
</script>

<style lang="scss" scoped>
.block_product {
  margin: 2% 2% 2% 0;
}
.product_tittle {
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
}

.product_sub-tittle {
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
  text-transform: capitalize;
  color: #a18a68;
}

.block__discount {
  position: absolute;
  padding: 2px 8px;
  color: white;
  background-color: #a18a68;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.overlay:hover {
  opacity: 1;
}

.icon {
  font-size: 20px;
  color: white;
  margin: 0 10px;
  cursor: pointer;
  transition: transform 0.3s;
}

.icon:hover {
  transform: scale(1.2);
}
.heart:hover {
  color: white;
}
.cart:hover {
  color: black;
}
img {
  max-width: 100%;
}
</style>
