<template>
  <main-master-page>
    <div class="wrapper">
      <p class="title">Privacy Policy</p>
      <p class="sub-title">
        Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam,
        sollicitudin ante a, gravida arcu. Nam fringilla molestie velit, eget
        pellentesque risus scelerisque a. Nam ac urna maximus, tempor magna et,
        placerat urna. Curabitur eu magna enim. Proin placerat tortor lacus, ac
        sodales lectus placerat quis.
      </p>
      <p class="title_security">Security</p>
      <p class="sub-title">
        Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam,
        sollicitudin ante a, gravida arcu. Nam fringilla molestie velit, eget
        pellentesque risus scelerisque.
      </p>
      <p class="title-cookies">Cookies</p>
      <div class="sub-title">
        <p>
          Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam,
          sollicitudin.
        </p>
        <p>
          Nam fringilla molestie velit, eget pellentesque risus scelerisque a
        </p>
      </div>
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpage/MainMasterPage.vue";
export default {
  name: "PrivicyPolicyView",
  components: {
    MainMasterPage,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0px 5% 0px 5%;
}
.title {
  text-align: center;
  font-size: 33px;
  font-style: normal;
  font-weight: 500;
  line-height: 43px;
  // .title_security

  &_security {
    font-size: 26px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    text-transform: capitalize;
  }
}
.sub-title {
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 27px;
}

.title-cookies {
  font-size: 26px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
}
</style>