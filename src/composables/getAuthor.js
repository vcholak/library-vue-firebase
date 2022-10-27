import { ref } from 'vue'

const getAuthor = (id, uri) => {
  const booksUri = 'http://localhost:3000/books'

  const error = ref(null)
  const loaded = ref(false)
  const author = ref(null)
  const books = ref([])

  const load = async () => {
    try {
      const resp = await Promise.all([fetch(uri), fetch(booksUri)])
      const data = await Promise.all(resp.map(e => e.json()))
      author.value = data[0]
      const allBooks = data[1]
      books.value = allBooks.filter(b => b.authorId === Number(id))
      loaded.value = true
    } catch (err) {
      error.value = err.message
    }
  }

  return { error, loaded, author, books, load }
}

export default getAuthor
