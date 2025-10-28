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
          :routerLink="{
            name: 'TransactionDetails',
            params: { transactionId: transaction.id },
          }"
          v-for="transaction in filteredTransactions"
          :key="transaction.id"
        >
          <IonIcon
            aria-hidden="true"
            :icon="getIcon(transaction.icon)"
            slot="start"
          ></IonIcon>
          <IonLabel slot="start">
            <h2>{{ transaction.name }}</h2>
            <p>{{ transaction.description }}</p>
          </IonLabel>
        </IonItem>
      </IonList>
      <IonFab vertical="bottom" horizontal="start" slot="fixed">
        <IonFabButton routerLink="/group/transactions/new">
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
  logOutOutline,
} from 'ionicons/icons';
import { onMounted, computed } from 'vue';
import { ref } from 'vue';
import { useTransactionService } from '@/services/tansaction.service';
import { useTransactionStore } from '@/stores/transaction.store';

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

const transactionService = useTransactionService();
const transactionStore = useTransactionStore();
const searchText = ref('');
const showSearch = ref(false);
const filteredTransactions = computed(() => {
  return transactionStore.transactions.filter((transaction) =>
    transaction.name.toLowerCase().includes(searchText.value.toLowerCase()),
  );
});

const getIcon = (iconName: string) => iconMap[iconName];
const handleRefresh = async (event: RefresherCustomEvent) => {
  try {
    const transactions = await transactionService.getTransactions();
    transactionStore.transactions = transactions;
    event.target.complete();
  } catch (error) {
    console.error(error);
    event.target.complete();
  }
};

onMounted(() => {});
</script>
<style scoped></style>
