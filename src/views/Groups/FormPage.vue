<template>
  <ion-page>
    <ion-content>
      <form>
        <ion-item>
          <ion-label>Name</ion-label>
          <ion-input type="text" v-model="group.name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Icon</ion-label>
          <ion-select v-model="group.icon">
            <ion-select-option value="person">Person</ion-select-option>
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
        <ion-button type="submit">Save</ion-button>
      </form>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonIcon, IonFab, IonFabButton } from '@ionic/vue';
import { person, people, business, add } from 'ionicons/icons';
import { ref } from 'vue';
const group = ref({
  name: '',
  icon: person,
  color: 'primary',
  description: '',
});
</script>
