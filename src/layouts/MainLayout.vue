<template>
  <IonMenu content-id="main-content">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Menu Content</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <form>
        <IonItem>
          <IonToggle />
        </IonItem>
        <IonItem>
          <IonRadioGroup value="fa" @change="handleLanguageChange($event)">
            <IonRadio value="fa">fa</IonRadio><br />
            <IonRadio value="en">en</IonRadio><br />
          </IonRadioGroup>
        </IonItem>
        <IonItem>
          <IonButton type="submit" expand="block">Save</IonButton>
        </IonItem>
      </form>
    </IonContent>
  </IonMenu>
  <IonPage id="main-content">
    <IonTabs>
      <IonRouterOutlet :key="$route.fullPath"></IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="groups" href="/groups">
          <IonIcon aria-hidden="true" :icon="people" />
          <IonLabel>{{ t('groups') }}</IonLabel>
        </IonTabButton>

        <IonTabButton tab="wallets" href="/wallets">
          <IonIcon aria-hidden="true" :icon="wallet" />
          <IonLabel>{{ t('wallets') }}</IonLabel>
        </IonTabButton>

        <IonTabButton tab="accounts" href="/accounts">
          <IonIcon aria-hidden="true" :icon="person" />
          <IonLabel>{{ t('accounts') }}</IonLabel>
        </IonTabButton>

        <IonTabButton tab="transactions" href="/transactions">
          <IonIcon aria-hidden="true" :icon="swapHorizontal" />
          <IonLabel>{{ t('transactions') }}</IonLabel>
        </IonTabButton>

        <IonTabButton tab="reports" href="/reports">
          <IonIcon aria-hidden="true" :icon="statsChart" />
          <IonLabel>{{ t('reports') }}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonRouterOutlet,
  IonPage,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonToggle,
  IonRadioGroup,
  IonRadio,
  IonItem,
  IonButton,
} from '@ionic/vue';
import {
  people,
  wallet,
  person,
  swapHorizontal,
  statsChart,
} from 'ionicons/icons';
import { useTranslation } from 'i18next-vue';
import { i18next } from '@/i18n';
const { t } = useTranslation();
const handleLanguageChange = (event: CustomEvent<HTMLIonRadioGroupElement>) => {
  i18next.changeLanguage(event.detail.value);
};
</script>
