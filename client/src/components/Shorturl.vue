<template>
  <div class="wrapper">
    <button class="cross" @click="$emit('close', id)">
      <img src="../assets/cross.png" />
    </button>
    <h4>Shorten URL created</h4>
    <div class="newurl">
      <h2 ref="content">{{ shorturl }}</h2>
      <button id="copy" @click="copyHandler">{{ copytext }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShortURL",
  props: ["id", "shorturl"],
  data: function() {
    return {
      copytext: "copy",
    };
  },
  methods: {
    async copyHandler() {
      await navigator.clipboard.writeText(this.shorturl);
      this.copytext = "copied!";
    },
  },
};
</script>

<style scoped>
.wrapper {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width : 31rem;
  margin: 0.5rem 0;
  padding: 1rem;
  position: relative;
}
h4 {
  margin: 0.3rem 0;
}
.cross {
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  border: none;
  background: white;
}
.cross img {
  width: 100%;
  height: 50%;
}
.newurl {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.newurl button {
  font-size: 1.2rem;
  width: 7rem;
  height: 3rem;
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  margin-left: 0.5rem;
  color: var(--white);
  background: var(--black);
}
.newurl button:hover,
.newurl button:focus,
.newurl button:active {
  outline: none;
}
.newurl button:hover {
  cursor: pointer;
  background: #222020;
}
</style>
