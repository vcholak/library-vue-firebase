<template>
  <div v-if="copy">
    <h1>Book Copy Details</h1>
      <p>
        <strong>Title: </strong>
        <router-link :to="{name: 'BookDetails', params: {id: copy.bookId}}">{{ copy.bookTitle}}</router-link>
      </p>
      <p>
        <strong>Imprint: </strong>{{copy.imprint}}
      </p>
      <p>
        <strong>Status: </strong>{{copy.status}}
      </p>
      <hr>
      <button>
      <router-link :to="{name: 'UpdateBookCopy', params: {id: copy.id}}">Update</router-link>
    </button>
    <button @click="deleteBookCopy">Delete</button>
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
      uri: 'http://localhost:3000/copies/' + this.id,
      copy: null
    }
  },
  mounted () {
    fetch(this.uri)
      .then(resp => resp.json())
      .then(data => { this.copy = data })
      .catch(err => console.log(err))
  },
  methods: {
    deleteBookCopy () {
      if (confirm('Do you really want to delete this book copy?')) {
        fetch(this.uri, { method: 'DELETE' })
          .then(() => {
            this.$router.push('/copies') // redirect to book copy list
          }).catch(err => console.log(err))
      }
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
