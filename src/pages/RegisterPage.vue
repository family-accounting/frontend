<template>
  <div>
    <h1>Login</h1>

    <q-form @submit="onSubmit" @reset="onReset" ref="registerFormRef" class="q-gutter-md">
      <q-input filled v-model="registerForm.mobile" label="Your mobile *" hint="Mobile" lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']" />

      <q-input filled type="password" v-model="registerForm.password" label="Your password *" lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type your password']" />

      <q-input filled type="password" v-model="registerForm.passwordConfirm" label="Your password *" lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type your password']" />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { RegisterAuthDto } from 'src/common/types/auth.dto';
import { useAuthStore } from 'src/stores/auth-store';
import { QForm } from 'quasar';

const authStore = useAuthStore();

const registerFormRef = ref<InstanceType<typeof QForm> | null>(null);
const registerForm = ref<RegisterAuthDto>({} as RegisterAuthDto);

const onSubmit = async () => {
  const validate = await registerFormRef.value?.validate();
  if (validate) {
    return;
  }
  try {
    const { data } = await authStore.register(registerForm.value as RegisterAuthDto);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const onReset = () => {
  registerForm.value = {} as RegisterAuthDto;
};
</script>
