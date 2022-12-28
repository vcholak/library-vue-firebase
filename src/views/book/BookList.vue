<template>
  <h1>Book List</h1>
  <div>
    <router-link to="/books/create">Create Book</router-link>
  </div>
  <div v-if="error">{{ error }}</div>
  <ul>
    <li v-for="book in books" :key="book.id">
      <router-link :to="{ name: 'BookDetails', params: { id: book.id } }">{{
        book.title
      }}</router-link>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";

const books = ref([]);
const error = ref(null);

onMounted(async () => {
  try {
    const colRef = collection(db, "books");
    const data = await getDocs(colRef);
    books.value = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  } catch (err) {
    error.value = err.message;
  }
});
</script>

<style scoped></style>
