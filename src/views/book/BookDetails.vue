<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="loaded">
    <h1>Title: {{ book.title }}</h1>
    <p>
      <strong>Author: </strong>
      <router-link :to="{ name: 'AuthorDetails', params: { id: author.id } }"
        >{{ author.familyName }}, {{ author.firstName }}</router-link
      >
    </p>
    <p><strong>Summary: </strong>{{ book.summary }}</p>
    <p><strong>ISBN: </strong>{{ book.isbn }}</p>
    <p>
      <strong>Genre:</strong>
      <span>
        <router-link :to="{ name: 'GenreDetails', params: { id: genre.id } }">{{
          genre.name
        }}</router-link>
      </span>
    </p>
    <div>
      <h4>Copies</h4>
      <div v-if="copies.length">
        <div v-for="copy in copies" :key="copy.id">
          <hr />
          <p>{{ copy.status }}</p>
          <p><strong>Imprint: </strong>{{ copy.imprint }}</p>
          <p>
            <strong>Id: </strong>
            <router-link
              :to="{ name: 'BookCopyDetails', params: { id: copy.id } }"
              >{{ copy.id }}</router-link
            >
          </p>
        </div>
      </div>
      <div v-else>There are no copies of this book in the library</div>
    </div>
    <hr />
    <button>
      <router-link :to="{ name: 'UpdateBook', params: { id: book.id } }"
        >Update</router-link
      >
    </button>
    <button @click="deleteBook">Delete</button>
  </div>
  <div v-else>
    <p>Loading Book Details ...</p>
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
const book = ref(null);
const author = ref(null);
const genre = ref(null);
const copies = ref([]);
const error = ref(null);

onMounted(async () => {
  try {
    const bookResp = await collection(db, "books").doc(props.id).get();
    if (!bookResp.exists) {
      throw new Error("No Book found with ID=" + props.id);
    }
    const bookData = { ...bookResp.data(), id: bookResp.id };
    book.value = bookData;
    const authorResp = await collection(db, "authors")
      .doc(bookData.authorId)
      .get();
    if (!authorResp.exists) {
      throw new Error("No Author found with ID=" + bookData.authorId);
    }
    author.value = { ...authorResp.data(), id: authorResp.id };
    const genreResp = await collection(db, "genres")
      .doc(bookData.genreId)
      .get();
    if (!genreResp.exists) {
      throw new Error("No Genre found with ID=" + bookData.genreId);
    }
    genre.value = { ...genreResp.data(), id: genreResp.id };
    const copiesResp = await collection(db, "copies").get();
    const copiesData = copiesResp.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    copies.value = copiesData.filter((c) => c.bookId === bookData.id);
    loaded.value = true;
  } catch (err) {
    error.value = err.message;
  }
});

const deleteBook = async () => {
  if (confirm("Do you really want to delete this Book?")) {
    try {
      await collection(db, "books").doc(props.id).delete();
      router.push("/books"); // redirect to book list
    } catch (err) {
      error.value = err.message;
    }
  }
};
</script>

<style scoped></style>
