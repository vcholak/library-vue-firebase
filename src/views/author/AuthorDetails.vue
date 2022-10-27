<template>
  <div v-if="loaded">
    <h1>Author: {{author.familyName}}, {{author.firstName}}</h1>
    <p>{{author.birthDate}} -
      <span v-if="author.deathDate">{{author.deathDate}}</span>
      <span v-else>Alive</span>
    </p>
    <div style="margin-left:20px;margin-top:20px">
      <h4>Books</h4>
      <div v-if="books.length">
        <dl>
          <div v-for="book in books" :key="book.id">
            <dt>
              <router-link :to="{name: 'BookDetails', params: {id: book.id}}">{{book.title}}</router-link>
            </dt>
            <dd>{{book.summary}}</dd>
          </div>
        </dl>
      </div>
      <div v-else>
        <span>This author has no books</span>
      </div>
    </div>
    <hr>
    <button>
      <router-link :to="{name: 'UpdateAuthor', params: {id: author.id}}">Update</router-link>
    </button>
    <button @click="deleteAuthor">Delete</button>
  </div>
  <div v-else>
    <p>Loading Author Details ...</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  props: ['id'],
  setup (props) {
    const router = useRouter()
    const uri = 'http://localhost:3000/authors/' + props.id
    const booksUri = 'http://localhost:3000/books'

    const loaded = ref(false)
    const author = ref(null)
    const books = ref([])

    const deleteAuthor = async () => {
      if (confirm('Do you really want to delete this Author?')) {
        try {
          await fetch(uri, { method: 'DELETE' })
          router.push('/authors') // redirect to author list
        } catch (err) {
          console.log(err)
        }
      }
    }

    const load = async () => {
      try {
        const resp = await Promise.all([fetch(uri), fetch(booksUri)])
        const data = await Promise.all(resp.map(e => e.json()))
        author.value = data[0]
        const allBooks = data[1]
        books.value = allBooks.filter(b => b.authorId === Number(props.id))
        loaded.value = true
      } catch (err) {
        console.log(err)
      }
    }

    load()

    return { loaded, author, books, deleteAuthor }
  }
}
</script>

<style scoped>
  button {
    margin: 20px;
  }
  dt,dd {
    text-align: left;
  }
</style>
