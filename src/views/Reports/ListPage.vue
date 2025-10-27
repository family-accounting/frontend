<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonAvatar aria-hidden="true" slot="start">
          <img src="/logo.svg" />
        </IonAvatar>
        <IonTitle slot="start"> Family Accounting </IonTitle>
        <IonButtons slot="end">
          <IonButton :routerLink="{ name: 'GroupsList' }" fill="clear">
            <IonIcon :icon="logOutOutline"></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true" :scroll-y="true">
      <IonRefresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <IonCard>
        <IonCardHeader>sdff</IonCardHeader>
        <IonCardContent>sdff</IonCardContent>
      </IonCard>
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
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
  IonButtons,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardContent,
} from '@ionic/vue';
import { logOutOutline } from 'ionicons/icons';
import { onIonViewWillEnter } from '@ionic/vue';


const loadData = () => {
  // Load reports data here
  console.log('Loading reports data...');
};

const handleRefresh = (event: RefresherCustomEvent) => {
  setTimeout(() => {
    loadData();
    event.target.complete();
  }, 2000);
};

// Called every time the view is entered (including first mount)
onIonViewWillEnter(() => {
  loadData();
});
</script>
