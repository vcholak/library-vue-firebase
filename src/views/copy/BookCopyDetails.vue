<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="copy">
    <h1>Book Copy Details</h1>
    <p>
      <strong>Title: </strong>
      <router-link :to="{ name: 'BookDetails', params: { id: copy.bookId } }">{{
        copy.bookTitle
      }}</router-link>
    </p>
    <p><strong>Imprint: </strong>{{ copy.imprint }}</p>
    <p><strong>Status: </strong>{{ copy.status }}</p>
    <hr />
    <button>
      <router-link :to="{ name: 'UpdateBookCopy', params: { id: copy.id } }"
        >Update</router-link
      >
    </button>
    <button @click="deleteBookCopy">Delete</button>
  </div>
  <div v-else>
    <p>Loading Data ...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { db } from "@/firebase/config";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

const props = defineProps(["id"]);

const router = useRouter();

const copy = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    const docRef = doc(db, "copies", props.id);
    const resp = await getDoc(docRef);
    if (!resp.exists) {
      throw new Error("No Book Copy found with ID=" + props.id);
    }
    copy.value = { ...resp.data(), id: resp.id };
  } catch (err) {
    error.value = err.message;
  }
});

const deleteBookCopy = async () => {
  if (confirm("Do you really want to delete this book copy?")) {
    try {
      const docRef = doc(db, "copies", props.id);
      await deleteDoc(docRef);
      router.push("/copies"); // redirect to book copy list
    } catch (err) {
      error.value = err.message;
    }
  }
};
</script>

<style></style>
