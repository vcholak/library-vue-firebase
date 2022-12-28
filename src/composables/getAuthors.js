import { ref } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

const getAuthors = () => {
  const authors = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      const colRef = collection(db, "authors");
      const data = await getDocs(colRef);
      authors.value = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    } catch (err) {
      error.value = err.message;
    }
  };

  return { authors, error, load };
};

export default getAuthors;
