<template>
  <IonApp>
    <IonRouterOutlet />
  </IonApp>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { useTranslation } from 'i18next-vue';
import { useHead } from '@vueuse/head';
import { computed } from 'vue';

// Dynamic title and description for better SEO
const { t } = useTranslation();

const title = computed(() => t('appName'));
const description = computed(() => t('appDescription'));

useHead({
  title: title.value,
  meta: [
    {
      name: 'description',
      content: description.value,
    },
    // Performance hint: viewport is already in index.html
  ],
});
</script>
