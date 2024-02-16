<template>
  <div>
    <div v-if="hasFavorites" class="favorites-block">
      <product-card
        v-for="product in getFavoritesList"
        :key="product"
        :dataIconHeart="false"
        :dataCard="product"
        @addCart="addToCart"
        @deleteFavorite="deleteFavorite"
      />
    </div>
    <message-card v-else :titel="$t('userAccountMessage.emptyFavorite')" />
  </div>
</template>

<script>
import MessageCard from "@/components/MessageCard.vue";
import ProductCard from "@/components/ProductCard.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "FavoritesView",
  components: {
    MessageCard,
    ProductCard,
  },
  computed: {
    ...mapGetters("favorites", ["getFavoritesList"]),
    hasFavorites() {
      return this.getFavoritesList.length > 0;
    },
  },
  methods: {
    ...mapActions("cart", ["addInUidByDataCart"]),
    ...mapActions("favorites", ["addFavorite"]),
    addToCart(obj) {
      this.addInUidByDataCart(obj);
    },
    deleteFavorite(obj) {
      this.addFavorite(obj.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.favorites-block {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>