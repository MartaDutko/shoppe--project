<template>
  <main-master-page>
    <div class="block__login">
      <h2 class="title__login">{{ $t("titles.account") }}</h2>
      <div class="form_login_btn">
        <v-col cols="12" class="py-2">
          <v-btn-toggle v-model="btnForm" rounded="2" group>
            <v-btn value="singIn" class="btnLogin" @click="onSingIn">
              {{ $t("btnTitles.singIn") }}
            </v-btn>
            <v-btn value="register" class="btnLogin" @click="onRegister">
              {{ $t("btnTitles.registrater") }}
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </div>

      <component :is="currentComponent" />
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpage/MainMasterPage.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import SingInForm from "@/components/SingInForm.vue";
import { mapGetters } from "vuex";

export default {
  name: "LoginView",
  components: {
    MainMasterPage,
    SingInForm,
    RegisterForm,
  },
  data() {
    return {
      currentComponent: "SingInForm",
      btnForm: "register",
    };
  },
  computed: {
    ...mapGetters(["getError"]),
  },

  methods: {
    onSingIn() {
      this.currentComponent = "SingInForm";
    },
    onRegister() {
      this.currentComponent = "RegisterForm";
    },
  },
};
</script>

<style lang="scss" scoped>
.block__login {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  .title__login {
    font-size: 33px;
    font-style: normal;
    font-weight: 500;
    line-height: 43px;
  }
  .form_login_btn {
    width: 500px;
    background-color: #efefef;
    border-radius: 5px;
    .btnLogin {
      width: 50%;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px;
    }
    .v-btn-group {
      width: 100%;
    }
  }
}
</style>