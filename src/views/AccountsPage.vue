<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Family Accounting</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item :detail="true" button :routerLink="`/tabs/accounts/${account.id}`" v-for="account in accounts" :key="account.id">
          <ion-icon aria-hidden="true" :icon="account.icon" slot="start"></ion-icon>
          <ion-label>
            <h2>{{ account.name }}</h2>
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
const accounts = ref([
  { id: 1, name: 'TejartBank', icon: person, },
  { id: 2, name: 'SamanBank', icon: people, },
  { id: 3, name: 'BlueBank', icon: business, },
  { id: 4, name: 'SaderatBank', icon: add, },
]); 
</script>
