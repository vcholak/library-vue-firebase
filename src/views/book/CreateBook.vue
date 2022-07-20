<template>
  <div v-if="authors.length && genres.length">
    <h1>Create Book</h1>
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
            <input type="checkbox" :value="genre.id" v-model="genreIds">
            <label style="display: inline-block; vertical-align:middle; margin: 0 0 0.3rem;">{{genre.name}}</label>
          </div>
        </div>
      </div>
      <div class="submit">
        <button>Create</button>
      </div>
    </form>
  </div>
  <div v-else>
    <p>Loading Data ...</p>
  </div>
</template>

<script>
export default {
  name: 'CreateBook',
  data () {
    return {
      authors: [],
      authorsUri: 'http://localhost:3000/authors',
      genres: [],
      genresUri: 'http://localhost:3000/genres',
      title: '',
      authorId: null,
      summary: '',
      isbn: '',
      genreIds: []
    }
  },
  mounted () {
    // Promise.all([
    //   fetch(this.authorsUri)
    //     .then(resp => resp.json())
    //     .then(data => { this.authors = data })
    //     .catch(err => console.log(err)),
    //   fetch(this.genresUri)
    //     .then(resp => resp.json())
    //     .then(data => { this.genres = data })
    //     .catch(err => console.log(err))
    // ])
    Promise.all([
      fetch(this.authorsUri),
      fetch(this.genresUri)
    ]).then(
      resp => Promise.all(resp.map(e => e.json()))
    ).then(
      data => {
        console.log(data)
        this.authors = data[0]
        this.genres = data[1]
      }
    ).catch(err => console.log(err))
  },
  methods: {
    handleSubmit () {
      const book = {
        title: this.title,
        authorId: this.authorId,
        summary: this.summary,
        isbn: this.isbn,
        genreIds: this.genreIds
      }
      console.log(book)
      fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
      }).then(() => {
        this.$router.push('/books') // redirect to book list
      }).catch(err => console.log(err))
    }
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
input[type=checkbox] {
  display: inline;
  width: auto;
  margin: 3px;
  padding: 0;
  box-sizing: border-box;
}
select {
  display: block;
  width: 100%;
  padding: 10px 6px;
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
