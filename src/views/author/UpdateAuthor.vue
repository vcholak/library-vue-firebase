<template>
  <h1>Update Author</h1>
  <div v-if="error">{{ error }}</div>
  <div v-if="firstName">
    <form @submit.prevent="handleSubmit">
      <div>
        <label>First Name:</label>
        <input type="text" required v-model="firstName"/>
      </div>
      <div>
        <label>Family Name:</label>
        <input type="text" required v-model="familyName"/>
      </div>
      <div>
        <label>Date of birth:</label>
        <input type="date" required v-model="birthDate"/>
      </div>
      <div>
        <label>Date of death:</label>
        <input type="date" v-model="deathDate"/>
      </div>
      <div class="submit">
        <button>Update</button>
      </div>
    </form>
  </div>
  <div v-else>
    <p>Loading Author Details ...</p>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db } from '../../firebase/config'

const props = defineProps(['id'])
const router = useRouter()

const firstName = ref('')
const familyName = ref('')
const birthDate = ref(null)
const deathDate = ref(null)
const error = ref(null)

onMounted(async () => {
  try {
    const data = await db.collection('authors').doc(props.id).get()
    firstName.value = data.firstName
    familyName.value = data.familyName
    birthDate.value = data.birthDate
    deathDate.value = data.deathDate
  } catch (err) {
    error.value = err.message
  }
})

const handleSubmit = async () => {
  const author = {
    firstName: firstName.value,
    familyName: familyName.value,
    birthDate: birthDate.value,
    deathDate: deathDate.value
  }
  try {
    await db.collection('authors').doc(props.id).update(author)
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
