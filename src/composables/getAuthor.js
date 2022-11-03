import { ref } from 'vue'
import { db } from '../firebase/config'

const getAuthor = (id) => {
  const error = ref(null)
  const loaded = ref(false)
  const author = ref(null)
  const books = ref([])

  const load = async () => {
    try {
      const resp = await db.collection('authors').doc(id).get()
      if (!resp.exists) {
        throw new Error('No Author found with ID=' + id)
      }
      author.value = { ...resp.data(), id: resp.id }
      const booksResp = await db.collection('books').get()
      const allBooks = booksResp.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
      books.value = allBooks.filter(b => db.doc(b.author.id) === Number(id)) // FIXME b.author.id
      loaded.value = true
    } catch (err) {
      error.value = err.message
    }
  }

  return { error, loaded, author, books, load }
}

export default getAuthor
