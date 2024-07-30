import { auth } from '../config/FirebaseConfig'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

class FirebaseAuthController {
  //Constructors
  constructor() {
    if (FirebaseAuthController.instance) {
      return FirebaseAuthController.instance
    }

    FirebaseAuthController.instance = this
  }

  //Static functions
  static getInstance() {
    if (!FirebaseAuthController.instance) {
      FirebaseAuthController.instance = new FirebaseAuthController()
    }

    return FirebaseAuthController.instance
  }

  //Firebase Auth methods
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

export default FirebaseAuthController
