<template>
  <div class="body">
    <form @submit.prevent="getShortUr()">
      <h2>Here is an simple URL Shortener for you</h2>
      <h2>Shorten URL</h2>
      <div class="input-container">
        <input v-model="url" placeholder="Enter your url" />
        <button type="submit">SHORTEN</button>
      </div>
      <p class="error" v-if="error">Enter valid URL</p>
    </form>
    <Shorturl
      @close="closeHandler"
      v-for="newurl in shortUrl"
      :id="newurl.id"
      :shorturl="newurl.url"
      :key="newurl.id"
    />
  </div>
</template>

<script>
import Shorturl from "./Shorturl.vue";

export default {
  name: "Body",
  components: {
    Shorturl,
  },
  data: function() {
    return {
      shortUrl: [],
      url: "",
      error: "",
    };
  },
  watch: {
    url: function sett() {
      this.error = "";
    },
  },
  methods: {
    async getShortUr() {
      if (this.url === "") return;
      let response, json;
      try {
        response = await fetch("/url/shortUrl", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ url: this.url }),
        });
        if (!response.ok) throw response.statusText;
        json = await response.json();
        this.shortUrl.push({
          url: window.location.href + json.newUrl.shortUrl,
          id: json.newUrl._id,
        });
        this.url = "";
        this.error = "";
      } catch (err) {
        this.error = "Something went wrong";
        console.log(err);
      }
    },
    closeHandler(id) {
      const arr = [...this.shortUrl];
      this.shortUrl = arr.filter((url) => url.id !== id);
    },
  },
};
</script>

<style scoped>
.body {
  grid-area: content;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
}
.body h2 {
  color: var(--black);
}
.body h1 {
  font-size: 2rem;
  color: var(--black);
}
.body form {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
}
.body form p {
  color: #d52828;
}
.input-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.body input {
  width: 22rem;
  height: 3rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 0.5rem;
}
.body input:active,
.body input:focus {
  outline: none;
}
.body button {
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
.body button:hover,
.body button:focus,
.body button:active {
  outline: none;
}
.body button:hover {
  cursor: pointer;
  background: #222020;
}
</style>
