import vue from 'vue'
import router from '../router'
import firebase from 'firebase'
import 'firebase/firestore'




//Firebase initialization
var config = {
  apiKey: "AIzaSyC3iDHLGR2iatFVXme54drDre-RRu0hlIA",
  authDomain: "safe-test-90584.firebaseapp.com",
  databaseURL: "https://safe-test-90584.firebaseio.com",
  projectId: "safe-test-90584",
  storageBucket: "safe-test-90584.appspot.com",
  messagingSenderId: "497360363492"
};
firebase.initializeApp(config);

const firestore = firebase.firestore()
//a reference to the availableSafes collection
const availableSafes = firebase.firestore().collection('availableSafes')

export const store = {
  currentSafes: [],
  //will need to clean up or adjust current safe. 
  currentSafe: {},

  //adding the new safe number to the availableSafes collection
  addSafe: (safeNum) => {
    var strSafeNum = safeNum.toString()
    var safeData = {
      isConnected: false,
      totalAmount: 0,
      username: ""
    }
    availableSafes.doc(strSafeNum).set(safeData)
    //keeps an eye on changing data, then sets it to the store.currentSafe object for display.
    availableSafes.onSnapshot((safesRef) => {
      let tempSafe = availableSafes.doc(strSafeNum)
      tempSafe.get()
        .then(res => {
          store.currentSafe = res.data()
          console.log("current Safe", strSafeNum, store.currentSafe)
        })
    })
  }

}

//gets all safes in the availableSafes collection
availableSafes.get()
  .then(res => {
    store.currentSafes = res.docs
  })

