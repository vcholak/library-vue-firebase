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
import { collection } from "firebase/firestore";

const props = defineProps(["id"]);

const router = useRouter();

const copy = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    const resp = await collection(db, "copies").doc(props.id).get();
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
      await collection(db, "copies").doc(props.id).delete();
      router.push("/copies"); // redirect to book copy list
    } catch (err) {
      error.value = err.message;
    }
  }
};
</script>

<style></style>
