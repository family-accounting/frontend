<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>ایجاد تراکنش جدید</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-label position="stacked">عنوان</ion-label>
          <ion-input 
            v-model="form.title" 
            placeholder="عنوان تراکنش"
            :disabled="isLoading"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">توضیحات</ion-label>
          <ion-textarea 
            v-model="form.description" 
            placeholder="توضیحات تراکنش"
            :disabled="isLoading"></ion-textarea>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">مبلغ</ion-label>
          <ion-input 
            type="number" 
            v-model="form.amount" 
            placeholder="مبلغ"
            :disabled="isLoading"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">نوع</ion-label>
          <ion-select v-model="form.type" :disabled="isLoading">
            <ion-select-option value="income">درآمد</ion-select-option>
            <ion-select-option value="expense">هزینه</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>

      <ion-button expand="block" @click="submitForm" :disabled="isLoading">
        {{ isLoading ? 'در حال ذخیره...' : 'ذخیره' }}
      </ion-button>

      <ion-loading 
        :isOpen="isLoading" 
        message="در حال ذخیره..."
        :backdropDismiss="false" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonLoading,
} from '@ionic/vue';
import { ref } from 'vue';
import { useTransactionStore } from '@/stores/tansactionStore';
import { useRouter } from 'vue-router';

const transactionStore = useTransactionStore();
const router = useRouter();
const isLoading = ref(false);

const form = ref({
  title: '',
  description: '',
  amount: 0,
  type: 'income',
});

const submitForm = async () => {
  try {
    isLoading.value = true;
    await transactionStore.createTransaction(form.value as { amount: number, description: string, type: string , title: string });
    router.push({ name: 'TransactionView' }); // redirect back to list
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
