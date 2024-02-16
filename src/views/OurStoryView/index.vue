<template>
  <main-master-page>
    <div class="block__about">
      <div class="block_aboutTitle">
        <p class="title">About</p>
        <p class="sub-title">Who we are and why we do what we do!</p>
      </div>
      <div class="description_block">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
          obcaecati qui blanditiis at alias dignissimos. Excepturi consequatur
          sequi maxime repellat dolore fugiat, molestias pariatur. Accusamus
          vitae distinctio optio architecto tempora.
        </p>
      </div>
      <div class="block_about_subTitle">Top trends</div>
      <div class="block_img">
        <img :src="require('@/assets/img/about-img/1.png')" alt="logo" />
      </div>
      <div class="block_about_subTitle">Produced with care</div>
      <div class="block_img">
        <img :src="require('@/assets/img/about-img/2.png')" alt="logo" />
      </div>
      <div class="description_block">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
          obcaecati qui blanditiis at alias dignissimos. Excepturi consequatur
          sequi maxime repellat dolore fugiat, molestias pariatur. Accusamus
          vitae distinctio optio architecto tempora.
        </p>
      </div>
    </div>
  </main-master-page>
</template>

<script>
import MainMasterPage from "@/masterpage/MainMasterPage.vue";

export default {
  name: "OurStoryView",
  components: {
    MainMasterPage,
  },
};
</script>

<style lang="scss" scoped>
.block {
  // .block_aboutTitle

  &_aboutTitle {
    text-align: center;
  }

  // .block_img

  &_img img {
    max-width: 100%;
  }

  // .block__about

  &__about {
    max-width: 650px;
    align-self: center;
  }
}
.block__about {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 0px 5% 0;
}
.title {
  font-size: 33px;
  font-weight: 500;
}
.sub-title {
  font-size: 20px;
  font-weight: 400;
}
.block_about_subTitle {
  font-size: 26px;
  font-weight: 400;
}
.description {
  // .description_block

  &_block p {
    font-size: 16px;
    font-weight: 400;
    text-align: justify;
  }
}
</style>