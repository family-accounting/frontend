<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet></IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="transactions" :href="`/group/${groupId}/transactions`">
          <IonIcon aria-hidden="true" :icon="swapHorizontal" />
          <IonLabel>{{ t('transactions') }}</IonLabel>
        </IonTabButton>

        <IonTabButton tab="members" :href="`/group/${groupId}/members`">
          <IonIcon aria-hidden="true" :icon="people" />
          <IonLabel>{{ t('members') }}</IonLabel>
        </IonTabButton>

        <IonTabButton tab="reports" :href="`/group/${groupId}/reports`">
          <IonIcon aria-hidden="true" :icon="statsChart" />
          <IonLabel>{{ t('reports') }}</IonLabel>
        </IonTabButton>

        <IonTabButton tab="setting" :href="`/group/${groupId}/setting`">
          <IonIcon aria-hidden="true" :icon="settings" />
          <IonLabel>{{ t('setting') }}</IonLabel>
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
} from '@ionic/vue';
import { people, swapHorizontal, statsChart, settings } from 'ionicons/icons';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTranslation } from 'i18next-vue';

const { t } = useTranslation();
const route = useRoute();
const groupId = computed(() => route.params.groupId);
</script>
