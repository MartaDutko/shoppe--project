<template>
  <v-carousel
    hide-delimiters
    hide-controls
    :cycle="true"
    :show-arrows="false"
    :height="customCarousel"
  >
    <v-carousel-item
      v-for="(photo, index) in photos"
      :key="index"
      :cover="true"
      :src="photo"
    >
      <div class="carousel-info">
        <div class="block-tittle">
          <p class="tittle">Gold big hoops</p>
          <p class="sub-tittle">$ 68,00</p>
        </div>
        <div @click="onClick" class="block-btn">
          <v-btn variant="outlined" class="btn-view">
            {{ $t("btnTitles.vievProduct") }}
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
      customCarousel: "80vh",
      photos: [require("@/assets/img/1.png"), require("@/assets/img/1.png")],
    };
  },
  methods: {
    onClick() {
      this.$emit("onShop");
    },
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