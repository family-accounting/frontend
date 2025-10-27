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
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true" :scroll-y="true">
      <IonRefresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>

      <IonList>
        <IonItem :detail="true" button :routerLink="`/accounts/${account.id}`" v-for="account in accountStore.accounts"
          :key="account.id">
          <IonIcon aria-hidden="true" :icon="getIcon(account.icon)" slot="start"></IonIcon>
          <IonLabel>
            <h2>{{ account.name }}</h2>
          </IonLabel>
        </IonItem>
      </IonList>
      <IonFab vertical="bottom" horizontal="start" slot="fixed">
        <IonFabButton routerLink="/accounts/new">
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
  IonMenuButton,
} from '@ionic/vue';
import { fastFood,wallet,cash,add } from 'ionicons/icons';
import { RouterLink } from 'vue-router';
import { useAccountStore } from "@/stores/account.store";

const accountStore = useAccountStore();
const handleRefresh = (event: RefresherCustomEvent) => {
  setTimeout(() => {
    // Any calls to load data go here
    event.target.complete();
  }, 2000);
};

const iconMap: Record<string, string> = {
  fastFood,
  wallet,
  cash,
};

const getIcon = (iconName: string) => iconMap[iconName];
</script>
