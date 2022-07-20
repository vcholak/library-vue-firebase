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
export default {
  props: ['id'],
  data () {
    return {
      loaded: false,
      author: null,
      uri: 'http://localhost:3000/authors/' + this.id,
      booksUri: 'http://localhost:3000/books',
      books: []
    }
  },
  mounted () {
    Promise.all([
      fetch(this.uri),
      fetch(this.booksUri)
    ]).then(
      resp => Promise.all(resp.map(e => e.json()))
    ).then(data => {
      this.author = data[0]
      const allBooks = data[1]
      this.books = allBooks.filter(b => b.authorId === Number(this.id))
      this.loaded = true
    }).catch(err => console.log(err))
  },
  methods: {
    deleteAuthor () {
      if (confirm('Do you really want to delete this Author?')) {
        fetch(this.uri, { method: 'DELETE' })
          .then(() => {
            this.$router.push('/authors') // redirect to author list
          }).catch(err => console.log(err))
      }
    }
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
