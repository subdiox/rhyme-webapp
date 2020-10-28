<template>
  <div class="pa-3">
    <h3>Your coin</h3>
    <div class="mb-5">
      <h1
        style="font-size: 180px; text-align: center; margin-bottom: 0"
      >{{ coin }}</h1>
      <p
        style="text-align: right;"
      >coin</p>
    </div>
    <div class="d-flex align-end mb-3">
      <v-text-field
        v-model="buyNumber"
        class="mr-1"
        label="rhyme"
        type="number"
        hide-details
        outlined
        dense
      ></v-text-field>
      <p style="margin-bottom: 0;">00</p>
    </div>
    <v-btn
      @click="purchaseCoin"
      block
      color="primary"
    >Purchase</v-btn>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

type DataType = {
  coin: number;
  buyNumber: number;
};

export default Vue.extend({
  data(): DataType {
    return {
      coin: 0,
      buyNumber: 1
    }
  },
  methods: {
    purchaseCoin() {
      (window as any).webkit.messageHandlers.purchase.postMessage(`com.queueinc.rhyme.100coin,${this.buyNumber}`)
    },
    fetchRestore() {
      const response = (window as any).webkit.messageHandlers.restore.postMessage(`${this.buyNumber}`)
      if (typeof response === 'number') {
        this.coin = response
      }
    }
  },
  mounted() {
    this.fetchRestore()
  }
})
</script>
