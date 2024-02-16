  <template>
  <v-alert
    position="fixed"
    color="#EFEFEF"
    :type="typeAlert"
    class="bannerClass"
    >{{ mesageAlert }}</v-alert
  >
</template>
<script>
export default {
  name: "AlertCard",
  props: {
    mesageAlert: {
      type: [String, Error],
      require: true,
    },
    typeAlert: {
      type: String,
      default: "success",
    },
  },
};
</script>

<style lang="scss" scoped>
.bannerClass {
  z-index: 5;
  width: 100%;
  top: 9%;
  left: 0;
}
</style>