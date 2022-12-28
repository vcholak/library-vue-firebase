<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="loaded">
    <h1>Genre: {{ genre.name }}</h1>
    <div style="margin-left: 20px; margin-top: 20px">
      <h4>Books</h4>
      <div v-if="books.length">
        <dl>
          <div v-for="book in books" :key="book.id">
            <dt>
              <router-link
                :to="{ name: 'BookDetails', params: { id: book.id } }"
                >{{ book.title }}</router-link
              >
            </dt>
          </div>
        </dl>
      </div>
      <div v-else>
        <span>This genre has no books</span>
      </div>
    </div>
    <hr />
    <button>
      <router-link :to="{ name: 'UpdateGenre', params: { id: genre.id } }"
        >Update</router-link
      >
    </button>
    <button @click="deleteGenre">Delete</button>
  </div>
  <div v-else>
    <p>Loading Genre Details ...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { db } from "@/firebase/config";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

const props = defineProps(["id"]);

const router = useRouter();

const genre = ref(null);
const books = ref([]);
const loaded = ref(false);
const error = ref(null);

onMounted(async () => {
  try {
    const docRef = doc(db, "genres", props.id);
    let resp = await getDoc(docRef);
    if (!resp.exists) {
      throw new Error("No Genre found with ID=" + props.id);
    }
    const genreId = resp.id;
    genre.value = { ...resp.data(), id: genreId };

    const booksRef = collection(db, "books");
    resp = await getDocs(booksRef);
    const allBooks = resp.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    books.value = allBooks.filter((b) => b.genreId === genreId);
    loaded.value = true;
  } catch (err) {
    error.value = err.message;
  }
});

const deleteGenre = async () => {
  if (confirm("Do you really want to delete this genre?")) {
    try {
      const docRef = doc(db, "genres", props.id);
      await deleteDoc(docRef);
      router.push("/genres"); // redirect to genre list
    } catch (err) {
      error.value = err.message;
    }
  }
};
</script>

<style scoped></style>
