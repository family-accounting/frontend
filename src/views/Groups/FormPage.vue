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
        <ion-button :routerLink="`/tabs/groups`" slot="end" fill="clear">
          <ion-icon :icon="arrowBack"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" :scroll-y="true" :padding="true" class="ion-padding">
      <form>
        <ion-item>
          <ion-label>Name</ion-label>
          <ion-input type="text" v-model="group.name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Icon</ion-label>
          <ion-select v-model="group.icon">
            <ion-select-option value="person">
              <ion-icon :icon="person"></ion-icon>
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Color</ion-label>
          <ion-select v-model="group.color">
            <ion-select-option value="primary">Primary</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label>Description</ion-label>
          <ion-textarea v-model="group.description"></ion-textarea>
        </ion-item>
        <div class="ion-padding ">
          <ion-button type="submit" expand="block">Save</ion-button>
          <ion-button type="reset" expand="block" :routerLink="`/tabs/groups`">Cancel</ion-button>
        </div>
      </form>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonTextarea, 
  IonButton, IonHeader, IonToolbar, IonTitle, IonAvatar, IonIcon } from '@ionic/vue';
import { person, arrowBack } from 'ionicons/icons';
import { ref } from 'vue';
const group = ref({
  name: '',
  icon: person,
  color: 'primary',
  description: '',
});
</script>
