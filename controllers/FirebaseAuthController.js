import { auth } from '../config/FirebaseConfig'
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth'

class FirebaseAuthController {
  constructor() {
    if (FirebaseAuthController.instance) {
      return FirebaseAuthController.instance
    }

    FirebaseAuthController.instance = this
  }

  static getInstance = () => {
    if (!FirebaseAuthController.instance) {
      FirebaseAuthController.instance = new FirebaseAuthController()
    }

    return FirebaseAuthController.instance
  }

  signUserInWith = async (email, password, setLoading) => {
    try {
      setLoading(true)
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log(
        `signUserInWith: User signed in successfully: ${JSON.stringify(
          userCredential
        )}`
      )
      console.log(
        `signUserInWith: Account ${userCredential.user.email} signed in successfully`
      )
      return { success: true }
    } catch (err) {
      console.log(`signUserInWith: Error signing the user in : ${err}`)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  signUserUpWith = async (email, password, setLoading) => {
    try {
      setLoading(true)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log(
        `signUserUpWith: User created successfully: ${JSON.stringify(
          userCredential
        )}`
      )
      console.log(
        `signUserUpWith: Account ${userCredential.user.email} created successfully`
      )
      return { success: true }
    } catch (err) {
      console.log(`signUserUpWith: Error creating the user : ${err}`)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  performLogout = async (setLoading) => {
    try {
      setLoading(true)
      await signOut(auth)
      console.log(`Successfully signed the user out.`)
      return { success: true }
    } catch (err) {
      console.log(`Error while signing the user out: ${err}`)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }
}

export default FirebaseAuthController
