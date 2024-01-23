<template>
  <v-carousel hide-delimiters hide-controls :cycle="true" :show-arrows="false">
    <v-carousel-item
      v-for="(photo, index) in photos"
      :key="index"
      :cover="true"
      :src="photo"
    >
      <!-- потрібно передавати пропсом обєкт і передавати ціну і назву -->

      <!-- currentCurrency() {
      return this.languageTitle === "ua" ? "₴" : "$";
    }, і потрібно зробити метод заміни валюти -->

      <div class="carousel-info">
        <div class="block-tittle">
          <p class="tittle">Gold big hoops</p>
          <p class="sub-tittle">$ 68,00</p>
        </div>
        <div class="block-btn">
          <v-btn variant="outlined" class="btn-view">
            {{ $t("btnTitles.vievProdyct") }}
          </v-btn>
        </div>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>


<script>
export default {
  name: "SliderPage",
  data() {
    return {
      photos: [require("@/assets/img/1.png"), require("@/assets/img/1.png")],
    };
  },
};
</script>
<style lang="scss">
.carousel-info {
  max-width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #ffffff;
  padding: 5%;
}
.tittle {
  font-size: 33px;
  font-style: normal;
  font-weight: 500;
  line-height: 43px;
}
.sub-tittle {
  font-size: 26px;
  font-style: normal;
  font-weight: 400;
  line-height: 35px;
}
.block-btn {
  padding: 31px 14px 31px 14px;
}
.btn-view {
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
}
</style>