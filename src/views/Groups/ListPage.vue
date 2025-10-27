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
          <IonButton fill="clear" @click="showSearch = !showSearch">
            <IonIcon :icon="search"></IonIcon>
          </IonButton>
        </IonButtons>

      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true" :scroll-y="true">
      <IonRefresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <IonSearchbar v-if="showSearch" v-model="searchText" placeholder="Search"></IonSearchbar>
      <!-- edit order list -->


      <IonList>
        <IonItem :detail="true" button :routerLink="{
          name: 'GroupTransactions',
          params: { groupId: group.id },
        }" v-for="group in filteredGroups" :key="group.id">
          <IonIcon aria-hidden="true" :icon="getIcon(group.icon)" slot="start"></IonIcon>
          <IonLabel slot="start">
            <h2>{{ group.name }}</h2>
            <p>{{ group.description }}</p>
          </IonLabel>
        </IonItem>
      </IonList>
      <IonFab vertical="bottom" horizontal="start" slot="fixed">
        <IonFabButton routerLink="/groups/new">
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
  person,
  people,
  search,
  home,
  business,
  airplane,
  heart,
  fastFood,
  pencil,
} from 'ionicons/icons';
import { useGroupStore } from '@/stores/group.store';
import { useGroupService } from '@/services/group.service';
import { onMounted, computed } from 'vue';
import { ref } from 'vue';

const iconMap: Record<string, string> = {
  person,
  people,
  home,
  business,
  airplane,
  heart,
  add,
  fastFood,
};

const groupStore = useGroupStore();
const groupService = useGroupService();
const searchText = ref('');
const showSearch = ref(false);
const filteredGroups = computed(() => {
  return groupStore.groups.filter((group) =>
    group.name.toLowerCase().includes(searchText.value.toLowerCase()),
  );
});


const getIcon = (iconName: string) => iconMap[iconName];
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




onMounted(() => { });
</script>
<style scoped></style>
