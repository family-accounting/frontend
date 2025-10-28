<template>
  <IonMenu content-id="main-content">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Menu Content</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <form>
        <IonItem>
          <IonLabel>{{ t('language') }}</IonLabel>
          <IonRadioGroup v-model="language" @ionChange="onChangeLanguage">
            <IonRadio value="fa">فارسی</IonRadio><br />
            <IonRadio value="en">English</IonRadio><br />
          </IonRadioGroup>
        </IonItem>
      </form>
    </IonContent>
  </IonMenu>
  <IonPage id="main-content" v-bind="$attrs">
    <IonTabs>
      <IonRouterOutlet></IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="groups" href="/groups">
          <IonIcon aria-hidden="true" :icon="people" />
          <IonLabel>{{ t('groups') }}</IonLabel>
        </IonTabButton>

        <IonTabButton tab="accounts" href="/accounts">
          <IonIcon aria-hidden="true" :icon="person" />
          <IonLabel>{{ t('accounts') }}</IonLabel>
        </IonTabButton>

        <IonTabButton tab="reports" href="/reports">
          <IonIcon aria-hidden="true" :icon="statsChart" />
          <IonLabel>{{ t('reports') }}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonRouterOutlet,
  IonPage,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRadioGroup,
  IonRadio,
  IonItem,
} from '@ionic/vue';
import { people, person, statsChart } from 'ionicons/icons';
import { useTranslation } from 'i18next-vue';
import { i18next } from '@/i18n';
import { onMounted, ref } from 'vue';

defineOptions({ inheritAttrs: false });

const { t } = useTranslation();

const language = ref(localStorage.getItem('lang') || 'en');

onMounted(() => {
  language.value = localStorage.getItem('lang') || 'en';
  i18next.changeLanguage(language.value);
});

const onChangeLanguage = () => {
  localStorage.setItem('lang', language.value);
  i18next.changeLanguage(language.value);
};
</script>
