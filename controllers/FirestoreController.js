import { auth } from '../config/FirebaseConfig'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

class FirestoreController {
  //Constructors
  constructor() {
    if (FirestoreController.instance) {
      return FirestoreController.instance
    }

    FirestoreController.instance = this
  }

  //Static functions
  static getInstance() {
    if (!FirestoreController.instance) {
      FirestoreController.instance = new FirestoreController()
    }

    return FirestoreController.instance
  }

  //Firestore methods
  async signUserInWith(email, password, setLoading) {
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

  async performLogout({ navigation }, setLoading) {
    try {
      setLoading(true)
      await signOut(auth)
      console.log(`Successfully signing the user out.`)
      if (navigation.canGoBack()) {
        navigation.dispatch(StackActions.popToTop)
      }
    } catch (err) {
      console.log(`Error while signing the user out: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  //Other methods
}

export default FirestoreController
