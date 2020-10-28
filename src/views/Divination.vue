<template>
  <div class="pa-3">
    <h3>Divination</h3>
    <h5>Price: $1.00</h5>
    <div class="mb-5" v-if="result">
      <h2
        style="font-size: 60px;"
        class="text-center my-6"
      >{{ result.label }}</h2>
      <h3 class="mb-6">{{ result.description }}</h3>
      <h3 class="mb-2">Health luck <v-icon v-for="i in healthLuck" :key="i">mdi-star</v-icon></h3>
      <h3 class="mb-2">Love luck <v-icon v-for="i in loveLuck" :key="i">mdi-star</v-icon></h3>
      <h3 class="mb-2">Career luck <v-icon v-for="i in careerLuck" :key="i">mdi-star</v-icon></h3>
      <h3 class="mb-2">Lucky color is
        <span :class="`${luckyColor}--text`">{{ luckyColor }}.</span>
      </h3>
      <h3>Lucky number is {{ luckyNumber }}.</h3>
    </div>
    <v-btn
      @click="sendPurchase"
      block
      class="mt-10"
      :disabled="isPurchased"
      color="primary"
    >Purchase Divination</v-btn>
    <p>{{hoge}}</p>
    <!-- <v-btn
      @click="sendRestore"
      block
      class="mt-10"
      color="primary"
    >Restore</v-btn> -->
    <v-btn
      @click="getDivinationResult"
      block
      class="mt-10"
      :disabled="!isPurchased"
      color="primary"
    >Draw</v-btn>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

type DataType = {
  result: DivinationEntity | null;
  luckyColor: string;
  luckyNumber: number;
  healthLuck: number;
  loveLuck: number;
  careerLuck: number;
  isPurchased: boolean;
  hoge: string;
};

interface DivinationEntity {
  label: string;
  japanese: string;
  description: string;
  coefficient: number;
}

export default Vue.extend({
  name: 'Divination',

  data(): DataType {
    return {
      result: null,
      luckyColor: '',
      luckyNumber: 0,
      healthLuck: 0,
      loveLuck: 0,
      careerLuck: 0,
      isPurchased: false,
      hoge: ''
    };
  },

  computed: {
    devinationChoices(): DivinationEntity[] {
      return [
        {
          label: 'Great blessing',
          japanese: '大吉',
          description: '今日もいい一日になるでしょう！',
          coefficient: 1.0,
        },
        {
          label: 'Blessing',
          japanese: '中吉',
          description: 'いい感じの一日になるでしょう！',
          coefficient: 0.8,
        },
        {
          label: 'Middle blessing',
          japanese: '中吉',
          description: 'まあまあな一日になるでしょう',
          coefficient: 0.7,
        },
        {
          label: 'Small blessing',
          japanese: '小吉',
          description: 'そこそこです',
          coefficient: 0.6,
        },
        {
          label: 'Future blessing',
          japanese: '末吉',
          description: 'あまり良い一日ではないかもしれません',
          coefficient: 0.5,
        },
        {
          label: 'Curse',
          japanese: '凶',
          description: '悪いことに気をつけましょう',
          coefficient: 0.3,
        },
        {
          label: 'Great curse',
          japanese: '大凶',
          description: '外には出ないほうがいいでしょう',
          coefficient: 0.3,
        },
      ];
    },
    colors(): string[] {
      return [ 'red', 'pink', 'purple', 'indigo', 'blue', 'green', 'yellow', 'orange', 'brown', 'grey'];
    },
  },

  mounted() {
    (window as any).webkit.messageHandlers.restore.postMessage("");
    (window as any).restoreComplete = (isComplete: boolean) => {
      this.isPurchased = isComplete
    };
    (window as any).paymentComplete = (isComplete: boolean) => {
      this.isPurchased = isComplete
    };
  },

  methods: {
    sendPurchase() {
      (window as any).webkit.messageHandlers.purchase.postMessage("com.queueinc.rhyme.divine,1");
    },
    getDivinationResult(): void {
      const index = Math.round(Math.random() * (this.devinationChoices.length - 1));
      this.result = this.devinationChoices[index];
      const colorIndex = Math.round(Math.random() * (this.colors.length - 1));
      this.luckyColor = this.colors[colorIndex];
      this.luckyNumber = Math.round(Math.random() * 100);
      this.healthLuck = Math.round((Math.random() * 2 + 3) * this.devinationChoices[index].coefficient);
      this.loveLuck = Math.round((Math.random() * 2 + 3) * this.devinationChoices[index].coefficient);
      this.careerLuck = Math.round((Math.random() * 2 + 3) * this.devinationChoices[index].coefficient);
    },
  }
})
</script>
