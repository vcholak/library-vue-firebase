<template>
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

<script>
export default {
  props: ['id'],
  data () {
    return {
      loaded: false,
      book: null,
      bookUri: 'http://localhost:3000/books/' + this.id,
      author: null,
      genres: [],
      genresUri: 'http://localhost:3000/genres/',
      copies: [],
      copiesUri: 'http://localhost:3000/copies'
    }
  },
  async mounted () {
    try {
      const resp = await fetch(this.bookUri)
      const book = await resp.json()
      this.book = book
      const authorUri = 'http://localhost:3000/authors/' + book.authorId
      const genreIds = book.genreIds
      const resp2 = await Promise.all([fetch(authorUri), fetch(this.genresUri), fetch(this.copiesUri)])
      const data = await Promise.all(resp2.map(e => e.json()))
      this.author = data[0]
      this.genres = data[1].filter(e => genreIds.includes(e.id))
      this.copies = data[2].filter(c => c.bookId === this.book.id)
      this.loaded = true
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    deleteBook () {
      if (confirm('Do you really want to delete this Book?')) {
        fetch(this.bookUri, { method: 'DELETE' })
          .then(() => {
            this.$router.push('/books') // redirect to book list
          }).catch(err => console.log(err))
      }
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
