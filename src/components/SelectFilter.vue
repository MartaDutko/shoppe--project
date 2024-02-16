<template>
  <v-app>
    <v-container>
      <v-select
        v-model="selectedItem"
        label="Select"
        :items="itemsData"
      ></v-select>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "SelectFilter",
  props: {
    itemsData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedItem: null,
    };
  },
  methods: {
    onChose(e) {
      const selectedValue = e.target.value;
      console.log(selectedValue);
    },
  },
  watch: {
    selectedItem(nV) {
      this.$emit("choseItem", nV);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>