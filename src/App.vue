<template>
  <IonApp>
    <IonRouterOutlet />
  </IonApp>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useTranslation } from 'i18next-vue';
import { useHead } from '@vueuse/head';
// dynamic title
const { t } = useTranslation();
useHead({
  title: t('appName'),
  meta: [
    {
      name: 'description',
      content: t('appDescription'),
    },
  ],
});
</script>
