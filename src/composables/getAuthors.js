import { ref } from 'vue'
import { firestore } from '../../firebase/config'

const getAuthors = () => {
  const authors = ref([])
  const error = ref(null)

  const load = async () => {
    try {
      const data = await firestore.collection('authors').get()
      authors.value = data.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
    } catch (err) {
      error.value = err.message
    }
  }

  return { authors, error, load }
}

export default getAuthors
