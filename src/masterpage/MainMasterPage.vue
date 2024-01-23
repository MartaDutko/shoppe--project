<template>
  <v-app>
    <v-card flat>
      <v-app-bar :absolute="false" color="white" prominent>
        <v-app-bar-nav-icon
          v-if="screenWidth < 600"
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>
          <v-img :src="logoImg" :width="100"></v-img>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-list
          v-if="screenWidth >= 600"
          class="large-buttons list-beetween list_item"
          dense
        >
          <v-list-item :to="{ name: 'home' }">{{
            $t("menu.home")
          }}</v-list-item>
          <v-list-item :to="{ name: 'shop' }">{{
            $t("menu.shop")
          }}</v-list-item>
          <v-list-item :to="{ name: 'blog' }">{{
            $t("menu.blog")
          }}</v-list-item>
          <v-list-item :to="{ name: 'our_story' }">{{
            $t("menu.ourStory")
          }}</v-list-item>
          <v-list-item>|</v-list-item>
          <div class="block_language">
            <v-btn @click="changeLanguage('ua')">UA</v-btn>|
            <v-btn @click="changeLanguage('en')">EN</v-btn>
          </div>
          <v-list-item :to="{ name: 'basket' }">
            <font-awesome-icon :icon="['fas', 'cart-shopping']" />
          </v-list-item>
          <v-list-item :to="{ name: 'user' }">
            <span> <font-awesome-icon :icon="['fas', 'user']" /></span>
          </v-list-item>

          <v-list-item v-if="getUser" @click="singOutUser">
            <!-- <v-btn > -->
            <span>
              <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']"
            /></span>
            <!-- </v-btn> -->
          </v-list-item>
          <v-list-item :to="{ name: 'login' }" v-else>
            <span>
              <font-awesome-icon :icon="['fas', 'arrow-right-to-bracket']"
            /></span>
          </v-list-item>
        </v-list>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" location="left" temporary>
        <v-list class="list_item">
          <v-list-item :to="{ name: 'home' }">{{
            $t("menu.home")
          }}</v-list-item>
          <v-list-item :to="{ name: 'shop' }">{{
            $t("menu.shop")
          }}</v-list-item>
          <v-list-item :to="{ name: 'blog' }">{{
            $t("menu.blog")
          }}</v-list-item>
          <v-list-item :to="{ name: 'our_story' }">{{
            $t("menu.ourStory")
          }}</v-list-item>
          <v-list-item :to="{ name: 'basket' }">
            <font-awesome-icon :icon="['fas', 'cart-shopping']" />
          </v-list-item>
          <v-list-item :to="{ name: 'user' }">
            <font-awesome-icon :icon="['fas', 'user']" />
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <div class="content">
          <div v-if="isLoading">
            <span>Loading...</span>
            <font-awesome-icon :icon="['fas', 'rotate-right']" />
          </div>
          <div v-else-if="hasError">
            <span>Error </span>
            <font-awesome-icon :icon="['fas', 'triangle-exclamation']" />
          </div>
          <slot v-else></slot>
          <!-- <div>{{ getUser }}</div> -->
        </div>
      </v-main>

      <v-footer border="t">
        <v-row no-gutters>
          <v-list class="list-beetween list_item" dense>
            <v-list-item :to="{ name: 'contact' }">{{
              $t("footerMenu.contacts")
            }}</v-list-item>
            <v-list-item :to="{ name: 'tearms_of_services' }">{{
              $t("footerMenu.termsServices")
            }}</v-list-item>
            <v-list-item :to="{ name: 'shiping_end_returns' }">{{
              $t("footerMenu.shipingReturns")
            }}</v-list-item>
          </v-list>
          <v-spacer></v-spacer>
          <v-list class="d-flex list_item" dense>
            <v-list-item
              class="icon-item"
              v-for="(social, index) in socialMedia"
              :key="index"
            >
              <a :href="social.url" target="_blank">
                <font-awesome-icon :icon="['fab', social.icon]" />
              </a>
            </v-list-item>
          </v-list>
          <v-col class="text-start mt-4" cols="12">
            {{ new Date().getFullYear() }} —
            <small>© Shelly. Terms of use and privacy policy.</small>
          </v-col>
        </v-row>
      </v-footer>
    </v-card>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MainMasterPage",
  data: () => ({
    logoImg: require("@/assets/img/logo.png"),
    drawer: false,
    group: null,
    screenWidth: window.innerWidth,
    //icon for  media
    socialMedia: [
      //!!!!! перемістити іконки в інший файл
      { icon: "linkedin-in", url: "https://www.linkedin.com/" },
      { icon: "facebook-f", url: "https://www.facebook.com/" },
      { icon: "instagram", url: "https://www.instagram.com/" },
      { icon: "twitter", url: "https://twitter.com/" },
    ],
  }),

  computed: {
    ...mapGetters("users", ["isLoading", "hasError"]),
    ...mapGetters("auth", ["getUser"]),
  },

  methods: {
    ...mapActions("auth", ["singOutUser"]),
    handleResize() {
      // Оновлює значення screenWidth при зміні ширини екрану
      this.screenWidth = window.innerWidth;
    },
    changeLanguage(language) {
      this.$i18n.locale = language;
      localStorage.setItem("lastLanguage", this.$i18n.locale);
      console.log(this.$i18n.locale);
    },
    // OnExit(){
    //  this.singOutUser()
    // }
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
  mounted() {
    // Встановлює обробник подій для відстеження зміни ширини екрану
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    // Видаляє обробник подій при знищенні компонента
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  min-height: 70vh;
}
.list-beetween {
  display: flex;
}
.block_language {
  display: flex;
  align-items: center;
}
.list_item {
  text-decoration: none;
  color: #707070;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 27px;
}
</style>