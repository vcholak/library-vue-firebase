<template>
  <div>
    <h1>Welcome to Your Local Library</h1>
    <div>
      <input v-model="search" type="text" placeholder="Search books" />
      <button>Search</button>
    </div>
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
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";

const booksCnt = ref(null);
const copiesCnt = ref(null);
const availableCopiesCnt = ref(null);
const authorsCnt = ref(null);
const genresCnt = ref(null);
const loaded = ref(false);
const error = ref(null);
const search = ref("");

onMounted(async () => {
  try {
    let colRef = collection(db, "books");
    let resp = await getDocs(colRef);
    booksCnt.value = resp.docs.length;

    colRef = collection(db, "copies");
    resp = await getDocs(colRef);
    const allCopies = resp.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    copiesCnt.value = allCopies.length;
    availableCopiesCnt.value = allCopies.filter(
      (e) => e.status === "Available"
    ).length;

    colRef = collection(db, "authors");
    resp = await getDocs(colRef);
    authorsCnt.value = resp.docs.length;

    colRef = collection(db, "genres");
    resp = await getDocs(colRef);
    genresCnt.value = resp.docs.length;
    loaded.value = true;
  } catch (err) {
    error.value = err.message;
  }
});
</script>

<style scoped></style>
