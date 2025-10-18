<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-avatar slot="start">
          <img src="/logo.svg" />
        </ion-avatar>
        <ion-title>Family Accounting</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" :scroll-y="true">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-searchbar v-model="search" placeholder="Search"></ion-searchbar>

      <ion-list>
        <ion-reorder-group :disabled="false" @ionReorderEnd="handleReorderEnd($event)">

          <ion-item :detail="true" button :routerLink="`/tabs/groups/${group.id}`" v-for="group in filteredGroups"
            :key="group.id">
            <ion-reorder slot="start"></ion-reorder>
            <ion-icon aria-hidden="true" :icon="getIcon(group.icon)" slot="start"></ion-icon>
            <ion-label>
              <h2>{{ group.name }}</h2>
            </ion-label>
          </ion-item>
        </ion-reorder-group>
      </ion-list>
      <ion-fab vertical="bottom" horizontal="start" slot="fixed">
        <ion-fab-button routerLink="/tabs/groups/new">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
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
  IonReorderGroup,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
  ReorderEndCustomEvent, IonReorder,
} from '@ionic/vue';
import { add, person, people } from 'ionicons/icons';
import { useGroupStore } from "@/stores/group.store";
import { useGroupService } from "@/services/group.service";
import { onMounted, computed } from "vue";
import { ref } from "vue";

const iconMap: Record<string, string> = {
  person,
  people,
};

const groupStore = useGroupStore();
const groupService = useGroupService();
const search = ref('');

const filteredGroups = computed(() => {
  return groupStore.groups.filter((group) => group.name.toLowerCase().includes(search.value.toLowerCase()));
});


const handleReorderEnd = (event: ReorderEndCustomEvent) => {
  console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
  event.detail.complete();
};
const getIcon = (iconName: string) => iconMap[iconName] || person;
const handleRefresh = async (event: RefresherCustomEvent) => {
  try {
    const groups = await groupService.getGroups();
    groupStore.groups = groups;
    event.target.complete();
  } catch (error) {
    console.error(error);
    event.target.complete();
  }
};
onMounted(() => {

});
</script>
