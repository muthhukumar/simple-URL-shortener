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
  grid-area: title;
  width: 100%;
  padding: 1rem 0;
}
.header {
  color: var(--black);
  font-size: 3rem;
  font-weight: bold;
  margin: 1rem 0;
}
</style>
