<template>
  <auth-layout>
    <ion-card>
      <ion-card-header>
        <ion-card-title class="ion-text-center">
          <ion-text color="primary">
            <h2>Welcome Back</h2>
          </ion-text>
        </ion-card-title>
        <ion-card-subtitle class="ion-text-center">
          <ion-text color="medium">
            <p>Sign in to your account</p>
          </ion-text>
        </ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        <ion-list lines="none">
          <ion-item>
            <ion-input
              type="tel"
              label="Mobile"
              label-placement="floating"
              placeholder="Enter your mobile"
              v-model="loginData.mobile"
              :disabled="isLoading"
              :clear-input="true"
              :fill="'outline'"
            >
                <ion-icon :icon="callOutline" slot="start" color="medium"></ion-icon>
            </ion-input>
          </ion-item>

          <ion-item class="ion-margin-top">
            <ion-input
              type="password"
              label="Password"
              label-placement="floating"
              placeholder="Enter your password"
              v-model="loginData.password"
              :disabled="isLoading"
              :fill="'outline'"
            >
              <ion-icon :icon="lockClosedOutline" slot="start" color="medium"></ion-icon>
              <ion-input-password-toggle slot="end"></ion-input-password-toggle>
            </ion-input>
          </ion-item>
        </ion-list>

        <div class="ion-margin-top">
          <ion-button
            @click="login"
            expand="block"
            :disabled="isLoading || !isFormValid"
            size="large"
          >
            <ion-icon :icon="logInOutline" slot="start" v-if="!isLoading"></ion-icon>
            <ion-spinner name="crescent" v-if="isLoading" slot="start"></ion-spinner>
            {{ isLoading ? 'Signing in...' : 'Sign In' }}
          </ion-button>
        </div>

        <div class="ion-text-center ion-margin-top">
          <ion-button fill="clear" size="small" @click="forgotPassword">
            <ion-text color="medium">Forgot your password?</ion-text>
          </ion-button>
        </div>

        <ion-item lines="none" class="ion-margin-top">
          <ion-text color="medium" class="ion-margin-end">Don't have an account?</ion-text>
          <ion-button fill="clear" size="small" @click="goToSignUp">
            <ion-text color="primary">Sign up</ion-text>
          </ion-button>
        </ion-item>
      </ion-card-content>
    </ion-card>

    <ion-loading 
      :isOpen="isLoading" 
      message="Signing you in..." 
      :backdropDismiss="false"
      spinner="crescent"
    />
  </auth-layout>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
import { LoginAuthDto } from "@/types/auth.dto";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent,
  IonList,
  IonItem,
  IonInput, 
  IonButton, 
  IonLoading,
  IonInputPasswordToggle,
  IonIcon,
  IonText,
  IonSpinner
} from "@ionic/vue";
import { 
  callOutline, 
  lockClosedOutline, 
  logInOutline 
} from "ionicons/icons";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const loginData = ref<LoginAuthDto>({ 
  mobile: "", 
  password: "" 
});

const isLoading = ref(false);

const isFormValid = computed(() => {
    return loginData.value.mobile.length > 0 && 
         loginData.value.password.length >= 8 &&
         loginData.value.mobile.includes('09');
});

const login = async () => {
  try {
    isLoading.value = true;
    await authStore.login(loginData.value);
    router.push('/app/transaction');
  } catch (error) {
    console.error('Login error:', error);
    // Here you could show a toast or alert for error handling
  } finally {
    isLoading.value = false;
  }
};

const forgotPassword = () => {
  // Navigate to forgot password page or show modal
  console.log('Forgot password clicked');
};

const goToSignUp = () => {
  // Navigate to sign up page
  console.log('Sign up clicked');
};
</script>