<template>
  <main-master-page>
    <div class="wraper">
      <div class="block_title">
        <p class="title">Contact Us</p>
        <p class="sub-title">
          Say Hello send us your thoughts about our products or share your ideas
          with our Team!
        </p>
      </div>
      <div class="form_contact">
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="firstname"
                  :rules="nameRules"
                  :counter="10"
                  label="First name"
                  required
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="lastname"
                  :rules="nameRules"
                  :counter="10"
                  label="Last name"
                  hide-details
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  hide-details
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-textarea label="Message"></v-textarea>
          </v-container>
        </v-form>
        <div class="btn_send">
          <v-btn :width="btnW">send</v-btn>
        </div>
      </div>
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpage/MainMasterPage.vue";
export default {
  name: "ContactView",
  components: {
    MainMasterPage,
  },
  data() {
    return {
      btnW: "60%",
      valid: false,
      firstname: "",
      lastname: "",
      nameRules: [
        (value) => {
          if (value) return true;

          return "Name is required.";
        },
        (value) => {
          if (value?.length <= 10) return true;

          return "Name must be less than 10 characters.";
        },
      ],
      email: "",
      emailRules: [
        (value) => {
          if (value) return true;

          return "E-mail is requred.";
        },
        (value) => {
          if (/.+@.+\..+/.test(value)) return true;

          return "E-mail must be valid.";
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.wraper {
  display: flex;
  flex-direction: column;
  gap: 10%;
}
.block {
  &_title {
    text-align: center;
    padding: 80px 0px 80px 0px;
  }
}
.title {
  font-size: 33px;
  font-style: normal;
  font-weight: 500;
  line-height: 43px;
}
.sub-title {
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px;
}

.btn {
  // .btn_send

  &_send {
    text-align: center;
  }
}
</style>