<template>
  <IonPage>
    <IonContent>
      <IonRouterOutlet :key="$route.fullPath"></IonRouterOutlet>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonRouterOutlet, IonContent } from '@ionic/vue';
</script>
