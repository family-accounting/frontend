<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonAvatar aria-hidden="true" slot="start">
          <img src="/logo.svg" />
        </IonAvatar>
        <IonTitle slot="start"> Family Accounting </IonTitle>
        <IonButton :routerLink="`/wallets`" slot="end" fill="clear">
          <IonIcon :icon="arrowBack"></IonIcon>
        </IonButton>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true" :scroll-y="true" class="ion-padding">
      <form>
        <IonItem>
          <IonInput
            type="text"
            v-model="wallet.name"
            label-placement="floating"
            label="Name"
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonSelect
            label-placement="floating"
            label="Icon"
            v-model="wallet.icon"
          >
            <IonSelectOption value="person">Person</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonSelect
            label-placement="floating"
            label="Color"
            v-model="wallet.color"
          >
            <IonSelectOption value="primary">Primary</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonTextarea
            label-placement="floating"
            label="Description"
            v-model="wallet.description"
          ></IonTextarea>
        </IonItem>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Save</IonButton>
            </IonCol>
            <IonCol>
              <IonButton type="reset" expand="block" :routerLink="`/wallets`"
                >Cancel</IonButton
              >
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonAvatar,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { person, arrowBack } from "ionicons/icons";
import { ref } from "vue";
const wallet = ref({
  name: "",
  icon: person,
  color: "primary",
  description: "",
});
</script>
