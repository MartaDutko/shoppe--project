<template>
  <main-master-page>
    <v-app>
      <v-container>
        <!-- discount -->
        <v-text-field v-model="productData.discount" label="discount">
        </v-text-field>

        <!-- price -->
        <v-text-field v-model="productData.price" label="price"> </v-text-field>

        <!-- category -->
        <v-text-field v-model="productData.category" label="category">
        </v-text-field>

        <!-- count -->
        <v-text-field v-model="productData.count" label="count"></v-text-field>

        <!-- title -->
        <!-- ua -->
        <v-text-field v-model="productData.title.ua" label="titleUa">
        </v-text-field>
        <!-- en -->
        <v-text-field v-model="productData.title.en" label="titleEn">
        </v-text-field>

        <!-- description -->
        <!-- ua -->
        <v-text-field
          v-model="productData.description.ua"
          label="descriptionUa"
        >
        </v-text-field>
        <!-- en -->
        <v-text-field
          v-model="productData.description.en"
          label="descriptionEn"
        >
        </v-text-field>

        <!-- aditionalInformation -->
        <!-- weight -->
        <v-text-field
          v-model="productData.aditionalInformation.weight"
          label="weight"
        >
        </v-text-field>

        <!-- dimentions -->
        <v-text-field
          v-model="productData.aditionalInformation.dimentions"
          label="dimentions"
        >
        </v-text-field>

        <!-- colours -->
        <v-text-field
          v-model="productData.aditionalInformation.colours"
          label="colours"
        >
        </v-text-field>

        <!-- material -->
        <v-text-field
          v-model="productData.aditionalInformation.material"
          label="material"
        >
        </v-text-field>

        <!-- img -->
        <v-file-input
          label="File input"
          variant="filled"
          prepend-icon="mdi-camera"
          @change="handleFileUpload"
        ></v-file-input>
        <v-btn @click="saveProduct">Save</v-btn>
      </v-container>
    </v-app>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpage/MainMasterPage.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AdminAddView",
  components: {
    MainMasterPage,
  },
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      productData: {
        title: {},
        description: {},
        aditionalInformation: {},
      },
    };
  },
  computed: {
    ...mapGetters("products", ["getSelectedFile", "getProductById"]),
  },
  methods: {
    ...mapActions("products", [
      "createPhotoStorage",
      "setSelectedFile",
      "addProduct",
      "updateProducts",
    ]),
    async saveProduct() {
      const selectedFile = this.getSelectedFile;
      if (selectedFile) {
        const img = await this.createPhotoStorage();
        console.log("img");
        console.log(img);
        if (this.id) {
          const data = { ...this.productData, img: img };
          console.log(data);
          await this.updateProducts({ itemId: this.id, data });
        } else {
          const data = { ...this.productData, img: img };
          console.log(data);
          await this.addProduct(data);
        }
      } else {
        console.log("No file selected!");
      }
      // обнулення об'єкта
      this.productData = {
        title: {},
        description: {},
        aditionalInformation: {},
      };
      this.$router.push({ name: "home" });
    },
    handleFileUpload(event) {
      this.setSelectedFile(event.target.files[0]);
    },
  },
  created() {
    const searchProduct = this.getProductById(this.id);
    if (searchProduct) {
      this.productData = JSON.parse(JSON.stringify(searchProduct));
    }
  },
};
</script>

<style lang="scss" scoped>
</style>