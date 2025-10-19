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
          :routerLink="`/reports/${report.id}`"
          v-for="report in reports"
          :key="report.id"
        >
          <IonIcon
            aria-hidden="true"
            :icon="report.icon"
            slot="start"
          ></IonIcon>
          <IonLabel>
            <h2>{{ report.name }}</h2>
          </IonLabel>
        </IonItem>
      </IonList>
      <IonFab vertical="bottom" horizontal="start" slot="fixed">
        <IonFabButton routerLink="/reports/new">
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
const reports = ref([
  { id: 1, name: "HomeReport", icon: person },
  { id: 2, name: "CarReport", icon: people },
  { id: 3, name: "TravelReport", icon: business },
  { id: 4, name: "OtherReport", icon: add },
]);

const handleRefresh = (event: RefresherCustomEvent) => {
  setTimeout(() => {
    // Any calls to load data go here
    event.target.complete();
  }, 2000);
};
</script>
