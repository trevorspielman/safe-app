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
const unlockCodes = firebase.firestore().collection('unlockCodes')

export const store = {
  currentSafes: [],
  unlockCodes: [],
  currentSafe: {},
  currentSafeNumber: 0,
  safeTransactions: [],
  safeOpen: false,

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
        })
    })
  },

  //gets all transactions where the safeID matches
  getTransactions: () => {
    availableSafes.onSnapshot((transactionsRef) => {
      let strSafeId = store.currentSafeNumber.toString()
      var tempTransactionRegister = []
      availableSafes.doc(strSafeId).collection("transactions").where("safeId", "==", strSafeId).orderBy('createdAt').get()
        .then(res => {
          res.forEach(doc => {
            tempTransactionRegister.push(doc.data())
          })
          store.safeTransactions = tempTransactionRegister
          //calculates total for display as well as updating total on the safe doc.
          var total = 0
          for (let i = 0; i < store.safeTransactions.length; i++) {
            const transaction = store.safeTransactions[i];
            if (transaction.transType == "Withdrawal") {
              total -= Number(transaction.total)
            }
            else {
              total += Number(transaction.total)
            }
            store.currentSafe.totalAmount = total
          }
          availableSafes.doc(strSafeId).update({ totalAmount: store.currentSafe.totalAmount })
        })
    })
  },
  unlockSafe: (transactionId) => {
    let unlockCode = transactionId + "-" + store.currentSafeNumber
    if (store.unlockCodes.includes(unlockCode.toString())) {
      store.safeOpen = true
      unlockCodes.doc(unlockCode).update({ transactionComplete: true })
    }
    else {
      alert("Invalid Unlock Code.")
    }
  },
  lockSafe: (transactionId) => {
    store.getTransactions()
    let unlockCode = transactionId + "-" + store.currentSafeNumber
    let strSafeId = store.currentSafeNumber.toString()
    unlockCodes.doc(unlockCode).update({ transactionComplete: false })
      .then(res => {
        unlockCodes.doc(unlockCode).delete()
        console.log("safe code deleted")
      })
  }

}

//gets all safes in the availableSafes collection
availableSafes.get()
  .then(res => {
    store.currentSafes = res.docs
  })

unlockCodes.onSnapshot((transactionsRef) => {
  unlockCodes.get()
    .then(res => {
      res.forEach(doc => {
        store.unlockCodes.push(doc.id)
      })
    })
})
