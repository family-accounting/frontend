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
        <IonButton :routerLink="`/accounts`" slot="end" fill="clear">
          <IonIcon :icon="arrowBack"></IonIcon>
        </IonButton>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true" :scroll-y="true" class="ion-padding">
      <form>
        <IonItem>
          <IonInput type="text" v-model="account.name" label-placement="floating" label="Name"></IonInput>
        </IonItem>
        <IonItem>
          <IonSelect label-placement="floating" label="Icon" v-model="account.icon">
            <IonSelectOption value="person">Person</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonSelect label-placement="floating" label="Color" v-model="account.color">
            <IonSelectOption value="primary">Primary</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonTextarea label-placement="floating" label="Description" v-model="account.description"></IonTextarea>
        </IonItem>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Save</IonButton>
            </IonCol>
            <IonCol>
              <IonButton type="reset" expand="block" :routerLink="`/accounts`">Cancel</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonItem, IonInput, IonSelect, IonSelectOption, IonTextarea, IonButton, IonHeader, IonToolbar, IonTitle, IonAvatar, IonGrid, IonRow, IonCol } from '@ionic/vue';
import { person, arrowBack } from 'ionicons/icons';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const account = ref({
  name: '',
  icon: person,
  color: 'primary',
  description: '',
});

const route = useRoute();

const id = computed(() => route.params.id);
onMounted(() => {
  if (id.value) {
    // get account from API
  }
})
</script>
