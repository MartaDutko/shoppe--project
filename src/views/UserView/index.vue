<template>
  <main-master-page>
    <div class="wrapper__block">
      <div class="wrapper__blockTitle blockTitle__user">
        <p class="blockTitle__accountTitle">{{ $t("titles.account") }}</p>
      </div>
      <div class="block__navbar">
        <div
          v-for="item in menuItems"
          :key="item.id"
          @click="onSelectNavItem(item.id)"
        >
          <router-link
            :to="{ name: item.name }"
            class="tittle_navbar"
            :class="{ selected: selectedNavItem === item.id }"
          >
            {{ item.title[carrentLanguage] }}</router-link
          >
        </div>
      </div>
    </div>
    <router-view />
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpage/MainMasterPage.vue";
import { LOGOUT_ID, menuItems } from "@/views/UserView/data/menuItems";
import { mapActions } from "vuex";

export default {
  name: "UserView",
  components: {
    MainMasterPage,
  },
  data() {
    return {
      selectedNavItem: 2,
    };
  },
  computed: {
    menuItems() {
      return menuItems;
    },
    carrentLanguage() {
      return this.$i18n.locale === "ua" ? "ua" : "en";
    },
  },
  methods: {
    ...mapActions("auth", ["singOutUser"]),
    onSelectNavItem(selectId) {
      if (selectId === LOGOUT_ID) this.singOutUser();
      else {
        this.selectedNavItem = selectId;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  // .wrapper__block

  &__block {
    border-bottom: 1px solid #d8d8d8;
  }

  // .wrapper__blockTitle

  &__blockTitle {
    text-align: center;
  }
}
.blockTitle {
  // .blockTitle__user

  &__user {
  }

  // .blockTitle__accountTitle

  &__accountTitle {
    font-size: 33px;
    font-style: normal;
    font-weight: 500;
    line-height: 43px;
  }
}
.block {
  // .block__navbar

  &__navbar {
    width: 60%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 64px 0px 34px 0px;
  }
}
.tittle {
  // .tittle_navbar

  &_navbar {
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    color: #707070;
    cursor: pointer;
    line-height: 26px;
  }
}
.tittle_navbar:hover {
  color: black;
  transition: color 0.3s ease;
}
.selected {
  color: black;
  transition: color 0.3s ease;
}
</style>