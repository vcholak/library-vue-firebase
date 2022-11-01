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
import { firestore } from '../../firebase/config'

const copies = ref([])
const error = ref(null)

onMounted(async () => {
  try {
    const data = await firestore.collection('copies').get()
    copies.value = data.docs.map(doc => {
      console.log(doc.data())
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
