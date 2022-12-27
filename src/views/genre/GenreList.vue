<template>
  <h1>Genre List</h1>
  <div>
    <router-link to="/genres/create">Create Genre</router-link>
  </div>
  <div v-if="error">{{ error }}</div>
  <div>
    <ul>
      <li v-for="genre in genres" :key="genre.id">
        <router-link :to="{ name: 'GenreDetails', params: { id: genre.id } }">{{
          genre.name
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase/config";
import { collection } from "firebase/firestore";

const genres = ref([]);
const error = ref(null);

onMounted(async () => {
  try {
    const data = await collection(db, "genres").get();
    genres.value = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  } catch (err) {
    error.value = err.message;
  }
});
</script>

<style scoped></style>
