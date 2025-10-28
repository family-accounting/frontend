<template>
  <IonMenu :content-id="'main-content'" :side="side">
    <IonHeader>
      <IonToolbar>
        <IonTitle>{{ t('menu') }}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <!-- Dark Mode -->
      <IonItem>
        <IonLabel>{{ t('darkMode') }}</IonLabel>
        <IonToggle v-model="darkMode" />
      </IonItem>

      <!-- Language -->
      <IonItem>
        <IonLabel>{{ t('language') }}</IonLabel>
        <IonRadioGroup v-model="language">
          <IonRadio value="fa">فارسی</IonRadio><br />
          <IonRadio value="en">English</IonRadio><br />
        </IonRadioGroup>
      </IonItem>
    </IonContent>
  </IonMenu>

  <IonPage id="main-content" v-bind="$attrs">
    <IonTabs>
      <IonRouterOutlet />

      <IonTabBar slot="bottom">
        <IonTabButton tab="groups" href="/groups">
          <IonIcon :icon="people" />
          <IonLabel>{{ t('groups') }}</IonLabel>
        </IonTabButton>

        <IonTabButton tab="accounts" href="/accounts">
          <IonIcon :icon="person" />
          <IonLabel>{{ t('accounts') }}</IonLabel>
        </IonTabButton>

        <IonTabButton tab="reports" href="/reports">
          <IonIcon :icon="statsChart" />
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
  IonToggle,
} from '@ionic/vue';
import { people, person, statsChart } from 'ionicons/icons';
import { useTranslation } from 'i18next-vue';
import { i18next } from '@/i18n';
import { ref, watch, onMounted } from 'vue';

defineOptions({ inheritAttrs: false });

const { t } = useTranslation();

/* --- reactive states --- */
const language = ref(localStorage.getItem('lang') || 'en');
const darkMode = ref(localStorage.getItem('theme') === 'dark');
const side = ref<'start' | 'end'>(language.value === 'fa' ? 'start' : 'end');

/* --- apply settings immediately on mount --- */
onMounted(() => {
  applyLanguage(language.value);
  applyTheme(darkMode.value);
});

/* --- reactive watchers --- */
watch(language, (value) => {
  localStorage.setItem('lang', value);
  applyLanguage(value);
  i18next.changeLanguage(value);
});

watch(darkMode, (value) => {
  localStorage.setItem('theme', value ? 'dark' : 'light');
  applyTheme(value);
});

/* --- helpers --- */
function applyLanguage(lang: string) {
  const isRTL = lang === 'fa';
  document.body.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  side.value = isRTL ? 'start' : 'end';
}

function applyTheme(enabled: boolean) {
  document.body.classList.toggle('dark', enabled);
}
</script>
