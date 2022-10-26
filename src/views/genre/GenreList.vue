<template>
  <h1>Genre List</h1>
  <div>
    <router-link to="/genres/create">Create Genre</router-link>
  </div>
  <div>
    <ul>
      <li v-for="genre in genres" :key="genre.id">
        <router-link :to="{name: 'GenreDetails', params: {id: genre.id}}">{{genre.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'GenreList',
  data () {
    return {
      genres: [],
      uri: 'http://localhost:3000/genres'
    }
  },
  async mounted () {
    try {
      const resp = await fetch(this.uri)
      const data = await resp.json()
      this.genres = data
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
