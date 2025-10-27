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
        <IonButton @click="isEditingOrder = !isEditingOrder">
          <IonIcon :icon="pencil"></IonIcon>
        </IonButton>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true" :scroll-y="true">
      <IonRefresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <IonSearchbar v-if="showSearch" v-model="searchText" placeholder="Search"></IonSearchbar>
      <!-- edit order list -->


      <IonList>
        <IonReorderGroup :disabled="isEditingOrder" @ionReorderEnd="handleReorderEnd($event)">
          <IonItem :detail="true" button :routerLink="{
            name: 'GroupTransactions',
            params: { groupId: group.id },
          }" v-for="group in filteredTransactions" :key="group.id">
            <IonReorder slot="start"></IonReorder>
            <IonIcon aria-hidden="true" :icon="getIcon(group.icon)" slot="start"></IonIcon>
            <IonLabel slot="start">
              <h2>{{ group.name }}</h2>
              <p>{{ group.description }}</p>
            </IonLabel>
          </IonItem>
        </IonReorderGroup>
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
  IonReorderGroup,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
  ReorderEndCustomEvent,
  IonReorder,
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
import { useTransactionStore } from '@/stores/transaction.store';
import { computed } from 'vue';
import { ref } from 'vue';
import { onIonViewWillEnter } from '@ionic/vue';

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

const transactionStore = useTransactionStore();
const searchText = ref('');
const showSearch = ref(false);
const filteredTransactions = computed(() => {
  return transactionStore.transactions.filter((transaction) =>
    transaction.name.toLowerCase().includes(searchText.value.toLowerCase()),
  );
});

const handleReorderEnd = (event: ReorderEndCustomEvent) => {
  console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
  event.detail.complete();
};
const getIcon = (iconName: string) => iconMap[iconName];

const loadData = async () => {
  // Load transactions data here
  console.log('Loading transactions data...');
};

const handleRefresh = async (event: RefresherCustomEvent) => {
  try {
    await loadData();
    event.target.complete();
  } catch (error) {
    console.error(error);
    event.target.complete();
  }
};

const isEditingOrder = ref(false);

// Called every time the view is entered (including first mount)
onIonViewWillEnter(() => {
  loadData();
});
</script>
<style scoped></style>
