<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Family Accounting</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item :detail="true" button :routerLink="`/tabs/groups/${group.id}`" v-for="group in groups" :key="group.id">
          <ion-icon aria-hidden="true" :icon="group.icon" slot="start"></ion-icon>
          <ion-label>
            <h2>{{ group.name }}</h2>
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
const groups = ref([
  { id: 1, name: 'Family', icon: person,  },
  { id: 2, name: 'Friends', icon: people,  },
  { id: 3, name: 'Work', icon: business,  },
  { id: 4, name: 'Other', icon: add,  },
]); 
</script>
