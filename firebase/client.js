import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAOVp6Kft7v_HHoIWfN_9WJ2NtiQVuXymw',
  authDomain: 'sharelink-9e2db.firebaseapp.com',
  projectId: 'sharelink-9e2db',
  storageBucket: 'sharelink-9e2db.appspot.com',
  messagingSenderId: '880571270027',
  appId: '1:880571270027:web:084ed109fd908f005f258e',
  measurementId: 'G-GX7LQS91BE'
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const userFirebase = (user) => {
  console.log(user)
  const { email } = user.email
  const profileUser = {
    email
  }
  return profileUser
}

export const onAuthStateChange = (onChange) => {
  firebase.auth().onAuthStateChanged(user => {
    const normalizeUser = user ? userFirebase(user) : null
    onChange(normalizeUser)
  })
}

export const logOut = () => {
  firebase.auth().signOut()
}

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(googleProvider)
}
