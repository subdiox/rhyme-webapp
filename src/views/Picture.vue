<template>
<div>
  <!-- dialog -->
  <v-dialog
    v-model="buyDialog"
  >
    <v-card>
      <v-card-title>
        購入しますか？
      </v-card-title>
      <v-card-text>
        No. {{ selectedImageNo }} , cost: {{ price }}
      </v-card-text>
      <v-card-actions>
        <v-row class="px-8">
          <v-btn text @click="buyDialog = false">キャンセル</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="buyPhoto" :loading="btnLoading" depressed color="primary">購入</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- main contents -->
  <v-container fluid class="px-12">
    <h3>Generated Pictures</h3>
    <div class="d-flex flex-wrap">
      <div
        style="width: 33%; margin-right: .3%; margin-bottom: .3%"
        v-for="item in 40"
        :key="item"
      >
        <div v-if="isPurchased(item)">
          <img
            style="width: 100%"
            class="d-block"
            :src="require(`@/assets/${item}.jpg`)"
          />
        </div>
        <v-img
          v-else
          :src="require(`@/assets/${item}.jpg`)"
        >
          <v-overlay absolute opacity="0.9">
            <v-btn text @click="clickPhoto(item)">
              <v-icon
                light
              >mdi-lock
              </v-icon>
              {{ price }}
            </v-btn>
          </v-overlay>
        </v-img>
      </div>
    </div>
    <!-- <v-row>
      <v-col
        v-for="item in 40"
        :key="item"
        cols="4"
        sm="4"
        md="3"
        lg="2"
        xl="2"
      >
        <img
          v-if="isPurchased(item)"
          class="d-block"
          :src="require(`@/assets/${item}.jpg`)"
        />
        <v-img
          v-else
          :src="require(`@/assets/${item}.jpg`)"
        >
          <v-overlay absolute opacity="0.9">
            <v-btn text @click="clickPhoto(item)">
              <v-icon
                light
              >mdi-lock
              </v-icon>
              {{ price }}
            </v-btn>
          </v-overlay>
        </v-img>
      </v-col>
    </v-row> -->
  </v-container>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Picture',

  data() {
    return {
      price: 100,
      buyDialog: false,
      purchasedImages: [] as number[],
      selectedImageNo: 0,
      btnLoading: false
    }
  },

  mounted() {
    const list = localStorage.getItem('purchasedImages');
    console.log(list)
    if (list !== null) {
      this.purchasedImages = JSON.parse(list);
    }
    (window as any).paymentComplete = (isComplete: boolean) => {
      // 処理
      if (isComplete) {
        this.purchasedImages.push(this.selectedImageNo)
        console.log(this.purchasedImages)
        localStorage.setItem('purchasedImages', JSON.stringify(this.purchasedImages));
      }
      this.buyDialog = false;
      this.btnLoading = false
    };
  },

  methods: {
    clickPhoto(num: number) {
      this.selectedImageNo = (num - 1);
      this.buyDialog = true;
    },
    buyPhoto() {
      // Todo: 課金処理
      (window as any).webkit.messageHandlers.purchase.postMessage(`com.queueinc.rhyme.100coin,1`)
      this.btnLoading = true
    },
    isPurchased(num: number): boolean {
      console.log(this.purchasedImages.indexOf(num-1))
      return this.purchasedImages.indexOf(num-1) == -1 ? false : true;
    }
  }
})
</script>
