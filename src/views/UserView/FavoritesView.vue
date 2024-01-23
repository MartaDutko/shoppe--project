<template>
  <div>
    <!--  -->
    <div v-if="hasFavorites" class="favorites-block">
      {{ getFavoritesData }}
    </div>
    <!--  -->
    <message-card v-else :titel="$t('userAccountMessage.emptyFavorite')" />
  </div>
</template>

<script>
import MessageCard from "@/components/MessageCard.vue";
import { mapGetters } from "vuex";
export default {
  name: "FavoritesView",
  components: {
    MessageCard,
  },
  computed: {
    ...mapGetters("favorites", ["getFavoritesData"]),
    hasFavorites() {
      return this.getFavoritesData.length > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>