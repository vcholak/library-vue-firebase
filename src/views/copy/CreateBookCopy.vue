<template>
  <div v-if="error">{{ error }}</div>
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

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db } from '../../firebase/config'

const router = useRouter()

const books = ref([])
const bookId = ref(null)
const imprint = ref('')
const availableDate = ref(null)
const status = ref('')
const statuses = ref(['Maintenance', 'Available', 'Loaned', 'Reserved'])
const error = ref(null)

onMounted(async () => {
  try {
    const data = await db.collection('books').get()
    books.value = data.docs.map(doc => {
      return { ...doc.data(), id: doc.id }
    })
  } catch (err) {
    error.value = err.message
  }
})

const handleSubmit = async () => {
  const bookCopy = {
    bookId: bookId.value,
    bookTitle: books.value.find(e => e.id === bookId.value).title,
    imprint: imprint.value,
    availableDate: availableDate.value,
    status: status.value
  }
  try {
    await db.collection('copies').add(bookCopy)
    router.push('/copies') // redirect to book copy list
  } catch (err) {
    error.value = err.message
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
