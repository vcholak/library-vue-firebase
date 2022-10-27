<template>
  <h1>Author List</h1>
  <div>
    <router-link to="/authors/create">Create Author</router-link>
  </div>
  <ul>
    <li v-for="author in authors" :key="author.id">
      <router-link :to="{name: 'AuthorDetails', params: {id: author.id}}">{{ author.familyName}}, {{ author.firstName }}</router-link>
    </li>
  </ul>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AuthorList',
  setup () {
    const uri = 'http://localhost:3000/authors'

    const authors = ref([])

    const load = async () => {
      try {
        const resp = await fetch(uri)
        const data = await resp.json()
        authors.value = data
      } catch (err) {
        console.log(err)
      }
    }

    load()

    return { authors }
  }
}
</script>

<style scoped>
  li {
    text-align: left;
  }
</style>
