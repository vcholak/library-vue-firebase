import { ref } from 'vue'

const getAuthors = () => {
  const uri = 'http://localhost:3000/authors'

  const authors = ref([])
  const error = ref(null)

  const load = async () => {
    try {
      const resp = await fetch(uri)
      const data = await resp.json()
      authors.value = data
    } catch (err) {
      error.value = err.message
    }
  }

  return { authors, error, load }
}

export default getAuthors
