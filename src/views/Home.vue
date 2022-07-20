<template>
  <div class="home">
    <h1>Welcome to Local Library</h1>
    <h2>Dynamic content</h2>
    <p>The library has the following record counts:</p>
    <ul>
      <li>
        <strong>Books: </strong>{{booksCnt}}
      </li>
      <li>
        <strong>Copies: </strong>{{copiesCnt}}
      </li>
      <li>
        <strong>Available Copies: </strong>{{availableCopiesCnt}}
      </li>
      <li>
        <strong>Authors: </strong>{{authorsCnt}}
      </li>
      <li>
        <strong>Genres: </strong>{{genresCnt}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      booksCnt: null,
      copiesCnt: null,
      availableCopiesCnt: null,
      authorsCnt: null,
      genresCnt: null,
      loaded: false,
      booksUri: 'http://localhost:3000/books/',
      copiesUri: 'http://localhost:3000/copies/',
      authorsUri: 'http://localhost:3000/authors',
      genresUri: 'http://localhost:3000/genres'
    }
  },
  mounted () {
    Promise.all([
      fetch(this.booksUri),
      fetch(this.copiesUri),
      fetch(this.authorsUri),
      fetch(this.genresUri)
    ]).then(
      resp => Promise.all(resp.map(e => e.json()))
    ).then(
      data => {
        console.log(data)
        this.booksCnt = data[0].length
        this.copiesCnt = data[1].length
        this.availableCopiesCnt = data[1].filter(e => e.status === 'Available').length
        this.authorsCnt = data[2].length
        this.genresCnt = data[3].length
      }
    ).catch(err => console.log(err))
  }
}
</script>

<style scoped>
ul {
  position: relative;
  left: 45%;
  list-style-type: none;
}
</style>
