<template>
  <div class="form_registration">
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
      user: {},
      terms: false,
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
    ...mapGetters("auth", ["getUser"]),
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
      try {
        await this.signInUser(this.user);
        this.$router.push({
          path: this.$route.query.redirect ? this.$route.query.redirect : "/",
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