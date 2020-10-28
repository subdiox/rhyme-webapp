<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Rhyme</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <!-- <v-list-item @click="routerLink('Purchase')">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Purchase</v-list-item-title>
          </v-list-item> -->
          <v-list-item @click="routerLink('Picture')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Picture</v-list-item-title>
          </v-list-item>

          <v-list-item @click="routerLink('Divination')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Divination</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  components: {
  },

  data() {
    return {
      drawer: false,
      group: null,
    }
  },
  methods: {
    routerLink(name: string) {
      this.$router.push({
        name: name
      })
      this.drawer = false
    }
  },
  created() {
    (window as any).webkit.messageHandlers.FCM.postMessage(`START_RECIEVING`);
  }
});
</script>
