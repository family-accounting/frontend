<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonAvatar aria-hidden="true" slot="start">
          <img src="/logo.svg" />
        </IonAvatar>
        <IonTitle slot="start"> Family Accounting </IonTitle>
        <IonButtons slot="end">
          <IonButton :routerLink="{name: 'GroupsList'}" fill="clear">
            <IonIcon :icon="logOut"></IonIcon>
          </IonButton>
        </IonButtons>
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
          :routerLink="`/members/${member.id}`"
          v-for="member in members"
          :key="member.id"
        >
          <IonIcon
            aria-hidden="true"
            :icon="member.icon"
            slot="start"
          ></IonIcon>
          <IonLabel>
            <h2>{{ member.name }}</h2>
          </IonLabel>
        </IonItem>
      </IonList>
      <IonFab vertical="bottom" horizontal="start" slot="fixed">
        <IonFabButton routerLink="/members/new">
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
  IonButtons,
  IonButton,
} from "@ionic/vue";
import { person, people, business, add, logOut } from "ionicons/icons";
import { ref } from "vue";

const members = ref([
  { id: 1, name: "Member 1", icon: person },
  { id: 2, name: "Member 2", icon: people },
  { id: 3, name: "Member 3", icon: business },
  { id: 4, name: "Member 4", icon: add },
]);

const handleRefresh = (event: RefresherCustomEvent) => {
  setTimeout(() => {
    // Any calls to load data go here
    event.target.complete();
  }, 2000);
};
</script>
