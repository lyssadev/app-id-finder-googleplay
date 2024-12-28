<template>
  <div class="app-id-finder">
    <h1>App ID Finder Web App</h1>
    <input v-model="appName" placeholder="Enter App Name" />
    <button @click="findAppId">Find App ID</button>
    <div v-if="appId">
      <p>App ID: {{ appId }}</p>
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
      appId: null,
      error: null,
    };
  },
  methods: {
    async findAppId() {
      this.error = null;
      this.appId = null;

      if (!this.appName) {
        this.error = 'Please enter an app name.';
        return;
      }

      try {
        const response = await fetch(`https://your-api-endpoint.com/api/search?term=${this.appName}`);
        const data = await response.json();

        if (data && data.length > 0) {
          this.appId = data[0].appId;
        } else {
          this.error = 'App ID not found.';
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
</style>