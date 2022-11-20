<template>
  <h1>Create Genre</h1>
  <div v-if="error">{{ error }}</div>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Name:</label>
      <input v-model="name" type="text" placeholder="Fantasy, Poetry etc." required/>
    </div>
    <div class="submit">
      <button>Create</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { db } from '../../firebase/config'

const router = useRouter()

const name = ref('')
const error = ref(null)

const handleSubmit = async () => {
  try {
    await db.collection('genres').add({ name: name.value })
    router.push('/genres') // redirect to genre list
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>

</style>
