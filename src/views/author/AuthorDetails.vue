<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="loaded">
    <h1>Author: {{ author.familyName }}, {{ author.firstName }}</h1>
    <p>
      {{ birthDate }} -
      <span v-if="author.deathDate">{{ deathDate }}</span>
      <span v-else>Alive</span>
    </p>
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
            <dd>{{ book.summary }}</dd>
          </div>
        </dl>
      </div>
      <div v-else>
        <span>This author has no books</span>
      </div>
    </div>
    <hr />
    <button>
      <router-link :to="{ name: 'UpdateAuthor', params: { id: author.id } }"
        >Update</router-link
      >
    </button>
    <button @click="deleteAuthor">Delete</button>
  </div>
  <div v-else>
    <p>Loading Author Details ...</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import getAuthor from "../../composables/getAuthor";
import { db } from "../../firebase/config";

const props = defineProps(["id"]);
const router = useRouter();

// const route = useRoute()
// const id = route.params.id

const { error, loaded, author, books, load } = getAuthor(props.id);

const deleteAuthor = async () => {
  if (confirm("Do you really want to delete this Author?")) {
    try {
      await db.collection("authors").doc(props.id).delete();
      router.push("/authors"); // redirect to author list
    } catch (err) {
      error.value = err.message;
    }
  }
};

const birthDate = computed(() => {
  return author.value.birthDate.toDate().toDateString();
});

const deathDate = computed(() => {
  return author.value.deathDate.toDate().toDateString();
});

load();
</script>

<style scoped>
button {
  margin: 20px;
}
dt,
dd {
  text-align: left;
}
</style>
