<template>
  <div class="home">
    <div class="wrapper">
      <Header />
      <Body />
      <Footer />
    </div>
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
  height: 100vh;
  display: flex;
  justify-content: center;
}
.wrapper {
  width: 80%;
  height: 100%;
}
</style>
