<template>
  <div class="transaction">
    <h1>Welcome: {{store.currentSafe.username}}</h1>
    <h3>Current Balance: ${{store.currentSafe.totalAmount.toFixed(2)}}</h3>
    <form action="submit" @submit.prevent="unlockSafe">
      <input type="number" placeholder="Transaction ID" v-model.number="transactionId">
      <button type="submit" class="btn btn-success">Unlock Safe</button>
    </form>
    <div v-for="transaction in store.safeTransactions">
      <p>Transaction Type: {{transaction.transType}}</p>
      <p>Bills: ${{transaction.bills}}</p>
      <p>Coins: ${{transaction.coins}}</p>
      <p>Checks: ${{transaction.checks}}</p>
      <p>Total: ${{transaction.total}}</p>
    </div>
  </div>
</template>

<script>
  import { store } from '../store'
  export default {
    name: 'transaction',
    mounted() {
      this.getTransactions()
    },
    data() {
      return {
        store,
        transactionId: 0,
      }
    },
    methods: {
      getTransactions(){
        store.getTransactions(store.currentSafeNumber)
      },
      unlockSafe() {
        store.getTransactions(store.currentSafeNumber)
      }
    },
    computed: {
      currentSafes() {
        return this.$store.currentSafes
      },
      currentSafe() {
        return this.$store.currentSafe
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>