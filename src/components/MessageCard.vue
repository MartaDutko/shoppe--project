<template>
  <div class="order__block-title">
    <p>{{ titel }}</p>
  </div>
</template>

<script>
export default {
  name: "MessageCard",
  props: {
    titel: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.order {
  // .order__block-title

  &__block-title {
    background-color: #efefef;
    padding: 20px 0px 20px 40px;
    border-top: 1px solid #a18a68;
    p {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 27px;
    }
  }
}
</style>