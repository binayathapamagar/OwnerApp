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
}

export default FirestoreController
