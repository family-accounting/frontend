<template>
  <ion-page>
    <ion-content>
      <ion-list>
        <ion-item :detail="true" button :routerLink="`/tabs/accounts/${account.id}`" v-for="account in accounts"
          :key="account.id">
          <ion-icon aria-hidden="true" :icon="account.icon" slot="start"></ion-icon>
          <ion-label>
            <h2>{{ account.name }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-fab vertical="bottom" horizontal="start" slot="fixed">
        <ion-fab-button routerLink="/tabs/accounts/new">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonIcon, IonFab, IonFabButton } from '@ionic/vue';
import { person, people, business, add } from 'ionicons/icons';
import { ref } from 'vue';
const accounts = ref([
  { id: 1, name: 'TejartBank', icon: person, },
  { id: 2, name: 'SamanBank', icon: people, },
  { id: 3, name: 'BlueBank', icon: business, },
  { id: 4, name: 'SaderatBank', icon: add, },
]); 
</script>
