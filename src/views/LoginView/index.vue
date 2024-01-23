<template>
  <main-master-page>
    <div class="block__login">
      <alert-card
        :mesageAlert="messageError"
        typeAlert="error"
        v-show="visibleAlert"
      />
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
//
import RegisterForm from "@/components/RegisterForm.vue";
import SingInForm from "@/components/SingInForm.vue";
import AlertCard from "@/components/AlertCard.vue";
import { mapGetters } from "vuex";

export default {
  name: "LoginView",
  components: {
    MainMasterPage,
    SingInForm,
    RegisterForm,
    AlertCard,
  },
  data() {
    return {
      currentComponent: "SingInForm",
      btnForm: "register",
      messageError: null,
      visibleAlert: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["getError"]),
  },
  watch: {
    getError(newValue) {
      if (newValue) {
        this.errorMessage();
        this.visibleAlert = true;
      }
    },
  },

  methods: {
    closeAlert() {
      setTimeout(() => {
        this.visibleAlert = false;
        this.messageError = null;
      }, 3000);
    },
    onSingIn() {
      this.currentComponent = "SingInForm";
    },
    onRegister() {
      this.currentComponent = "RegisterForm";
    },
    errorMessage() {
      const errorRegistrate = "auth/email-already-in-use";
      // const errorAuth =
      //   "auth/invalid-value-(email),-starting-an-object-on-a-scalar-field";
      // const errorAuth = "auth/invalid-email";
      const errorCredential = "auth/invalid-credential";
      const code = this.getError?.code || "";

      // if (code.includes(errorAuth)) {
      //   this.messageError = this.$t("errorMessage.auth");
      // } else
      if (code.includes(errorCredential)) {
        this.messageError = this.$t("errorMessage.auth");
      } else if (code.includes(errorRegistrate)) {
        this.messageError = this.$t("errorMessage.registrate");
      } else {
        this.messageError = this.$t("errorMessage.error");
      }
      this.closeAlert();
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