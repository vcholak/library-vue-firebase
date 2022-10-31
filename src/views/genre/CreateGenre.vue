<template>
  <h1>Create Genre</h1>
  <div v-if="error">{{ error }}</div>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Name:</label>
      <input type="text" placeholder="Fantasy, Poetry etc." required v-model="name"/>
    </div>
    <div class="submit">
      <button>Create</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const error = ref(null)

const handleSubmit = async () => {
  try {
    await fetch('http://localhost:3000/genres', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.value })
    })
    router.push('/genres') // redirect to genre list
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped>

</style>
