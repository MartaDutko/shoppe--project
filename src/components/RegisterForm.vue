<template>
  <div class="form_registration">
    <v-card class="mx-auto elevation-0" max-width="500">
      <!-- <p>getError-{{ getError }}</p> -->
      <v-container>
        <v-text-field
          v-model="user.first"
          color="primary"
          :label="$t('placeholderTitles.firstName')"
          :rules="nameRules"
          variant="underlined"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="user.last"
          color="primary"
          :label="$t('placeholderTitles.lastName')"
          :rules="nameRules"
          variant="underlined"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="user.email"
          color="primary"
          :label="$t('placeholderTitles.email')"
          variant="underlined"
          :rules="emailRules"
          clearable
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
          class="btn_form"
          @click="onEnter"
          :disabled="isDisabledBtn"
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
  name: "RegisterForm",
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
      nameRules: [
        (v) => !!v || this.$t("validation.requiredField"),
        (v) => v.length >= 2 || this.$t("validation.minLength", { length: 2 }),
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["getError"]),
    isDisabledBtn() {
      return (
        !this.emailRules.every((rule) => rule(this.user.email) === true) ||
        !this.passwordRules.every(
          (rule) => rule(this.user.password) === true
        ) ||
        !this.nameRules.every((rule) => rule(this.user.first) === true) ||
        !this.nameRules.every((rule) => rule(this.user.last) === true)
      );
    },
  },
  methods: {
    ...mapActions("auth", ["createUser"]),
    async onEnter() {
      // this.createUser(this.user);
      // this.user = {};
      try {
        await this.createUser(this.user);
        // console.log("this.$route.query.redirect");
        // console.log(this.$route.query.redirect);
        this.$router.push({
          name: "home",
        });
      } catch (error) {
        console.log(error);
      }
      this.user = {};
    },
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