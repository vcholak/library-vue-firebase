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
    // console.log(data)
    copies.value = data.docs.map(doc => {
      console.log(doc.data().book.get())
      // const ref = doc.book
      const book = doc.data().book.get()
      return { ...doc.data(), id: doc.id, title: book.title }
    })
    // console.log(copies.value)
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
