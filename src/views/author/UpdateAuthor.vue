<template>
  <h1>Update Author</h1>
  <div v-if="error">{{ error }}</div>
  <div v-if="loaded">
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
        <button>Update</button>
      </div>
    </form>
  </div>
  <div v-else>
    <p>Loading Author Details ...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { db } from "@/firebase/config";
import { collection } from "firebase/firestore";
import firebase from "firebase/compat/app";

const props = defineProps(["id"]);
const router = useRouter();

const firstName = ref("");
const familyName = ref("");
const birthDate = ref(null);
const deathDate = ref(null);
const error = ref(null);
const loaded = ref(false);

onMounted(async () => {
  try {
    const resp = await collection(db, "authors").doc(props.id).get();
    if (!resp.exists) {
      throw new Error("No Author found with ID=" + props.id);
    }
    const author = resp.data();
    firstName.value = author.firstName;
    familyName.value = author.familyName;
    birthDate.value = author.birthDate.toDate().toISOString().substring(0, 10);
    if (author.deathDate) {
      deathDate.value = author.deathDate
        .toDate()
        .toISOString()
        .substring(0, 10);
    }
    loaded.value = true;
  } catch (err) {
    error.value = err.message;
  }
});

const handleSubmit = async () => {
  const author = {
    firstName: firstName.value,
    familyName: familyName.value,
    birthDate: firebase.firestore.Timestamp.fromDate(new Date(birthDate.value)),
    deathDate: deathDate.value
      ? firebase.firestore.Timestamp.fromDate(new Date(deathDate.value))
      : null,
  };
  try {
    await collection(db, "authors").doc(props.id).update(author);
    router.push("/authors"); // redirect to author list
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped></style>
