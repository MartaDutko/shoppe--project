<template>
  <router-view />

  <!-- <p>{{ setUser }}</p> -->
</template>


<script>
export default {
  created() {
    this.$i18n.locale =
      localStorage.getItem("lastLanguage") || process.env.VUE_APP_I18N_LOCALE;
    if (localStorage.getItem("lastLanguage") !== this.$i18n.locale) {
      localStorage.setItem("lastLanguage", this.$i18n.locale);
    }
    const self = this;
    window.addEventListener("storage", function () {
      if (self.$i18n.locale !== localStorage.getItem("lastLanguage")) {
        self.$i18n.locale = localStorage.getItem("lastLanguage");
        self.$router.go();
      }
    });
  },
};
</script>


<style lang="scss">
</style>
