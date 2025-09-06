<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row class="ion-justify-content-center ion-align-items-center" style="min-height: 100vh;">
          <ion-col size="12" size-md="8" size-lg="6" size-xl="4">
            <div class="ion-text-center ion-margin-bottom">
              <ion-text color="primary">
                <h1>Family Accounting</h1>
              </ion-text>
              <ion-text color="medium">
                <p>Manage your family finances with ease</p>
              </ion-text>
            </div>
            <slot />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonText } from '@ionic/vue';
</script>