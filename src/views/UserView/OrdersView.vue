<template>
  <div class="wrapper__order">
    <div v-if="hasOrders" class="order__block">
      <div
        v-for="order in getOrdersData"
        :key="order.id"
        class="order-info-block"
      >
        <div class="order-info">
          <span>Ваше замовлення №. </span>
          <span>{{ order.id }}</span>
          <span> від </span>
          <span>{{ carrentDate }}</span>
        </div>
        <div class="order-status">
          {{ order.status }}
        </div>
      </div>
    </div>
    <message-card v-else :titel="$t('userAccountMessage.emptyOrders')" />
  </div>
</template>

<script>
import MessageCard from "@/components/MessageCard.vue";
import { mapGetters } from "vuex";
//
export default {
  name: "OrdersView",
  components: {
    MessageCard,
  },

  computed: {
    ...mapGetters("orders", ["getOrdersData"]),
    hasOrders() {
      return this.getOrdersData.length > 0;
    },
    carrentDate() {
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      return `${day}.${month}.${year}`;
    },
  },
};
</script>

<style lang="scss" scoped>
// .wrapper {
//   // .wrapper__order

//   &__order {
//   }
// }
.order {
  // .order__block

  &__block {
    display: flex;
    flex-direction: column;
    gap: 20px;
    // padding: 15px 10px 15px 10px;
  }
}
.order-info-block {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #a18a68;
  border-bottom: 1px solid #a18a68;
  padding: 10px 10px 10px 10px;
}
.order-info {
}
.order-status {
}

// .order {
//   // .order__block-title

//   &__block-title {
//     background-color: #efefef;
//     padding: 20px 0px 20px 40px;
//     border-top: 1px solid #a18a68;
//     p {
//       font-size: 16px;
//       font-style: normal;
//       font-weight: 400;
//       line-height: 27px;
//     }
//   }
// }
</style>