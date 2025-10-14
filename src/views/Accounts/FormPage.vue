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
    <ion-content :fullscreen="true" :scroll-y="true" class="ion-padding">
      <form>
        <ion-item>
          <ion-input type="text" v-model="account.name" label-placement="floating" label="Name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-select label-placement="floating" label="Icon" v-model="account.icon">
            <ion-select-option value="person">Person</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-select label-placement="floating" label="Color" v-model="account.color">
            <ion-select-option value="primary">Primary</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-textarea label-placement="floating" label="Description" v-model="account.description"></ion-textarea>
        </ion-item>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-button type="submit" expand="block">Save</ion-button>
            </ion-col>
            <ion-col>
              <ion-button type="reset" expand="block" :routerLink="`/tabs/accounts`">Cancel</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonInput, IonSelect, IonSelectOption, IonTextarea, IonButton, IonHeader, IonToolbar, IonTitle, IonAvatar, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { person, arrowBack } from 'ionicons/icons';
import { ref } from 'vue';
const account = ref({
  name: '',
  icon: person,
  color: 'primary',
  description: '',
});
</script>
