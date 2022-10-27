<template>
  <div v-if="error">{{ error }}</div>
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

import { useRoute, useRouter } from 'vue-router'
import getAuthor from '../../composables/getAuthor'

export default {
  props: ['id'],
  setup (props) {
    const route = useRoute()
    const id = route.params.id
    const uri = 'http://localhost:3000/authors/' + id

    const { error, loaded, author, books, load } = getAuthor(id, uri)

    const router = useRouter()

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

    load()

    return { error, loaded, author, books, deleteAuthor }
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
