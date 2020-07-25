<template>
  <div class="nav-bar">
    <h2 class="header">Url Shortener</h2>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.nav-bar {
  width: 100%;
  padding: 1rem;
}
.header {
  color: var(--black);
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem 0;
}
</style>
