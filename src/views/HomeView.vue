<template>
  <div class="home">
    <h1>Welcome to Local Library</h1>
    <div v-if="error">{{ error }}</div>
    <h2>Dynamic content</h2>
    <p>The library has the following record counts:</p>
    <ul>
      <li><strong>Books: </strong>{{ booksCnt }}</li>
      <li><strong>Copies: </strong>{{ copiesCnt }}</li>
      <li><strong>Available Copies: </strong>{{ availableCopiesCnt }}</li>
      <li><strong>Authors: </strong>{{ authorsCnt }}</li>
      <li><strong>Genres: </strong>{{ genresCnt }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "../firebase/config";

const booksCnt = ref(null);
const copiesCnt = ref(null);
const availableCopiesCnt = ref(null);
const authorsCnt = ref(null);
const genresCnt = ref(null);
const loaded = ref(false);
const error = ref(null);

onMounted(async () => {
  try {
    let resp = await db.collection("books").get();
    booksCnt.value = resp.docs.length;
    resp = await db.collection("copies").get();
    const allCopies = resp.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    copiesCnt.value = allCopies.length;
    availableCopiesCnt.value = allCopies.filter(
      (e) => e.status === "Available"
    ).length;
    resp = await db.collection("authors").get();
    authorsCnt.value = resp.docs.length;
    resp = await db.collection("genres").get();
    genresCnt.value = resp.docs.length;
    loaded.value = true;
  } catch (err) {
    error.value = err.message;
  }
});
</script>

<style scoped>
ul {
  position: relative;
  left: 45%;
  list-style-type: none;
}
</style>
