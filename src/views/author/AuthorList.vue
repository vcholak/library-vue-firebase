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
export default {
  name: 'AuthorList',
  data () {
    return {
      authors: [],
      uri: 'http://localhost:3000/authors'
    }
  },
  async mounted () {
    // fetch(this.uri)
    // .then(resp => resp.json())
    // .then(data => { this.authors = data })
    // .catch(err => console.log(err))
    try {
      const resp = await fetch(this.uri)
      const data = await resp.json()
      this.authors = data
    } catch (err) {
      console.log(err)
    }
  }

}
</script>

<style scoped>
  li {
    text-align: left;
  }
</style>
