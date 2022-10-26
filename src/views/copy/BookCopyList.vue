<template>
  <h1>Book Copy List</h1>
  <div>
    <router-link to="/copies/create">Create Book Copy</router-link>
  </div>
  <ul>
    <li v-for="copy in copies" :key="copy.id">
      <router-link :to="{name: 'BookCopyDetails', params: {id: copy.id}}">{{copy.bookTitle}} : {{copy.imprint}}</router-link>
      <span> - {{copy.status}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      copies: [],
      uri: 'http://localhost:3000/copies'
    }
  },
  async mounted () {
    try {
      const resp = await fetch(this.uri)
      const data = await resp.json()
      this.copies = data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style>
  li {
    text-align: left;
  }
</style>
