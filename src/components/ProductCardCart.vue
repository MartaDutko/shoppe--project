<template>
  <div>
    <v-card>
      <v-card-item>
        <div class="block_card">
          <div class="block_img">
            <img :src="dataProducts.product.img" />
          </div>
          <div class="block_title">
            <v-card-title>
              <p class="title">{{ localTitle }}</p>
              <p class="sub-title">{{ dataProducts.product.price }}</p>
            </v-card-title>
          </div>
          <div class="counter-button">
            <v-btn-toggle>
              <v-btn @click="decrement(dataProducts)">
                <v-icon>mdi-minus</v-icon>
              </v-btn>

              <div class="non-clickable-btn">
                {{ dataProducts.count }}
              </div>
              <v-btn @click="increment(dataProducts)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-btn-toggle>
          </div>
          <div class="block-delete">
            <!-- delete -->
            <v-btn-toggle>
              <v-btn @click="deleteProduct(dataProducts)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-btn-toggle>
          </div>
        </div>
      </v-card-item>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ProductCardCart",
  props: {
    dataProducts: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    localTitle() {
      return this.$i18n.locale === "ua"
        ? this.dataProducts.product.title.ua
        : this.dataProducts.product.title.en;
    },
  },
  methods: {
    increment(dataProducts) {
      this.$emit("increment", dataProducts.product.id);
    },
    decrement(dataProducts) {
      this.$emit("decrement", dataProducts.product.id);
    },
    deleteProduct(dataProducts) {
      this.$emit("deleteProduct", dataProducts.product.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  // .block_card

  &_card {
    // width: 50%;
    display: flex;
    justify-content: space-around;
  }

  // .block_img

  &_img {
    width: 10%;
    img {
      max-width: 100%;
    }
  }
}
.title {
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
}
.sub-title {
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 27px;
  color: #a18a68;
}
.non-clickable-btn {
  align-self: center;
}
</style>