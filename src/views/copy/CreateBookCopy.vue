<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="books.length">
    <h1>Create Book Copy</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Book:</label>
        <select v-model="bookId" required>
          <option v-for="book in books" :key="book.id" :value="book.id">
            {{ book.title }}
          </option>
        </select>
      </div>
      <div>
        <label>Imprint:</label>
        <input
          v-model="imprint"
          type="text"
          placeholder="Publisher and date information"
          required
        />
      </div>
      <div>
        <label>Date when book available:</label>
        <input v-model="availableDate" type="date" required />
      </div>
      <div>
        <label>Status:</label>
        <select v-model="status" required>
          <option v-for="option in statuses" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
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
import { collection } from "firebase/firestore";

const router = useRouter();

const books = ref([]);
const bookId = ref(null);
const imprint = ref("");
const availableDate = ref(null);
const status = ref("");
const statuses = ref(["Maintenance", "Available", "Loaned", "Reserved"]);
const error = ref(null);

onMounted(async () => {
  try {
    const data = await collection(db, "books").get();
    books.value = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  } catch (err) {
    error.value = err.message;
  }
});

const handleSubmit = async () => {
  const bookCopy = {
    bookId: bookId.value,
    bookTitle: books.value.find((e) => e.id === bookId.value).title,
    imprint: imprint.value,
    availableDate: availableDate.value,
    status: status.value,
  };
  try {
    await collection(db, "copies").add(bookCopy);
    router.push("/copies"); // redirect to book copy list
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style></style>
