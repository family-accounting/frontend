<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Page Header -->
      <div class="col-12">
        <div class="row items-center justify-between">
          <div>
            <div class="text-h4 text-weight-bold q-mb-sm">Accounts</div>
            <div class="text-subtitle1 text-grey-6">Manage your family accounts</div>
          </div>
          <q-btn
            color="primary"
            icon="add"
            label="Add Account"
            @click="showAddDialog = true"
            v-if="authStore.hasPermission('MEMBER')"
          />
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="col-12 col-md-4">
        <q-card class="summary-card bg-positive text-white">
          <q-card-section>
            <div class="row items-center">
              <div class="col">
                <div class="text-h6">{{ formatCurrency(totalBalance) }}</div>
                <div class="text-subtitle2">Total Balance</div>
              </div>
              <div class="col-auto">
                <q-icon name="account_balance" size="48px" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="summary-card bg-info text-white">
          <q-card-section>
            <div class="row items-center">
              <div class="col">
                <div class="text-h6">{{ accountsByType.cash.length }}</div>
                <div class="text-subtitle2">Cash Accounts</div>
              </div>
              <div class="col-auto">
                <q-icon name="money" size="48px" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="summary-card bg-warning text-white">
          <q-card-section>
            <div class="row items-center">
              <div class="col">
                <div class="text-h6">{{ accountsByType.bank.length }}</div>
                <div class="text-subtitle2">Bank Accounts</div>
              </div>
              <div class="col-auto">
                <q-icon name="account_balance_wallet" size="48px" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Accounts List -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">All Accounts</div>
            <div class="text-subtitle2 text-grey-6">Manage your financial accounts</div>
          </q-card-section>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div
                v-for="account in accounts"
                :key="account.id"
                class="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <q-card class="account-card" flat bordered>
                  <q-card-section>
                    <div class="row items-center justify-between q-mb-sm">
                      <q-chip
                        :color="account.type === 'CASH' ? 'orange' : 'blue'"
                        text-color="white"
                        size="sm"
                      >
                        {{ account.type }}
                      </q-chip>
                      <q-btn
                        flat
                        round
                        size="sm"
                        icon="more_vert"
                        v-if="authStore.hasPermission('MEMBER')"
                      >
                        <q-menu>
                          <q-list style="min-width: 150px">
                            <q-item clickable v-close-popup @click="editAccount(account)">
                              <q-item-section avatar>
                                <q-icon name="edit" />
                              </q-item-section>
                              <q-item-section>Edit</q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="deleteAccount(account)">
                              <q-item-section avatar>
                                <q-icon name="delete" color="negative" />
                              </q-item-section>
                              <q-item-section class="text-negative">Delete</q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </q-btn>
                    </div>
                    
                    <div class="text-h6 q-mb-sm">{{ account.name }}</div>
                    <div class="text-subtitle2 text-grey-6 q-mb-sm">
                      Currency: {{ account.currency }}
                    </div>
                    <div class="text-h5" :class="account.balance >= 0 ? 'text-positive' : 'text-negative'">
                      {{ formatCurrency(account.balance) }}
                    </div>
                    
                    <div v-if="account.memberId" class="text-caption text-grey-6 q-mt-sm">
                      Owner: {{ getMemberName(account.memberId) }}
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>

            <!-- Empty state -->
            <div v-if="accounts.length === 0 && !isLoading" class="text-center q-pa-xl">
              <q-icon name="account_balance" size="64px" color="grey-4" />
              <div class="text-h6 text-grey-6 q-mt-md">No accounts yet</div>
              <div class="text-subtitle2 text-grey-5">Create your first account to get started</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Add/Edit Account Dialog -->
    <q-dialog v-model="showAddDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">{{ editingAccount ? 'Edit Account' : 'Add New Account' }}</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              v-model="form.name"
              label="Account Name"
              outlined
              :rules="[val => !!val || 'Account name is required']"
              :disable="isSubmitting"
            />

            <q-select
              v-model="form.type"
              :options="accountTypes"
              label="Account Type"
              outlined
              :rules="[val => !!val || 'Account type is required']"
              :disable="isSubmitting"
            />

            <q-input
              v-model="form.currency"
              label="Currency"
              outlined
              :rules="[val => !!val || 'Currency is required']"
              :disable="isSubmitting"
            >
              <template v-slot:prepend>
                <q-icon name="attach_money" />
              </template>
            </q-input>

            <q-select
              v-model="form.memberId"
              :options="memberOptions"
              label="Owner (Optional)"
              outlined
              clearable
              :disable="isSubmitting"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            @click="closeDialog"
            :disable="isSubmitting"
          />
          <q-btn
            color="primary"
            :label="editingAccount ? 'Update' : 'Create'"
            @click="onSubmit"
            :loading="isSubmitting"
            :disable="isSubmitting"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Loading overlay -->
    <q-inner-loading :showing="isLoading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'stores/auth-store';
import { useAccountStore } from 'stores/account-store';
import { useMemberStore } from 'stores/member-store';
import type { Account, CreateAccountData } from 'src/types';

const $q = useQuasar();
const authStore = useAuthStore();
const accountStore = useAccountStore();
const memberStore = useMemberStore();

const isLoading = ref(false);
const isSubmitting = ref(false);
const showAddDialog = ref(false);
const editingAccount = ref<Account | null>(null);

const form = reactive<CreateAccountData>({
  name: '',
  type: 'BANK',
  currency: 'USD',
  memberId: ''
});
const accounts = computed(() => accountStore.accounts);
const totalBalance = computed(() => accountStore.totalBalance);
const accountsByType = computed(() => accountStore.accountsByType);
const members = computed(() => memberStore.members);

const accountTypes = [
  { label: 'Bank Account', value: 'BANK' },
  { label: 'Cash', value: 'CASH' }
];

const memberOptions = computed(() => 
  members.value.map(member => ({
    label: member.name,
    value: member.id
  }))
);

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const getMemberName = (memberId: string): string => {
  const member = members.value.find(m => m.id === memberId);
  return member?.name || 'Unknown';
};

const editAccount = (account: Account) => {
  editingAccount.value = account;
  form.name = account.name;
  form.type = account.type;
  form.currency = account.currency;
  form.memberId = account.memberId || '';
  showAddDialog.value = true;
};

const deleteAccount = async (account: Account) => {
  try {
    const confirmed =  $q.dialog({
      title: 'Confirm Delete',
      message: `Are you sure you want to delete "${account.name}"? This action cannot be undone.`,
      cancel: true,
      persistent: true
    });

    if (confirmed) {
      const result = await accountStore.deleteAccount(account.id);
      if (result.success) {
        $q.notify({
          type: 'positive',
          message: 'Account deleted successfully',
          position: 'top'
        });
      } else {
        $q.notify({
          type: 'negative',
          message: result.message || 'Failed to delete account',
          position: 'top'
        });
      }
    }
  } catch (error) {
    console.error('Failed to delete account:', error);
  }
};

const onSubmit = async () => {
  try {
    isSubmitting.value = true;
    
    let result;
    if (editingAccount.value) {
      result = await accountStore.updateAccount(editingAccount.value.id, form);
    } else {
      result = await accountStore.createAccount(form);
    }
    
    if (result.success) {
      $q.notify({
        type: 'positive',
        message: editingAccount.value ? 'Account updated successfully' : 'Account created successfully',
        position: 'top'
      });
      closeDialog();
    } else {
      $q.notify({
        type: 'negative',
        message: result.message || 'Operation failed',
        position: 'top'
      });
    }
  } catch (error) {
    console.error('Failed to save account:', error);
    $q.notify({
      type: 'negative',
      message: 'An unexpected error occurred',
      position: 'top'
    });
  } finally {
    isSubmitting.value = false;
  }
};

const closeDialog = () => {
  showAddDialog.value = false;
  editingAccount.value = null;
  form.name = '';
  form.type = 'BANK';
  form.currency = 'USD';
  form.memberId = '';
};

const loadData = async () => {
  try {
    isLoading.value = true;
    await Promise.all([
      accountStore.fetchAccounts(),
      memberStore.fetchMembers()
    ]);
  } catch (error) {
    console.error('Failed to load data:', error);
    $q.notify({
      type: 'negative',
      message: 'Failed to load accounts data',
      position: 'top'
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await loadData();
});
</script>

<style scoped>
.summary-card {
  transition: transform 0.2s ease;
}

.summary-card:hover {
  transform: translateY(-2px);
}

.account-card {
  transition: all 0.2s ease;
  cursor: pointer;
}

.account-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
