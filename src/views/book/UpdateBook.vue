<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="loaded">
    <h1>Update Book</h1>
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
        <select v-model="genreId" required>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">
            {{ genre.name }}
          </option>
        </select>
      </div>
      <div>
        <button>Update</button>
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
import { collection } from "firebase/firestore";

const props = defineProps(["id"]);
const router = useRouter();

const loaded = ref(false);
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
    let resp = await collection(db, "books").doc(props.id).get();
    if (!resp.exists) {
      throw new Error("No Book found with ID=" + props.id);
    }
    const book = { ...resp.data(), id: resp.id };
    title.value = book.title;
    authorId.value = book.authorId;
    summary.value = book.summary;
    isbn.value = book.isbn;
    genreId.value = book.genreId;
    resp = await collection(db, "authors").get();
    authors.value = resp.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    resp = await collection(db, "genres").get();
    genres.value = resp.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    loaded.value = true;
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
    await collection(db, "books").doc(props.id).update(book);
    router.push("/books"); // redirect to book list
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped></style>
