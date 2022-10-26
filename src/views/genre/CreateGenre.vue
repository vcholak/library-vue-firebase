<template>
  <h1>Create Genre</h1>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Name:</label>
      <input type="text" placeholder="Fantasy, Poetry etc." required v-model="name"/>
    </div>
    <div class="submit">
      <button>Create</button>
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    async handleSubmit () {
      try {
        await fetch('http://localhost:3000/genres', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: this.name })
        })
        this.$router.push('/genres') // redirect to genre list
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
