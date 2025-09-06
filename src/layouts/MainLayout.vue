<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/app/transaction">
          <ion-icon aria-hidden="true" :icon="swapVerticalOutline" />
          <ion-label>درآمد / مخارج</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/app/setting">
          <ion-icon aria-hidden="true" :icon="settingsOutline" />
          <ion-label>تنظیمات</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, settingsOutline,swapVerticalOutline } from 'ionicons/icons';

const authStore = useAuthStore();

authStore.token = '2';

</script>
