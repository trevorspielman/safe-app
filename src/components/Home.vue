<template>
  <div class="home">
    <div v-if="store.currentSafe.isConnected == false">
      <h1>Welcome to the SafeApp</h1>
      <h2>Your safe code is: {{this.safeNumber}}</h2>
      <p>Please use your phone to connect to the safe for your deposit/withdrawl</p>
    </div>
    <div v-else>
      <h1>Welcome: {{store.currentSafe.username}}</h1>
      <h3>Current Balance: ${{store.currentSafe.totalAmount.toFixed(2)}}</h3>
      <form action="submit" @submit.prevent="unlockSafe">
        <input type="number" placeholder="Transaction ID" v-model="transactionId">
        <button type="submit" class="btn btn-success">Unlock Safe</button>
      </form>
    </div>
  </div>
</template>

<script>
  import { store } from '../store'
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
        this.safeNumber = Math.floor(Math.random() * 9999) + 1000
        store.addSafe(this.safeNumber)
      },
      unlockSafe() {

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