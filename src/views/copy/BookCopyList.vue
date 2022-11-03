<template>
  <h1>Book Copy List</h1>
  <div>
    <router-link to="/copies/create">Create Book Copy</router-link>
  </div>
  <div v-if="error">{{ error }}</div>
  <ul>
    <li v-for="copy in copies" :key="copy.id">
      <router-link :to="{name: 'BookCopyDetails', params: {id: copy.id}}">{{copy.title}} : {{copy.imprint}}</router-link>
      <span> - {{copy.status}}</span>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../../firebase/config'

const copies = ref([])
const error = ref(null)

onMounted(async () => {
  try {
    const data = await db.collection('copies').get()
    const resp = await db.collection('books').get()
    const books = resp.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    })
    copies.value = data.docs.map(doc => {
      const d = doc.data()
      const book = books.find(b => b.id === d.bookId)
      return { ...d, id: doc.id, title: book.title }
    })
  } catch (err) {
    error.value = err.message
  }
})
</script>

<style>
  li {
    text-align: left;
  }
</style>
