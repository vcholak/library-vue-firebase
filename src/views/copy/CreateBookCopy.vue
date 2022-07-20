<template>
  <div v-if="books.length">
    <h1>Create Book Copy</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Book:</label>
        <select v-model="bookId" required>
          <option :value="book.id" v-for="book in books" :key="book.id">{{ book.title}}</option>
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
  data () {
    return {
      uri: 'http://localhost:3000/books',
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
    fetch(this.uri)
      .then(resp => resp.json())
      .then(data => { this.books = data })
      .catch(err => console.log(err))
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
      fetch('http://localhost:3000/copies', {
        method: 'POST',
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
