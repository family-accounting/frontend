<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>درآمد / مخارج</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- Floating Action Button -->
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="createTransaction">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <!-- Transactions List -->
      <ion-list>
        <ion-item v-for="(item, index) in transactionStore.transactions" :key="index" button>
          <ion-item-option :color="item.type === 'income' ? 'success' : 'danger'">
            {{ item.type === 'income' ? 'درآمد' : 'هزینه' }}
          </ion-item-option>
          <ion-label>{{ item.title }} </ion-label>
          <ion-label> {{ item.amount }} </ion-label>
        </ion-item>
      </ion-list>
      <ion-item-sliding v-for="(item, index) in transactionStore.transactions" :key="index">

        <ion-item-options side="end">
        <ion-item-option>Favorite</ion-item-option>
        <ion-item-option color="danger">Delete</ion-item-option>
      </ion-item-options>
      </ion-item-sliding>

      <!-- Loader -->
      <ion-loading 
        :isOpen="isLoading" 
        message="در حال بارگذاری..."
        :backdropDismiss="false" />


      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLoading,
  IonItem,
  IonList,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
  IonItemOption, IonItemOptions, IonItemSliding
} from '@ionic/vue';
import { useTransactionStore } from '@/stores/tansactionStore';
import { ref } from 'vue';
import { add } from 'ionicons/icons';
import { onIonViewWillEnter } from '@ionic/vue';
import { useRouter } from 'vue-router';
import {format} from 'date-fns';
const isLoading = ref(false);
const transactionStore = useTransactionStore();

// Fetch transactions
const getTransactions = async () => {
  try {
    isLoading.value = true;
    await transactionStore.getTransactions();
    console.log(transactionStore.transactions);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const handleRefresh = (event: RefresherCustomEvent) => {
        setTimeout(() => {
          getTransactions();
          event.target.complete();
        }, 1000);
      };


// Lifecycle: runs every time the page is entered
onIonViewWillEnter(getTransactions);
const router = useRouter();
// Create a new transaction
const createTransaction = async () => {
  router.push('/app/create-transaction');
};
</script>
