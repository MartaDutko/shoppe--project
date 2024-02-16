<template>
  <div>
    <alert-card :mesageAlert="textAllert" v-show="visibleAlert" />
    <div class="block__list">
      <div v-for="(product, index) in paginatedProducts" :key="index">
        <product-card
          :data-card="product"
          @addCart="addToCart"
          @addFavorite="addToFavorire"
        />
        <div class="block_btns">
          <v-btn
            v-if="userPermissions.delete"
            icon
            @click="deleteProduct(product.id)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn v-if="userPermissions.update" icon @click="onEdit(product)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
      </div>
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ListProducts",
  components: { ProductCard, AlertCard },
  props: {
    dataProduct: {
      type: Array,
      default: () => [],
      require: true,
    },
  },
  data() {
    return {
      page: 1,
      itemsPerPage: 8, // Кількість продуктів на сторінці
      visibleAlert: false,
      textAllert: null,
    };
  },
  computed: {
    ...mapGetters("auth", ["getUser"]),
    ...mapGetters("favorites", ["getFavorites"]),
    ...mapGetters("users", ["userPermissions"]),
    paginatedProducts() {
      const startIndex = (this.page - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.dataProduct.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.dataProduct.length / this.itemsPerPage);
    },
  },
  methods: {
    ...mapActions("cart", ["addInUidByDataCart"]),
    ...mapActions("favorites", ["addFavorite"]),
    ...mapActions("products", ["deleteProduct"]),
    addToCart(obj) {
      if (this.getUser) {
        this.addInUidByDataCart(obj);
        this.visibleAlert = true;
        this.textAllert = this.$t("alertMessage.addBasket");
        this.closeAlert();
      } else {
        this.$router.push({
          name: "login",
        });
      }
    },
    addToFavorire(obj) {
      if (this.getUser) {
        this.addFavorite(obj.id);
        this.visibleAlert = true;
        this.textAllert = this.$t("alertMessage.addFavorite");
        this.closeAlert();
      } else {
        this.$router.push({
          name: "login",
        });
      }
    },
    onEdit(product) {
      this.$router.push({
        name: "admin_add",
        params: { id: product.id },
      });
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
  justify-content: center;
}

.block_pagination {
  margin-top: 20px;
}
.block_btns {
  display: flex;
  justify-content: center;
  gap: 15%;
}
</style>
