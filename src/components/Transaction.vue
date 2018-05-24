<template>
  <div class="transaction">
    <h1>Welcome: {{store.currentSafe.username}}</h1>
    <h3>Current Balance: ${{store.currentSafe.totalAmount}}</h3>
    <h3>Safe is: <span v-if="store.safeOpen == true">Open</span><span v-else>Closed</span></h3>
    <div v-if="store.safeOpen == false">
      <form action="submit" @submit.prevent="unlockSafe">
        <input type="number" placeholder="Transaction ID" v-model.number.lazy="transactionId">
        <button type="submit" class="btn btn-success">Unlock Safe</button>
      </form>
    </div>
    <div v-else>
      <button class="btn btn-danger" @click="lockSafe">Close & Lock Safe</button>
    </div>
    <div v-for="transaction in store.safeTransactions">
      <p>Transaction Type: {{transaction.transType}}</p>
      <p>Date: {{transaction.createdAt}}</p>
      <p>Total: ${{transaction.total}}</p>
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
        transactionId: 0,
      }
    },
    methods: {
      getTransactions() {
        store.getTransactions()
      },
      unlockSafe() {
        store.unlockSafe(this.transactionId)
      },
      lockSafe() {
        store.safeOpen = false
        store.lockSafe(this.transactionId)
        this.transactionId = 0
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
</style>