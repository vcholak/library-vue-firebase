<template>
  <h1>Book Copy List</h1>
  <div>
    <router-link to="/copies/create">Create Book Copy</router-link>
  </div>
  <div v-if="error">{{ error }}</div>
  <ul>
    <li v-for="copy in copies" :key="copy.id">
      <router-link :to="{ name: 'BookCopyDetails', params: { id: copy.id } }"
        >{{ copy.title }} : {{ copy.imprint }}</router-link
      >
      <span> - {{ copy.status }}</span>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";

const copies = ref([]);
const error = ref(null);

onMounted(async () => {
  try {
    let colRef = collection(db, "books");
    let resp = await getDocs(colRef);
    const books = resp.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    colRef = collection(db, "copies");
    resp = await getDocs(colRef);
    copies.value = resp.docs.map((doc) => {
      const data = doc.data();
      const book = books.find((b) => b.id === data.bookId);
      return { ...data, id: doc.id, title: book.title };
    });
  } catch (err) {
    error.value = err.message;
  }
});
</script>

<style></style>
