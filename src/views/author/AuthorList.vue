<template>
  <div v-if="error">{{ error }}</div>
  <h1>Author List</h1>
  <div>
    <router-link to="/authors/create">Create Author</router-link>
  </div>
  <ul>
    <li v-for="author in authors" :key="author.id">
      <router-link :to="{ name: 'AuthorDetails', params: { id: author.id } }"
        >{{ author.familyName }}, {{ author.firstName }}</router-link
      >
    </li>
  </ul>
</template>

<script setup>
import getAuthors from "../../composables/getAuthors";

const { authors, error, load } = getAuthors();

load();
</script>

<style scoped>
li {
  text-align: left;
}
</style>
