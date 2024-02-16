<template>
  <main-master-page>
    <p class="title_cart">Shopping Cart</p>
    <p v-if="emptyBasketMassage" class="title_cart">
      {{ $t("userAccountMessage.emptyBasket") }}
    </p>
    <div v-else class="block_orderProcess">
      <div>
        <product-card-cart
          v-for="product in getCart.dataCart"
          :key="product"
          :data-products="product"
          @increment="increment"
          @decrement="decrement"
          @deleteProduct="deleteProduct"
        />
      </div>
      <adress-card />
    </div>
    <div class="wraper_totalPrice">
      <div class="block_totalPrice">
        <p class="title-price">Total:</p>
        <p class="total-price">{{ getCartSum }}$</p>
      </div>
      <div v-show="!emptyBasketMassage">
        <v-btn class="btn-buy" variant="tonal"> Buy </v-btn>
      </div>
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpage/MainMasterPage.vue";
import ProductCardCart from "@/components/ProductCardCart.vue";
import AdressCard from "@/components/AdressCard.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "BasketView",

  components: {
    MainMasterPage,
    ProductCardCart,
    AdressCard,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("cart", ["getCart", "getCartSum"]),
    emptyBasketMassage() {
      if (this.getCartSum === 0) {
        console.log("empty");
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapActions("cart", ["updateCartCount", "deleteProductByCart"]),
    increment(idProduct) {
      this.updateCartCount({ idProduct, operation: "add" });
    },
    decrement(idProduct) {
      this.updateCartCount({ idProduct, operation: "minus" });
    },
    deleteProduct(idProduct) {
      this.deleteProductByCart(idProduct);
    },
  },
};
</script>

<style lang="scss" scoped>
.title_cart {
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  padding: 0 0 70px 0;
}
.block_orderProcess {
  display: flex;
  justify-content: space-between;
}
.btn-buy {
  color: white;
  background-color: #000000;
}
.wraper_totalPrice {
  padding: 5% 5% 5% 5%;
  display: flex;
  justify-content: space-between;
}
.block {
  // .block_totalPrice

  &_totalPrice {
    width: 30%;
    display: flex;
    justify-content: space-between;
  }
}
.title-price {
  font-size: 20px;
  font-weight: 700;
}
.total-price {
  font-weight: 700;
}
</style>