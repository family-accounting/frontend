<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>ورود</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-input type="tel" label="موبایل " label-placement="floating" placeholder="موبایل"
                v-model="loginData.mobile" :disabled="isLoading"></ion-input>
     
            <ion-input type="password" label="رمز عبور" label-placement="floating" placeholder="رمز عبور"
                v-model="loginData.password" :disabled="isLoading">
                <ion-input-password-toggle slot="end"></ion-input-password-toggle>
            </ion-input>

            <ion-button @click="login" expand="block" :disabled="isLoading">
                {{ isLoading ? 'در حال ورود...' : 'ورود' }}
            </ion-button>

            <ion-loading :isOpen="isLoading" message="در حال ورود..." :backdropDismiss="false" />
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
import { LoginAuthDto } from "@/types/auth.dto";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonLoading,IonInputPasswordToggle  } from "@ionic/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const loginData = ref<LoginAuthDto>({ mobile: "09198881400", password: "12345678" });

const isLoading = ref(false);
const login = async () => {
    try {
        isLoading.value = true;
        await authStore.login(loginData.value);
        router.push('/app/transaction');
    } catch (error) {
        console.log(error);
    }
    finally {
        isLoading.value = false;
    }
}
</script>