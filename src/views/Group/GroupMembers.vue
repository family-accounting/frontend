<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonAvatar aria-hidden="true" slot="start">
          <img src="/logo.svg" />
        </IonAvatar>
        <IonTitle slot="start"> Family Accounting </IonTitle>
        <IonButtons slot="end">
          <IonButton slot="end" fill="clear" @click="showSearch = !showSearch">
            <IonIcon :icon="searchOutline"></IonIcon>
          </IonButton>
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
      <IonSearchbar
        v-if="showSearch"
        v-model="searchText"
        placeholder="Search"
      ></IonSearchbar>
      <IonList>
        <IonItem
          :detail="true"
          button
          :routerLink="`/members/${member.id}`"
          v-for="member in filteredMembers"
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
  IonSearchbar,
} from '@ionic/vue';
import {
  person,
  people,
  business,
  add,
  logOutOutline,
  searchOutline,
} from 'ionicons/icons';
import { ref, computed } from 'vue';
const showSearch = ref(false);
const searchText = ref('');

const filteredMembers = computed(() => {
  return members.value.filter((member) =>
    member.name.toLowerCase().includes(searchText.value.toLowerCase()),
  );
});
const members = ref([
  { id: 1, name: 'Member 1', icon: person },
  { id: 2, name: 'Member 2', icon: people },
  { id: 3, name: 'Member 3', icon: business },
  { id: 4, name: 'Member 4', icon: add },
]);

const handleRefresh = (event: RefresherCustomEvent) => {
  setTimeout(() => {
    // Any calls to load data go here
    event.target.complete();
  }, 2000);
};
</script>
