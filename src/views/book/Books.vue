<template>
  <h1>Book List</h1>
  <div v-for="book in books" :key="book.id">
    <router-link :to="{name: 'BookDetails', params: {id: book.id}}">{{ book.title }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'Books',
  data () {
    return {
      books: [],
      uri: 'http://localhost:3000/books'
    }
  },
  async mounted () {
    try {
      const resp = await fetch(this.uri)
      const data = await resp.json()
      this.books = data
    } catch (err) {
      console.log(err)
    }
  }

}
</script>
