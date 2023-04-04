import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAOVp6Kft7v_HHoIWfN_9WJ2NtiQVuXymw',
  authDomain: 'sharelink-9e2db.firebaseapp.com',
  projectId: 'sharelink-9e2db',
  storageBucket: 'sharelink-9e2db.appspot.com',
  messagingSenderId: '880571270027',
  appId: '1:880571270027:web:084ed109fd908f005f258e',
  measurementId: 'G-GX7LQS91BE'
}

const firebase = initializeApp(firebaseConfig)
const auth = getAuth(firebase)

const db = getFirestore()

const userFirebase = (user) => {
  console.log(user)
  return user
}

export const onAuthStateChange = (onChange) => {
  auth.onAuthStateChanged(user => {
    const normalizeUser = user ? userFirebase(user) : null
    onChange(normalizeUser)
  })
}

export const logOut = () => {
  signOut(auth)
  // falta desarrollar!!
}

export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider).then(
    (res) => {
      return res.user
    }
  )
}

export const addLink = async (description) => {
  try {
    const doc = await addDoc(collection(db, 'sharelink'), {
      description,
      createdAt: Timestamp.fromDate(new Date()),
      downloadsCount: 0,
      pathFiles: ''
    })
    console.log(doc.id)
    return doc.id
  } catch (e) {
    console.log(e)
  }
}
