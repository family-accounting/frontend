<template>
  <ion-page>

    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="groups" href="/tabs/groups">
          <ion-icon aria-hidden="true" :icon="people" />
          <ion-label>Groups</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="wallets" href="/tabs/wallets">
          <ion-icon aria-hidden="true" :icon="wallet" />
          <ion-label>Wallets</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="accounts" href="/tabs/accounts">
          <ion-icon aria-hidden="true" :icon="person" />
          <ion-label>Accounts</ion-label>
        </ion-tab-button>


        <ion-tab-button tab="transactions" href="/tabs/transactions">
          <ion-icon aria-hidden="true" :icon="swapHorizontal" />
          <ion-label>Transactions</ion-label>
        </ion-tab-button>


        <ion-tab-button tab="reports" href="/tabs/reports">
          <ion-icon aria-hidden="true" :icon="statsChart" />
          <ion-label>Reports</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonRouterOutlet, IonPage } from '@ionic/vue';
import { people, wallet, person, swapHorizontal, statsChart } from 'ionicons/icons';
</script>
