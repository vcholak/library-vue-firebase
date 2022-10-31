<template>
  <h1>Book Copy List</h1>
  <div>
    <router-link to="/copies/create">Create Book Copy</router-link>
  </div>
  <div v-if="error">{{ error }}</div>
  <ul>
    <li v-for="copy in copies" :key="copy.id">
      <router-link :to="{name: 'BookCopyDetails', params: {id: copy.id}}">{{copy.bookTitle}} : {{copy.imprint}}</router-link>
      <span> - {{copy.status}}</span>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const copies = ref([])
const error = ref(null)

const uri = 'http://localhost:3000/copies'

onMounted(async () => {
  try {
    const resp = await fetch(uri)
    const data = await resp.json()
    copies.value = data
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
