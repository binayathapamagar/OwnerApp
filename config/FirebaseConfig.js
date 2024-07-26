// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//Import necessary firebase services
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyANJftqE68RNga5rt2E8yH3CHSKfOpZ0XU',
  authDomain: 'group5-car-owner-renter.firebaseapp.com',
  projectId: 'group5-car-owner-renter',
  storageBucket: 'group5-car-owner-renter.appspot.com',
  messagingSenderId: '139704963492',
  appId: '1:139704963492:web:ee708cbf46c21cc654b131',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication obj and get a reference to the service
const auth = getAuth(app)

// Initialize Firebase Firestore obj and get a ref to the service
const db = getFirestore(app)

// Export the auth object to use in other files
export { auth }

// Export the firestore object to use in other files
export { db }
