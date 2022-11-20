<template>
  <h1>Create Author</h1>
  <div v-if="error">{{ error }}</div>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>First Name:</label>
      <input v-model="firstName" type="text" required/>
    </div>
    <div>
      <label>Family Name:</label>
      <input v-model="familyName" type="text" required/>
    </div>
    <div>
      <label>Date of birth:</label>
      <input v-model="birthDate" type="date" required/>
    </div>
    <div>
      <label>Date of death:</label>
      <input v-model="deathDate" type="date"/>
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

const firstName = ref('')
const familyName = ref('')
const birthDate = ref(null)
const deathDate = ref(null)
const error = ref(null)

const router = useRouter()

const handleSubmit = async () => {
  const author = {
    firstName: firstName.value,
    familyName: familyName.value,
    birthDate: birthDate.value,
    deathDate: deathDate.value
  }
  try {
    await db.collection('authors').add(author)

    router.push('/authors') // redirect to author list
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
  form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
  }
  label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }
  input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
  }
  button {
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
  }
  .submit {
    text-align: center;
  }
</style>
