<template>
  <div class="transaction container-fluid">
    <div class="row">
      <div class="col-sm-12">
        <h1>Safe Authorized For: {{store.currentSafe.username}}</h1>
        <h3>Safe is:
          <span v-if="store.safeOpen == true">Open</span>
          <span v-else>Closed</span>
        </h3>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-lg-6 numPad" v-if="store.safeOpen == false">
        <!-- <form action="submit" @submit.prevent="unlockSafe">
          <input type="number" placeholder="Transaction ID" v-model.number.lazy="transactionId">
          <button type="submit" class="btn btn-success">Unlock Safe</button>
        </form> -->
  
        <table class="table">
          <tbody>
            <tr>
              <button class="btn btn-secondary" @click="enterCode(1)">1</button>
              <button class="btn btn-secondary" @click="enterCode(2)">2</button>
              <button class="btn btn-secondary" @click="enterCode(3)">3</button>
            </tr>
            <tr>
              <button class="btn btn-secondary" @click="enterCode(4)">4</button>
              <button class="btn btn-secondary" @click="enterCode(5)">5</button>
              <button class="btn btn-secondary" @click="enterCode(6)">6</button>
            </tr>
            <tr>
              <button class="btn btn-secondary" @click="enterCode(7)">7</button>
              <button class="btn btn-secondary" @click="enterCode(8)">8</button>
              <button class="btn btn-secondary" @click="enterCode(9)">9</button>
            </tr>
            <tr>
              <button class="btn btn-secondary" @click="enterCode(0)">0</button>
            </tr>
          </tbody>
        </table>
        <h4>Safe Code: {{this.transactionId}}</h4>
        <button class="btn btn-block btn-success" @click="unlockSafe">Unlock Safe</button>
        <button class="btn btn-danger mt-4" @click="clear">Clear</button>
      </div>
      <div class="col-sm-12 col-lg-6 numPad" v-else>
        <button class="btn btn-danger" @click="lockSafe">Close & Lock Safe</button>
      </div>
      <div class="col-sm-12 col-lg-6 transactions">
        <h2>Transactions:</h2>
        <h3>Current Balance: ${{store.currentSafe.totalAmount}}</h3>
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Date</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in store.safeTransactions">
              <td>{{transaction.transType}}</td>
              <td>{{transaction.createdAt}}</td>
              <td>${{transaction.total}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import { store } from '../store'
  export default {
    name: 'Transaction',
    mounted() {
    },
    data() {
      return {
        store,
        transactionId: '',
      }
    },
    methods: {
      getTransactions() {
        store.getTransactions()
      },
      enterCode(num) {
        this.transactionId = this.transactionId.concat(num)
      },
      clear() {
        this.transactionId = ''
      },
      unlockSafe() {
        store.unlockSafe(this.transactionId)
      },
      lockSafe() {
        store.safeOpen = false
        store.lockSafe(this.transactionId)
        this.transactionId = ''
      }
    },
    computed: {
      currentSafes() {
        return this.$store.currentSafes
      },
      currentSafe() {
        return this.$store.currentSafe
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .numPad {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 4rem 0rem;
    width: 50vw
  }
  .numPad .table{
    width: 50%;
  }

  .numPad tr {
    display: flex;
    justify-content: space-around;
  }

  .table .btn {
    width: 80px;
    margin: 5px 0px
  }

  .transactions {
    margin: 4rem 0rem;
    width: 50vw
  }
  .transactions td{
    border-bottom: solid 1px black
  }
</style>