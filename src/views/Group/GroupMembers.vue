<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <div slot="start" class="flex">
          <IonButtons>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <RouterLink to="/" class="flex items-center">
            <IonAvatar aria-hidden="true">
              <img src="/logo.svg" />
            </IonAvatar>
            <IonTitle> Family Accounting </IonTitle>
          </RouterLink>
        </div>
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
      <IonSearchbar v-if="showSearch" v-model="searchText" placeholder="Search"></IonSearchbar>
      <IonList>
        <IonItem :detail="true" button :routerLink="`/members/${member.id}`" v-for="member in filteredMembers"
          :key="member.id">
          <IonIcon aria-hidden="true" :icon="member.icon" slot="start"></IonIcon>
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
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
  IonButtons,
  IonButton,
  IonMenuButton,
} from '@ionic/vue';
import {
  add,
  logOutOutline,
} from 'ionicons/icons';
import { ref, computed } from 'vue';
import { onIonViewWillEnter } from '@ionic/vue';
import { useMemberStore } from '@/stores/member.store';

const showSearch = ref(false);
const searchText = ref('');
const memberStore = useMemberStore();
const filteredMembers = computed(() => {
  return memberStore.members.filter((member) =>
    member.name.toLowerCase().includes(searchText.value.toLowerCase()),
  );
});

const loadData = () => {
  // Load members data here
  console.log('Loading members data...');
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
