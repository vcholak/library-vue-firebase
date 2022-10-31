<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="loaded">
    <h1>Update Genre</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Name:</label>
        <input type="text" placeholder="Name of genre" required v-model="name"/>
      </div>
      <div class="submit">
        <button>Update</button>
      </div>
    </form>
  </div>
  <div v-else>
    <p>Loading Data ...</p>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['id'])
const router = useRouter()

const loaded = ref(false)
const name = ref('')
const error = ref(null)

const uri = 'http://localhost:3000/genres/' + props.id

onMounted(async () => {
  try {
    const resp = await fetch(uri)
    const data = await resp.json()
    name.value = data.name
    loaded.value = true
  } catch (err) {
    error.value = err.message
  }
})

const handleSubmit = async () => {
  const genre = {
    name: name.value
  }
  try {
    await fetch(uri, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(genre)
    })
    router.push('/genres') // redirect to book list
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>

</style>
