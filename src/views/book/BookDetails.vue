<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="loaded">
    <h1>Title: {{book.title}}</h1>
    <p>
      <strong>Author: </strong>
      <router-link :to="{name: 'AuthorDetails', params: {id: author.id}}">{{ author.familyName}}, {{ author.firstName }}</router-link>
    </p>
    <p>
      <strong>Summary: </strong>{{book.summary}}
    </p>
    <p>
      <strong>ISBN: </strong>{{book.isbn}}
    </p>
    <p>
      <strong>Genre:</strong>
      <span v-for="genre in genres" :key="genre.id">
        <router-link :to="{name: 'GenreDetails', params: {id: genre.id}}">{{ genre.name}}</router-link>
      </span>
    </p>
    <div class="copies">
      <h4>Copies</h4>
      <div v-if="copies.length">
        <div v-for="copy in copies" :key="copy.id">
          <hr>
          <p class="text-danger">{{copy.status}}</p>
          <p>
            <strong>Imprint: </strong>{{copy.imprint}}
          </p>
          <p>
            <strong>Id: </strong>
            <router-link :to="{name: 'BookCopyDetails', params: {id: copy.id}}">{{copy.id}}</router-link>
          </p>
        </div>
      </div>
      <div v-else>There are no copies of this book in the library</div>
    </div>
    <hr>
    <button>
      <router-link :to="{name: 'UpdateBook', params: {id: book.id}}">Update</router-link>
    </button>
    <button @click="deleteBook">Delete</button>
  </div>
  <div v-else>
    <p>Loading Book Details ...</p>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'

const props = defineProps(['id'])

const loaded = ref(false)
const book = ref(null)
const author = ref(null)
const genres = ref([])
const copies = ref([])
const error = ref(null)

const bookUri = 'http://localhost:3000/books/' + props.id
const genresUri = 'http://localhost:3000/genres/'
const copiesUri = 'http://localhost:3000/copies'

onMounted(async () => {
  try {
    const resp = await fetch(bookUri)
    const book = await resp.json()
    book.value = book
    const authorUri = 'http://localhost:3000/authors/' + book.authorId
    const genreIds = book.genreIds
    const resp2 = await Promise.all([fetch(authorUri), fetch(genresUri), fetch(copiesUri)])
    const data = await Promise.all(resp2.map(e => e.json()))
    author.value = data[0]
    genres.value = data[1].filter(e => genreIds.includes(e.id))
    copies.value = data[2].filter(c => c.bookId === this.book.id)
    loaded.value = true
  } catch (err) {
    error.value = err.message
  }
})

const deleteBook = async () => {
  if (confirm('Do you really want to delete this Book?')) {
    try {
      await fetch(this.bookUri, { method: 'DELETE' })
      this.$router.push('/books') // redirect to book list
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>
p {
  text-align: left;
}
div.copies {
  margin-left: 20px;
  margin-top: 20px;
  text-align: left;
}
h4 {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
}
span {
    margin-left: 10px;
}
.text-success {
    color: #28a745!important;
}
.text-warning {
    color: #ffc107!important;
}
.text-danger {
    color: #dc3545!important;
}
</style>
