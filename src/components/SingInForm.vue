<template>
  <div class="form_registration">
    <!-- <p>getUser-{{ getUser }}</p>
    <p>getError-{{ getError }}</p> -->

    <v-card class="mx-auto elevation-0" max-width="500">
      <v-container>
        <v-text-field
          v-model="user.email"
          color="primary"
          :label="$t('placeholderTitles.email')"
          variant="underlined"
          clearable
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          v-model="user.password"
          clearable
          color="primary"
          variant="underlined"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="show2 ? 'text' : 'password'"
          name="input-10-2"
          :label="$t('placeholderTitles.password')"
          hint="At least 8 characters"
          @click:append="show2 = !show2"
        ></v-text-field>
        <v-btn
          variant="tonal"
          :disabled="isDisabledBtn"
          class="btn_form"
          @click="onEnter"
        >
          {{ $t("btnTitles.singIn") }}
        </v-btn>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SingInForm",
  data() {
    return {
      //   btnForm: null,
      user: {},
      // !переправити
      terms: false,
      //   !!!! для пароля
      show1: false,
      show2: true,

      passwordRules: [
        (v) => !!v || this.$t("validation.requiredField"),
        (v) =>
          (v && v.length >= 8) ||
          this.$t("validation.minLength", { length: 8 }),
      ],
      emailRules: [
        (v) => !!v || this.$t("validation.requiredField"),
        (v) => /.+@.+\..+/.test(v) || this.$t("validation.incorrectInput"),
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["getUser", "getError"]),
    isDisabledBtn() {
      return (
        !this.emailRules.every((rule) => rule(this.user.email) === true) ||
        !this.passwordRules.every((rule) => rule(this.user.password) === true)
      );
    },
  },
  methods: {
    ...mapActions("auth", ["signInUser"]),
    async onEnter() {
      // const redirectPath = this.$route.query.redirect || { name: "home" };
      // this.$router.push(redirectPath);
      // console.log("redirectPath");
      // console.log(redirectPath);
      try {
        await this.signInUser(this.user);
        // console.log("this.$route.query.redirect");
        // console.log(this.$route.query.redirect);
        this.$router.push({
          path: this.$route.query.redirect ? this.$route.query.redirect : "/",
        });
      } catch (error) {
        console.log(error);
      }
      // this.signInUser(this.user);
      // if (this.$route.query.redirect) {
      //   this.$router.push({
      //     path: this.$route.query.redirect,
      //   });
      // } else {
      //   this.$router.push({
      //     name: "home",
      //   });
      // }
      this.user = {};
    },

    // async onLogin() {
    //   try {
    //     await this.loginWithGoogle();
    //     this.$router.push({
    //       name: "products",
    //     });
    //   } catch (error) {
    //     this.showAlert(error.message);
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.form_registration {
  width: 100%;
  .btn_form {
    width: 100%;
    color: white;
    font-size: 16px;
    font-style: normal;
    line-height: normal;
    background-color: #000000;
  }
}
</style>