<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-avatar aria-hidden="true" slot="start">
          <img src="/logo.svg" />
        </ion-avatar>
        <ion-title slot="start">
          Family Accounting
        </ion-title>
        <ion-button :routerLink="`/tabs/accounts`" slot="end" fill="clear">
          <ion-icon :icon="arrowBack"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form>
        <ion-item>
          <ion-label>Name</ion-label>
          <ion-input type="text" v-model="account.name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Icon</ion-label>
          <ion-select v-model="account.icon">
            <ion-select-option value="person">Person</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Color</ion-label>
          <ion-select v-model="account.color">
            <ion-select-option value="primary">Primary</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Description</ion-label>
          <ion-textarea v-model="account.description"></ion-textarea>
        </ion-item>
        <ion-button type="submit">Save</ion-button>
      </form>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea, IonButton, IonHeader, IonToolbar, IonTitle, IonAvatar } from '@ionic/vue';
import { person, arrowBack } from 'ionicons/icons';
import { ref } from 'vue';
const account = ref({
  name: '',
  icon: person,
  color: 'primary',
  description: '',
});
</script>
