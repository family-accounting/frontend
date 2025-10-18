<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-avatar aria-hidden="true" slot="start">
          <img src="/logo.svg" />
        </ion-avatar>
        <ion-title slot="start">
          Family Accounting
        </ion-title>
      </ion-toolbar>

    </ion-header>
    <ion-content :fullscreen="true" :scroll-y="true">

      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-list>
        <ion-item :detail="true" button :routerLink="`/tabs/wallets/${wallet.id}`" v-for="wallet in wallets"
          :key="wallet.id">
          <ion-icon aria-hidden="true" :icon="wallet.icon" slot="start"></ion-icon>
          <ion-label>
            <h2>{{ wallet.name }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-fab vertical="bottom" horizontal="start" slot="fixed">
        <ion-fab-button routerLink="/tabs/wallets/new">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonAvatar,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonFab,
  IonFabButton,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
} from '@ionic/vue';
import { person, people, business, add } from 'ionicons/icons';
import { ref } from 'vue';
const wallets = ref([
  { id: 1, name: 'HomeWallet', icon: person, },
  { id: 2, name: 'CarWallet', icon: people, },
  { id: 3, name: 'TravelWallet', icon: business, },
  { id: 4, name: 'OtherWallet', icon: add, },
]);

const handleRefresh = (event: RefresherCustomEvent) => {
  setTimeout(() => {
    // Any calls to load data go here
    event.target.complete();
  }, 2000);
};
</script>
