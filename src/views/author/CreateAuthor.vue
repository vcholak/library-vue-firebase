<template>
  <h1>Create Author</h1>
  <div v-if="error">{{ error }}</div>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>First Name:</label>
      <input v-model="firstName" type="text" required />
    </div>
    <div>
      <label>Family Name:</label>
      <input v-model="familyName" type="text" required />
    </div>
    <div>
      <label>Date of birth:</label>
      <input v-model="birthDate" type="date" required />
    </div>
    <div>
      <label>Date of death:</label>
      <input v-model="deathDate" type="date" />
    </div>
    <div>
      <button>Create</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const firstName = ref("");
const familyName = ref("");
const birthDate = ref(null);
const deathDate = ref(null);
const error = ref(null);

const router = useRouter();

const handleSubmit = async () => {
  const author = {
    firstName: firstName.value,
    familyName: familyName.value,
    birthDate: birthDate.value,
    deathDate: deathDate.value,
  };
  try {
    const colRef = collection(db, "authors");
    await addDoc(colRef, author);

    router.push("/authors"); // redirect to author list
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped></style>
