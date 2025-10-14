<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Family Accounting</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item :detail="true" button :routerLink="`/tabs/wallets/${wallet.id}`" v-for="wallet in wallets"
          :key="wallet.id">
          <ion-icon aria-hidden="true" :icon="wallet.icon" slot="start"></ion-icon>
          <ion-label>
            <h2>{{ wallet.name }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/vue';
import { person, people, business, add } from 'ionicons/icons';
import { ref } from 'vue';
const wallets = ref([
  { id: 1, name: 'HomeWallet', icon: person, },
  { id: 2, name: 'CarWallet', icon: people, },
  { id: 3, name: 'TravelWallet', icon: business, },
  { id: 4, name: 'OtherWallet', icon: add, },
]); 
</script>
