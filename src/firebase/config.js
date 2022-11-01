import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyACWI4T2l-7jZkc9A7xkVDHBljZVNMwM-Y',
  authDomain: 'library-e4a0a.firebaseapp.com',
  projectId: 'library-e4a0a',
  storageBucket: 'library-e4a0a.appspot.com',
  messagingSenderId: '719651866636',
  appId: '1:719651866636:web:236f0f97e05e81e0bc0629'
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init firestore service
const firestore = firebase.firestore()

export { firestore }
