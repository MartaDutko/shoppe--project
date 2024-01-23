<template>
  <main-master-page>
    <div class="wrapper__error">
      <p class="title__error">404 ERROR</p>
      <p class="sub_titleError">
        This page not found, back to home and start again
      </p>
      <div class="btn">
        <v-btn variant="outlined" @click="toMain"> HOMEPAGE </v-btn>
      </div>
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpage/MainMasterPage.vue";
export default {
  name: "ErrorView",
  components: {
    MainMasterPage,
  },
  methods: {
    toMain() {
      this.$router.push({
        name: "home",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  // .wrapper__error

  &__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
    gap: 30px;
  }
}
.title {
  // .title__error

  &__error {
    font-size: 33px;
    font-style: normal;
    font-weight: 500;
    line-height: 43px;
  }
}
.sub {
  // .sub_titleError

  &_titleError {
    color: #707070;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
  }
}
.btn {
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 16px 49px 16px 49px;
}
</style>