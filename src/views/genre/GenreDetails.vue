<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="genre">
    <h1>Genre: {{genre.name}}</h1>
    <div style="margin-left:20px;margin-top:20px">
      <h4>Books</h4>
      <div>TODO</div>
    </div>
    <hr>
    <button>
      <router-link :to="{name: 'UpdateGenre', params: {id: genre.id}}">Update</router-link>
    </button>
    <button @click="deleteGenre">Delete</button>
  </div>
  <div v-else>
    <p>Loading Genre Details ...</p>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['id'])
const router = useRouter()

const genre = ref(null)
const error = ref(null)

const uri = 'http://localhost:3000/genres/' + props.id

onMounted(async () => {
  try {
    const resp = await fetch(uri)
    const data = await resp.json()
    genre.value = data
  } catch (err) {
    error.value = err.message
  }
})

const deleteGenre = async () => {
  if (confirm('Do you really want to delete this genre?')) {
    try {
      await fetch(uri, { method: 'DELETE' })
      router.push('/genres') // redirect to genre list
    } catch (err) {
      error.value = err.message
    }
  }
}
</script>

<style scoped>

</style>
