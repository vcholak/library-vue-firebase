<template>
  <div v-if="loaded">
    <h1>Update Book Copy</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Book:</label>
        <select v-model="bookId" required>
          <option :value="book.id" v-for="book in books" :key="book.id">{{book.title}}</option>
        </select>
      </div>
      <div>
        <label>Imprint:</label>
        <input type="text" placeholder="Publisher and date information" required v-model="imprint"/>
      </div>
      <div>
        <label>Date when book available:</label>
        <input type="date" required v-model="availableDate"/>
      </div>
      <div>
        <label>Status:</label>
        <select v-model="status" required>
          <option :value="status" v-for="status in statuses" :key="status">{{status}}</option>
        </select>
      </div>
      <div class="submit">
        <button>Update</button>
      </div>
    </form>
  </div>
  <div v-else>
    <p>Loading Data ...</p>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      loaded: false,
      uri: 'http://localhost:3000/copies/' + this.id,
      booksUri: 'http://localhost:3000/books',
      books: [],
      bookId: null,
      bookTitle: '',
      imprint: '',
      availableDate: null,
      status: '',
      statuses: ['Maintenance', 'Available', 'Loaned', 'Reserved']
    }
  },
  mounted () {
    Promise.all([
      fetch(this.uri),
      fetch(this.booksUri)
    ]).then(
      resp => Promise.all(resp.map(e => e.json()))
    ).then(data => {
      const copy = data[0]
      this.bookId = copy.bookId
      this.bookTitle = copy.bookTitle
      this.imprint = copy.imprint
      this.availableDate = copy.availableDate
      this.status = copy.status
      this.books = data[1]
      this.loaded = true
    }).catch(err => console.log(err))
  },
  methods: {
    handleSubmit () {
      const bookCopy = {
        bookId: this.bookId,
        bookTitle: this.books.find(e => e.id === this.bookId).title,
        imprint: this.imprint,
        availableDate: this.availableDate,
        status: this.status
      }
      fetch(this.uri, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookCopy)
      }).then(() => {
        this.$router.push('/copies') // redirect to book copy list
      }).catch(err => console.log(err))
    }
  }

}
</script>

<style>
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
select {
  display: block;
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
