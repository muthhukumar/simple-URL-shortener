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
  width: 100%;
  position: fixed;
  z-index: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white);
}
.footer p {
  color: var(--black);
}
</style>
