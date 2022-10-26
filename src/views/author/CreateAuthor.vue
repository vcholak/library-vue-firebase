<template>
  <h1>Create Author</h1>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>First Name:</label>
      <input type="text" required v-model="firstName"/>
    </div>
    <div>
      <label>Family Name:</label>
      <input type="text" required v-model="familyName"/>
    </div>
    <div>
      <label>Date of birth:</label>
      <input type="date" required v-model="birthDate"/>
    </div>
    <div>
      <label>Date of death:</label>
      <input type="date" v-model="deathDate"/>
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
      firstName: '',
      familyName: '',
      birthDate: null,
      deathDate: null
    }
  },
  methods: {
    async handleSubmit () {
      const author = {
        firstName: this.firstName,
        familyName: this.familyName,
        birthDate: this.birthDate,
        deathDate: this.deathDate
      }
      console.log(author)
      try {
        await fetch('http://localhost:3000/authors',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(author)
          })
        this.$router.push('/authors') // redirect to author list
      } catch (err) {
        console.log(err)
      }
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
