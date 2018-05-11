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
  currentSafe: [],

  //adding the new safe number to the availableSafes collection
  addSafe: (safeNum) =>{
    var strSafeNum = safeNum.toString()
    var safeData = {
      isConnected: false,
      totalAmount: 0,
      username: ""
    }
    availableSafes.doc(strSafeNum).set(safeData)
    console.log(availableSafes)
  }

}

//gets all safes in teh availableSafes collection
availableSafes.get()
  .then(res => {
    store.currentSafes = res.docs
  })

//collects the data of each safe in the collection and console.logs it.
availableSafes.onSnapshot((safesRef) => {
  store.currentSafes.forEach((doc) => {
    const safe = doc.data()
    safe.id = doc.id
    store.currentSafe.push(safe)
  })
  console.log(store.currentSafe)
})

