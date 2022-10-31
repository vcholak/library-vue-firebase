<template>
  <h1>Book List</h1>
  <div>
    <router-link to="/books/create">Create Book</router-link>
  </div>
  <div v-if="error">{{ error }}</div>
  <ul>
    <li v-for="book in books" :key="book.id">
      <router-link :to="{name: 'BookDetails', params: {id: book.id}}">{{book.title}}</router-link>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const books = ref([])
const error = ref(null)

const uri = 'http://localhost:3000/books'

onMounted(async () => {
  try {
    const resp = await fetch(uri)
    const data = await resp.json()
    books.value = data
  } catch (err) {
    error.value = err.message
  }
})
</script>

<style scoped>
  li {
    text-align: left;
  }
</style>
