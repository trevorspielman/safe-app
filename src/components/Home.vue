<template>
  <div class="home">
    <div v-if="store.currentSafe.isConnected == true">
      <transaction></transaction>
    </div>
    <div v-else>
      <h1>Welcome to the SafeApp</h1>
      <h2>Your safe code is: {{this.safeNumber}}</h2>
      <p>Please use your phone to connect to the safe for your deposit/withdrawl</p>
    </div>
  </div>
</template>

<script>
  import { store } from '../store'
  import transaction from './Transaction'
  export default {
    name: 'Home',
    mounted() {
      this.generateSafeNum()
    },
    data() {
      return {
        store,
        safeNumber: 0,
        transactionId: 0
      }
    },
    methods: {
      //Random Number Generator for safe number. Generates on load of page.
      generateSafeNum() {
        this.safeNumber = Math.floor(Math.random() * (9999-1000)) + 1000
        store.currentSafeNumber = this.safeNumber
        store.addSafe(this.safeNumber)
      },
    },
    computed: {
      currentSafes() {
        return this.$store.currentSafes
      },
      currentSafe() {
        return this.$store.currentSafe
      }
    },
    components: {
      transaction,
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>