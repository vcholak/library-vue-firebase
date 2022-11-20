<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="loaded">
    <h1>Update Genre</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Name:</label>
        <input v-model="name" type="text" placeholder="Name of genre" required/>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db } from '../../firebase/config'

const props = defineProps(['id'])

const router = useRouter()

const loaded = ref(false)
const name = ref('')
const error = ref(null)

onMounted(async () => {
  try {
    const resp = await db.collection('genres').doc(props.id).get()
    if (!resp.exists) {
      throw new Error('No Genre found with ID=' + props.id)
    }
    const genre = resp.data()
    name.value = genre.name
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
    db.collection('genres').doc(props.id).update(genre)
    router.push('/genres') // redirect to book list
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>

</style>
