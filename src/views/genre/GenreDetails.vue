<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="loaded">
    <h1>Genre: {{genre.name}}</h1>
    <div style="margin-left:20px;margin-top:20px">
      <h4>Books</h4>
      <div v-if="books.length">
        <dl>
          <div v-for="book in books" :key="book.id">
            <dt>
              <router-link :to="{name: 'BookDetails', params: {id: book.id}}">{{book.title}}</router-link>
            </dt>
          </div>
        </dl>
      </div>
      <div v-else>
        <span>This genre has no books</span>
      </div>
    </div>
    <hr>
    <button>
      <router-link :to="{name: 'UpdateGenre', params: {id: genre.id}}">Update</router-link>
    </button>
    <button @click="deleteGenre">Delete</button>
  </div>
  <div v-else>
    <p>Loading Genre Details ...</p>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db } from '../../firebase/config'

const props = defineProps(['id'])
const router = useRouter()

const genre = ref(null)
const books = ref([])
const loaded = ref(false)
const error = ref(null)

const uri = 'http://localhost:3000/genres/' + props.id
const booksUri = 'http://localhost:3000/books'

onMounted(async () => {
  try {
    const resp = await db.collection('genres').doc(props.id).get()
    if (!resp.exists) {
      throw new Error('No Genre found with ID=' + props.id)
    }
    genre.value = { ...resp.data(), id: resp.id }
    const resp2 = await fetch(booksUri)
    const allBooks = await resp2.json()
    console.log(allBooks)
    books.value = allBooks.filter(b => b.genreId === resp.id)
    loaded.value = true
  } catch (err) {
    error.value = err.message
  }
})

const deleteGenre = async () => {
  if (confirm('Do you really want to delete this genre?')) {
    try {
      await fetch(uri, { method: 'DELETE' })
      router.push('/genres') // redirect to genre list
    } catch (err) {
      error.value = err.message
    }
  }
}
</script>

<style scoped>

</style>
