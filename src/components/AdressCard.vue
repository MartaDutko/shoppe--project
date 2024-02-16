<template>
  <div class="wrapper_adress">
    <div class="block_shipping">
      <p class="shipping_title">SHIPPING</p>
    </div>
    <div>
      <p class="shipping_subTitle">
        Shipping costs will be calculated once you have provided address.
      </p>
      <v-sheet width="300" class="mx-auto">
        <v-form fast-fail @submit.prevent>
          <v-text-field
            v-model="cityName"
            label="CITY"
            :rules="cityNameRules"
          ></v-text-field>

          <v-text-field
            v-model="postCode"
            label="POST CODE / ZIP"
            :rules="postCodeRules"
          ></v-text-field>
        </v-form>
      </v-sheet>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdressCard",
  data() {
    return {
      cityName: "",
      cityNameRules: [
        (value) => {
          if (value?.length > 3) return true;

          return "City name must be at least 3 characters.";
        },
      ],
      postCode: "",
      postCodeRules: [
        (value) => {
          if (/[^0-9]/.test(value)) return true;

          return "POST CODE / ZIP";
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper_adress {
  display: flex;
  gap: 10px;
}
.shipping {
  // .shipping_title

  &_title {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 27px;
  }

  // .shipping_subTitle

  &_subTitle {
    font-size: 16px;
    width: 300px;
    padding: 0px 0px 20px 0px;
    font-style: normal;
    font-weight: 400;
    line-height: 27px;
    color: #707070;
  }
}
</style>