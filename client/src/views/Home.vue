<template>
  <div class="home">
    <Header />
    <Body />
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Body from "../components/Body.vue";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
    Body,
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  display: grid;
  height: 100vh;
  grid-template-columns: auto;
  justify-content: center;
  grid-template-areas: "title" "content" "footer";
  grid-template-rows: 6rem auto auto;
}
</style>
