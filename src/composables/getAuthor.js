import { ref } from "vue";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const getAuthor = (id) => {
  const error = ref(null);
  const loaded = ref(false);
  const author = ref(null);
  const books = ref([]);

  const load = async () => {
    try {
      const docRef = doc(db, "authors", id);
      const resp = await getDoc(docRef);
      if (!resp.exists) {
        throw new Error("No Author found with ID=" + id);
      }
      author.value = { ...resp.data(), id: resp.id };

      const colRef = collection(db, "books");
      const booksResp = await getDocs(colRef);
      const allBooks = booksResp.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      books.value = allBooks.filter((b) => b.authorId === id);
      loaded.value = true;
    } catch (err) {
      error.value = err.message;
    }
  };
  return { error, loaded, author, books, load };
};

export default getAuthor;
