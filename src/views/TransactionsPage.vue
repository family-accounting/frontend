<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Family Accounting</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item :detail="true" button :routerLink="`/tabs/transactions/${transaction.id}`" v-for="transaction in transactions"
          :key="transaction.id">
          <ion-icon aria-hidden="true" :icon="transaction.icon" slot="start"></ion-icon>
          <ion-label>
            <h2>{{ transaction.name }}</h2>
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
const transactions = ref([
  { id: 1, name: 'Transaction 1', icon: person, },
  { id: 2, name: 'Transaction 2', icon: people, },
  { id: 3, name: 'Transaction 3', icon: business, },
  { id: 4, name: 'Transaction 4', icon: add, },
]); 
</script>
