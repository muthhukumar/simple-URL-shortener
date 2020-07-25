<template>
  <div class="body">
    <form @submit.prevent="getShortUr()">
      <pre>Here is an simple URL Shortener for you</pre>
      <h2>Shorten URL</h2>
      <div class="input-container">
        <input v-model="url" placeholder="Enter your url" />
        <button type="submit">SHORTEN</button>
      </div>
    </form>
    <Shorturl
      @close="closeHandler()"
      v-for="url of shortUrl"
      :id="url.id"
      :shorturl="url.url"
      :key="url.id"
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
    };
  },
  methods: {
    async getShortUr() {
      console.log(this.url);
      let response, json;
      try {
        response = await fetch("http://localhost:5000/url/shortUrl", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ url: this.url }),
        });
        if (!response.ok) throw response.statusText;
        json = await response.json();
        console.log(json);
        this.shortUrl = this.shortUrl.push({
          url: window.location.href + json.newUrl.shortUrl,
          id: json.newUrl._id,
        });
        this.url = "";
      } catch (err) {
        console.log(err);
      }
      console.log(json);
    },
    closeHandler(id) {
      console.log("called");
      this.shortUrl = this.shortUrl.filter((url) => url.id !== id);
    },
  },
};
</script>

<style scoped>
.body {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.body h2 {
  color: var(--black);
}
.body form {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
}
.body input {
  width: 22rem;
  height: 3rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 0.5rem;
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
