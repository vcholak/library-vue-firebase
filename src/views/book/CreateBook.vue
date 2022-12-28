<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="authors.length && genres.length">
    <h1>Create Book</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Title:</label>
        <input
          v-model="title"
          type="text"
          placeholder="Name of book"
          required
        />
      </div>
      <div>
        <label>Author:</label>
        <select v-model="authorId" required>
          <option v-for="author in authors" :key="author.id" :value="author.id">
            {{ author.familyName }}, {{ author.firstName }}
          </option>
        </select>
      </div>
      <div>
        <label>Summary:</label>
        <input
          v-model="summary"
          type="text"
          placeholder="Summary of book"
          required
        />
      </div>
      <div>
        <label>ISBN:</label>
        <input
          v-model="isbn"
          type="text"
          placeholder="A 13-digit ISBN"
          required
        />
      </div>
      <div>
        <label>Genre:</label>
        <div>
          <select v-model="genreId" required>
            <option v-for="genre in genres" :key="genre.id" :value="genre.id">
              {{ genre.name }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <button>Create</button>
      </div>
    </form>
  </div>
  <div v-else>
    <p>Loading Data ...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { db } from "@/firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

const router = useRouter();

const authors = ref([]);
const genres = ref([]);
const title = ref("");
const authorId = ref(null);
const summary = ref("");
const isbn = ref("");
const genreId = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    let colRef = collection(db, "authors");
    let data = await getDocs(colRef);
    authors.value = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    colRef = collection(db, "genres");
    data = await getDocs(colRef);
    genres.value = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  } catch (err) {
    error.value = err.message;
  }
});

const handleSubmit = async () => {
  const book = {
    title: title.value,
    authorId: authorId.value,
    summary: summary.value,
    isbn: isbn.value,
    genreId: genreId.value,
  };
  try {
    const colRef = collection(db, "books");
    await addDoc(colRef, book);
    router.push("/books"); // redirect to book list
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped></style>
