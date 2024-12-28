<template>
  <div class="app-id-finder">
    <h1>App ID Finder GooglePlay [WebApp]</h1>
    <input v-model="appName" placeholder="Enter App Name" />
    <button @click="findAppId">Check</button>
    <div v-if="appResults.length > 0">
      <h2>Search Results:</h2>
      <ul>
        <li v-for="(app, index) in appResults" :key="index">
          <h3>{{ app.title }}</h3>
          <p><strong>App ID:</strong> {{ app.appId }}</p>
          <p><strong>Developer:</strong> {{ app.developer }}</p>
          <p><strong>Rating:</strong> {{ app.score ? app.score.toFixed(1) : 'N/A' }} ⭐</p>
          <p><strong>Size:</strong> {{ app.size }}</p>
          <p><strong>URL:</strong> <a :href="app.url" target="_blank">{{ app.url }}</a></p>
          <img :src="app.icon" alt="App Icon" />
        </li>
      </ul>
    </div>
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appName: '',
      appResults: [],
      error: null,
    };
  },
  methods: {
    async findAppId() {
      this.error = null;
      this.appResults = [];

      if (!this.appName) {
        this.error = 'Please enter an app name.';
        return;
      }

      try {
        const response = await fetch(`/api/search?term=${this.appName}`);
        const data = await response.json();

        if (data && data.length > 0) {
          this.appResults = data;
        } else {
          this.error = 'No results found.';
        }
      } catch (err) {
        this.error = 'An error occurred while fetching the app ID.';
      }
    },
  },
};
</script>

<style scoped>
.app-id-finder {
  text-align: center;
}

.error {
  color: red;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

img {
  max-width: 100px;
  height: auto;
}
</style>