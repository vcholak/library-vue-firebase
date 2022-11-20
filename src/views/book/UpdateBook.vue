<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="loaded">
    <h1>Update Book</h1>
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
        <select v-model="genreId" required>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name}}</option>
        </select>
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
    let resp = await db.collection('books').doc(props.id).get()
    if (!resp.exists) {
      throw new Error('No Book found with ID=' + props.id)
    }
    const book = { ...resp.data(), id: resp.id }
    title.value = book.title
    authorId.value = book.authorId
    summary.value = book.summary
    isbn.value = book.isbn
    genreId.value = book.genreId
    resp = await db.collection('authors').get()
    authors.value = resp.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    })
    resp = await db.collection('genres').get()
    genres.value = resp.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    })
    loaded.value = true
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
    db.collection('books').doc(props.id).update(book)
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
select {
  display: block;
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
