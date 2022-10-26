<template>
  <div v-if="genre">
    <h1>Genre: {{genre.name}}</h1>
    <div style="margin-left:20px;margin-top:20px">
      <h4>Books</h4>
    </div>
  </div>
  <div v-else>
    <p>Loading Genre Details ...</p>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      genre: null,
      uri: 'http://localhost:3000/genres/' + this.id
    }
  },
  async mounted () {
    try {
      const resp = await fetch(this.uri)
      const data = await resp.json()
      this.genre = data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>

</style>
