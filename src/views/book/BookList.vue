<template>
  <h1>Book List</h1>
  <div>
    <router-link to="/books/create">Create Book</router-link>
  </div>
  <ul>
    <li v-for="book in books" :key="book.id">
      <router-link :to="{name: 'BookDetails', params: {id: book.id}}">{{book.title}}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BookList',
  data () {
    return {
      books: [],
      uri: 'http://localhost:3000/books'
    }
  },
  mounted () {
    fetch(this.uri)
      .then(resp => resp.json())
      .then(data => { this.books = data })
      .catch(err => console.log(err))
  }

}
</script>

<style scoped>
  li {
    text-align: left;
  }
</style>
