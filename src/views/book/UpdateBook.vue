<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="loaded">
    <h1>Update Book</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Title:</label>
        <input type="text" placeholder="Name of book" required v-model="title"/>
      </div>
      <div>
        <label>Author:</label>
        <select v-model="authorId" required>
          <option :value="author.id" v-for="author in authors" :key="author.id">{{ author.familyName}}, {{ author.firstName }}</option>
        </select>
      </div>
      <div>
        <label>Summary:</label>
        <input type="text" placeholder="Summary of book" required v-model="summary"/>
      </div>
      <div>
        <label>ISBN:</label>
        <input type="text" placeholder="A 13-digit ISBN" required v-model="isbn"/>
      </div>
      <div>
        <label>Genre:</label>
        <div>
          <div v-for="genre in genres" :key="genre.id" style="display: inline; padding-right:10px;">
            <input type="checkbox" :value="genre.id" v-model="genreIds" style="display: inline;">
            <label style="display: inline;">{{genre.name}}</label>
          </div>
        </div>
      </div>
      <div class="submit">
        <button>Update</button>
      </div>
    </form>
  </div>
  <div v-else>
    <p>Loading Data ...</p>
  </div>
  <p>Selected genre Ids: {{genreIds}}</p>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['id'])
const router = useRouter()

const loaded = ref(false)
const authors = ref([])
const genres = ref([])
const title = ref('')
const authorId = ref(null)
const summary = ref('')
const isbn = ref('')
const genreIds = ref([])
const error = ref(null)

const bookUri = 'http://localhost:3000/books/' + props.id
const authorsUri = 'http://localhost:3000/authors'
const genresUri = 'http://localhost:3000/genres'

onMounted(async () => {
  try {
    const resp = await fetch(bookUri)
    const book = await resp.json()
    title.value = book.title
    authorId.value = book.authorId
    summary.value = book.summary
    isbn.value = book.isbn
    genreIds.value = book.genreIds
    const resp2 = await Promise.all([fetch(authorsUri), fetch(genresUri)])
    const data = await Promise.all(resp2.map(e => e.json()))
    authors.value = data[0]
    genres.value = data[1]
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
    genreIds: genreIds.value
  }
  try {
    await fetch(bookUri, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    })
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
