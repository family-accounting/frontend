<template>
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonAvatar aria-hidden="true" slot="start">
                    <img src="/logo.svg" />
                </IonAvatar>
                <IonTitle slot="start">
                    Family Accounting
                </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent :fullscreen="true" :scroll-y="true">
            <IonRefresher slot="fixed" @ionRefresh="handleRefresh($event)">
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
        </IonContent>
    </IonPage>
</template>
<script setup lang="ts">
import { IonPage, RefresherCustomEvent } from '@ionic/vue';
const handleRefresh = (event: RefresherCustomEvent) => {
    setTimeout(() => {
        // Any calls to load data go here
        event.target.complete();
    }, 2000);
};
</script>