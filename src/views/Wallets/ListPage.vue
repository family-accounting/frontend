<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonAvatar aria-hidden="true" slot="start">
          <img src="/logo.svg" />
        </IonAvatar>
        <IonTitle slot="start"> Family Accounting </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true" :scroll-y="true">
      <IonRefresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>

      <IonList>
        <IonItem
          :detail="true"
          button
          :routerLink="`/wallets/${wallet.id}`"
          v-for="wallet in wallets"
          :key="wallet.id"
        >
          <IonIcon
            aria-hidden="true"
            :icon="wallet.icon"
            slot="start"
          ></IonIcon>
          <IonLabel>
            <h2>{{ wallet.name }}</h2>
          </IonLabel>
        </IonItem>
      </IonList>
      <IonFab vertical="bottom" horizontal="start" slot="fixed">
        <IonFabButton routerLink="/wallets/new">
          <IonIcon :icon="add"></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonContent>
  </IonPage>
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
} from "@ionic/vue";
import { person, people, business, add } from "ionicons/icons";
import { ref } from "vue";
const wallets = ref([
  { id: 1, name: "HomeWallet", icon: person },
  { id: 2, name: "CarWallet", icon: people },
  { id: 3, name: "TravelWallet", icon: business },
  { id: 4, name: "OtherWallet", icon: add },
]);

const handleRefresh = (event: RefresherCustomEvent) => {
  setTimeout(() => {
    // Any calls to load data go here
    event.target.complete();
  }, 2000);
};
</script>
