<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="authors.length && genres.length">
    <h1>Create Book</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Title:</label>
        <input v-model="title" type="text" placeholder="Name of book" required/>
      </div>
      <div>
        <label>Author:</label>
        <select v-model="authorId" required>
          <option v-for="author in authors" :key="author.id" :value="author.id">{{ author.familyName}}, {{ author.firstName }}</option>
        </select>
      </div>
      <div>
        <label>Summary:</label>
        <input v-model="summary" type="text" placeholder="Summary of book" required/>
      </div>
      <div>
        <label>ISBN:</label>
        <input v-model="isbn" type="text" placeholder="A 13-digit ISBN" required/>
      </div>
      <div>
        <label>Genre:</label>
        <div>
          <select v-model="genreId" required>
            <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name}}</option>
          </select>
        </div>
      </div>
      <div class="submit">
        <button>Create</button>
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

const router = useRouter()

const authors = ref([])
const genres = ref([])
const title = ref('')
const authorId = ref(null)
const summary = ref('')
const isbn = ref('')
const genreId = ref(null)
const error = ref(null)

onMounted(async () => {
  try {
    let data = await db.collection('authors').get()
    authors.value = data.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    })
    data = await db.collection('genres').get()
    genres.value = data.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    })
  } catch (err) {
    error.value = err.message
  }
})

const handleSubmit = async () => {
  const book = {
    title: title.value,
    authorId: authorId.value,
    summary: summary.value,
    isbn: isbn.value,
    genreId: genreId.value
  }
  try {
    await db.collection('books').add(book)
    router.push('/books') // redirect to book list
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
input[type=checkbox] {
  display: inline;
  width: auto;
  margin: 3px;
  padding: 0;
  box-sizing: border-box;
}
select {
  display: block;
  width: 100%;
  padding: 10px 6px;
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
