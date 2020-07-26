<template>
  <div class="footer">
    <p>Made in Luv with Vuejs</p>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  margin: 1rem 0;
  grid-area: footer;
  background: var(--white);
  align-self: end;
}
.footer p {
  font-size: 1.2rem;
  text-align: center;
  margin: 0;
  color: #959595;
}
</style>
