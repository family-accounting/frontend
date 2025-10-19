<template>
  <IonApp>
    <IonRouterOutlet />
  </IonApp>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { useTranslation } from "i18next-vue";
import { useHead } from "@vueuse/head";
import { computed } from "vue";
// dynamic title
const { t } = useTranslation();
useHead({
  title: computed(() => t("appName") || "Family Accounting"),
});

</script>
