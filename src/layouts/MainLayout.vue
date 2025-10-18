<template>
  <IonPage>

    <IonTabs>
      <IonRouterOutlet></IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="groups" href="/groups">
          <IonIcon aria-hidden="true" :icon="people" />
          <IonLabel>Groups</IonLabel>
        </IonTabButton>

        <IonTabButton tab="wallets" href="/wallets">
          <IonIcon aria-hidden="true" :icon="wallet" />
          <IonLabel>Wallets</IonLabel>
        </IonTabButton>

        <IonTabButton tab="accounts" href="/accounts">
          <IonIcon aria-hidden="true" :icon="person" />
          <IonLabel>Accounts</IonLabel>
        </IonTabButton>


        <IonTabButton tab="transactions" href="/transactions">
          <IonIcon aria-hidden="true" :icon="swapHorizontal" />
          <IonLabel>Transactions</IonLabel>
        </IonTabButton>


        <IonTabButton tab="reports" href="/reports">
          <IonIcon aria-hidden="true" :icon="statsChart" />
          <IonLabel>Reports</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonRouterOutlet, IonPage } from '@ionic/vue';
import { people, wallet, person, swapHorizontal, statsChart } from 'ionicons/icons';
</script>
