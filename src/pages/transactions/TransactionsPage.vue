<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Page Header -->
      <div class="col-12">
        <div class="row items-center justify-between">
          <div>
            <div class="text-h4 text-weight-bold q-mb-sm">Transactions</div>
            <div class="text-subtitle1 text-grey-6">Track your financial activities</div>
          </div>
          <q-btn
            color="primary"
            icon="add"
            label="Add Transaction"
            @click="showAddDialog = true"
            v-if="authStore.hasPermission('MEMBER')"
          />
        </div>
      </div>

      <!-- Filters -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Filters</div>
            <div class="row q-col-gutter-md q-mt-sm">
              <div class="col-12 col-sm-6 col-md-3">
                <q-select
                  v-model="filters.type"
                  :options="transactionTypes"
                  label="Transaction Type"
                  outlined
                  clearable
                  dense
                  @update:model-value="applyFilters"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <q-select
                  v-model="filters.memberId"
                  :options="memberOptions"
                  label="Member"
                  outlined
                  clearable
                  dense
                  @update:model-value="applyFilters"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <q-input
                  v-model="filters.startDate"
                  type="date"
                  label="Start Date"
                  outlined
                  dense
                  @update:model-value="applyFilters"
                />
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <q-input
                  v-model="filters.endDate"
                  type="date"
                  label="End Date"
                  outlined
                  dense
                  @update:model-value="applyFilters"
                />
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col">
                <q-btn
                  flat
                  color="primary"
                  label="Clear Filters"
                  @click="clearFilters"
                  :disable="!hasActiveFilters"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Summary Cards -->
      <div class="col-12 col-md-3">
        <q-card class="summary-card bg-positive text-white">
          <q-card-section>
            <div class="row items-center">
              <div class="col">
                <div class="text-h6">{{ formatCurrency(totalIncome) }}</div>
                <div class="text-subtitle2">Total Income</div>
              </div>
              <div class="col-auto">
                <q-icon name="trending_up" size="48px" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-3">
        <q-card class="summary-card bg-negative text-white">
          <q-card-section>
            <div class="row items-center">
              <div class="col">
                <div class="text-h6">{{ formatCurrency(totalExpenses) }}</div>
                <div class="text-subtitle2">Total Expenses</div>
              </div>
              <div class="col-auto">
                <q-icon name="trending_down" size="48px" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-3">
        <q-card class="summary-card bg-info text-white">
          <q-card-section>
            <div class="row items-center">
              <div class="col">
                <div class="text-h6">{{ formatCurrency(totalTransfers) }}</div>
                <div class="text-subtitle2">Total Transfers</div>
              </div>
              <div class="col-auto">
                <q-icon name="swap_horiz" size="48px" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-3">
        <q-card class="summary-card bg-warning text-white">
          <q-card-section>
            <div class="row items-center">
              <div class="col">
                <div class="text-h6">{{ formatCurrency(netIncome) }}</div>
                <div class="text-subtitle2">Net Income</div>
              </div>
              <div class="col-auto">
                <q-icon name="account_balance" size="48px" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Transactions List -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="row items-center justify-between">
              <div>
                <div class="text-h6">All Transactions</div>
                <div class="text-subtitle2 text-grey-6">
                  {{ filteredTransactions.length }} transactions found
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-list>
              <q-item
                v-for="transaction in filteredTransactions"
                :key="transaction.id"
                class="transaction-item q-pa-md"
              >
                <q-item-section avatar>
                  <q-avatar :color="getTransactionColor(transaction.type)" text-color="white">
                    <q-icon :name="getTransactionIcon(transaction.type)" />
                  </q-avatar>
                </q-item-section>
                
                <q-item-section>
                  <q-item-label class="text-weight-medium">
                    {{ transaction.description }}
                  </q-item-label>
                  <q-item-label caption>
                    {{ formatDate(transaction.date) }} • {{ transaction.type }}
                    <span v-if="transaction.category">• {{ transaction.category }}</span>
                  </q-item-label>
                  <q-item-label caption>
                    <span v-if="transaction.fromAccountId">
                      From: {{ getAccountName(transaction.fromAccountId) }}
                    </span>
                    <span v-if="transaction.toAccountId">
                      To: {{ getAccountName(transaction.toAccountId) }}
                    </span>
                    <span v-if="transaction.memberId">
                      • {{ getMemberName(transaction.memberId) }}
                    </span>
                  </q-item-label>
                </q-item-section>
                
                <q-item-section side>
                  <div class="text-right">
                    <div class="text-h6" :class="getAmountColor(transaction.type, transaction.amount)">
                      {{ formatCurrency(transaction.amount) }}
                    </div>
                    <div class="text-caption text-grey-6">{{ transaction.currency }}</div>
                  </div>
                </q-item-section>

                <!-- Swipe actions for mobile -->
                <q-item-section side v-if="authStore.hasPermission('MEMBER')">
                  <q-btn
                    flat
                    round
                    size="sm"
                    icon="more_vert"
                  >
                    <q-menu>
                      <q-list style="min-width: 150px">
                        <q-item clickable v-close-popup @click="editTransaction(transaction)">
                          <q-item-section avatar>
                            <q-icon name="edit" />
                          </q-item-section>
                          <q-item-section>Edit</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="deleteTransaction(transaction)">
                          <q-item-section avatar>
                            <q-icon name="delete" color="negative" />
                          </q-item-section>
                          <q-item-section class="text-negative">Delete</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </q-item-section>
              </q-item>
            </q-list>

            <!-- Empty state -->
            <div v-if="filteredTransactions.length === 0 && !isLoading" class="text-center q-pa-xl">
              <q-icon name="receipt_long" size="64px" color="grey-4" />
              <div class="text-h6 text-grey-6 q-mt-md">No transactions found</div>
              <div class="text-subtitle2 text-grey-5">
                {{ hasActiveFilters ? 'Try adjusting your filters' : 'Create your first transaction to get started' }}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Add/Edit Transaction Dialog -->
    <q-dialog v-model="showAddDialog" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">{{ editingTransaction ? 'Edit Transaction' : 'Add New Transaction' }}</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-select
                  v-model="form.type"
                  :options="transactionTypes"
                  label="Transaction Type"
                  outlined
                  :rules="[val => !!val || 'Transaction type is required']"
                  :disable="isSubmitting"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  v-model="form.amount"
                  type="number"
                  label="Amount"
                  outlined
                  :rules="[val => !!val || 'Amount is required', val => val > 0 || 'Amount must be positive']"
                  :disable="isSubmitting"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_money" />
                  </template>
                </q-input>
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-input
                  v-model="form.currency"
                  label="Currency"
                  outlined
                  :rules="[val => !!val || 'Currency is required']"
                  :disable="isSubmitting"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  v-model="form.date"
                  type="date"
                  label="Date"
                  outlined
                  :rules="[val => !!val || 'Date is required']"
                  :disable="isSubmitting"
                />
              </div>
            </div>

            <q-input
              v-model="form.description"
              label="Description"
              outlined
              :rules="[val => !!val || 'Description is required']"
              :disable="isSubmitting"
            />

            <q-input
              v-model="form.category"
              label="Category (Optional)"
              outlined
              :disable="isSubmitting"
            />

            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-select
                  v-model="form.fromAccountId"
                  :options="accountOptions"
                  label="From Account (Optional)"
                  outlined
                  clearable
                  :disable="isSubmitting"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-select
                  v-model="form.toAccountId"
                  :options="accountOptions"
                  label="To Account (Optional)"
                  outlined
                  clearable
                  :disable="isSubmitting"
                />
              </div>
            </div>

            <q-select
              v-model="form.memberId"
              :options="memberOptions"
              label="Member"
              outlined
              :rules="[val => !!val || 'Member is required']"
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
            :label="editingTransaction ? 'Update' : 'Create'"
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
import { ref, computed, onMounted, reactive, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth.store';
import { useTransactionStore } from 'src/stores/transaction.store';
import { useAccountStore } from 'src/stores/account.store';
import { useMemberStore } from 'stores/member-store';
import type { Transaction, CreateTransactionData } from 'src/types/response.mode;';

const $q = useQuasar();
const authStore = useAuthStore();
const transactionStore = useTransactionStore();
const accountStore = useAccountStore();
const memberStore = useMemberStore();

const isLoading = ref(false);
const isSubmitting = ref(false);
const showAddDialog = ref(false);
const editingTransaction = ref<Transaction | null>(null);

const filters = reactive({
  type: '',
  memberId: '',
  startDate: '',
  endDate: ''
});

const form = reactive<CreateTransactionData>({
  type: 'EXPENSE',
  amount: 0,
  currency: 'USD',
  fromAccountId: '',
  toAccountId: '',
  memberId: '',
  date: new Date().toISOString().split('T')[0] || '',
  description: '',
  category: ''
});

const filteredTransactions = computed(() => transactionStore.filteredTransactions);
const totalIncome = computed(() => transactionStore.totalIncome);
const totalExpenses = computed(() => transactionStore.totalExpenses);
const totalTransfers = computed(() => transactionStore.totalTransfers);
const netIncome = computed(() => transactionStore.netIncome);
const accounts = computed(() => accountStore.accounts);
const members = computed(() => memberStore.members);

const transactionTypes = [
  { label: 'Income', value: 'INCOME' },
  { label: 'Expense', value: 'EXPENSE' },
  { label: 'Transfer', value: 'TRANSFER' },
  { label: 'Loan', value: 'LOAN' }
];

const accountOptions = computed(() => 
  accounts.value.map(account => ({
    label: `${account.name} (${account.currency})`,
    value: account.id
  }))
);

const memberOptions = computed(() => 
  members.value.map(member => ({
    label: member.name,
    value: member.id
  }))
);

const hasActiveFilters = computed(() => 
  filters.type || filters.memberId || filters.startDate || filters.endDate
);

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getTransactionColor = (type: string): string => {
  switch (type) {
    case 'INCOME': return 'positive';
    case 'EXPENSE': return 'negative';
    case 'TRANSFER': return 'info';
    case 'LOAN': return 'warning';
    default: return 'grey';
  }
};

const getTransactionIcon = (type: string): string => {
  switch (type) {
    case 'INCOME': return 'trending_up';
    case 'EXPENSE': return 'trending_down';
    case 'TRANSFER': return 'swap_horiz';
    case 'LOAN': return 'credit_card';
    default: return 'receipt';
  }
};

const getAmountColor = (type: string, amount: number): string => {
  if (type === 'INCOME') return 'text-positive';
  if (type === 'EXPENSE') return 'text-negative';
  if (amount > 0) return 'text-positive';
  if (amount < 0) return 'text-negative';
  return 'text-grey';
};

const getAccountName = (accountId: string): string => {
  const account = accounts.value.find(acc => acc.id === accountId);
  return account?.name || 'Unknown Account';
};

const getMemberName = (memberId: string): string => {
  const member = members.value.find(m => m.id === memberId);
  return member?.name || 'Unknown Member';
};

const applyFilters = () => {
  transactionStore.setFilters(filters);
};

const clearFilters = () => {
  Object.assign(filters, {
    type: '',
    memberId: '',
    startDate: '',
    endDate: ''
  });
  transactionStore.resetFilters();
};

const editTransaction = (transaction: Transaction) => {
  editingTransaction.value = transaction;
  form.type = transaction.type;
  form.amount = transaction.amount;
  form.currency = transaction.currency;
  form.fromAccountId = transaction.fromAccountId || '';
  form.toAccountId = transaction.toAccountId || '';
  form.memberId = transaction.memberId;
  form.date = transaction.date.split('T')[0] || '';
  form.description = transaction.description;
  form.category = transaction.category || '';
  showAddDialog.value = true;
};

const deleteTransaction = async (transaction: Transaction) => {
  try {
    const confirmed = $q.dialog({
      title: 'Confirm Delete',
      message: `Are you sure you want to delete this transaction? This action cannot be undone.`,
      cancel: true,
      persistent: true
    });

    if (confirmed) {
      const result = await transactionStore.deleteTransaction(transaction.id);
      if (result.success) {
        $q.notify({
          type: 'positive',
          message: 'Transaction deleted successfully',
          position: 'top'
        });
      } else {
        $q.notify({
          type: 'negative',
          message: result.message || 'Failed to delete transaction',
          position: 'top'
        });
      }
    }
  } catch (error) {
    console.error('Failed to delete transaction:', error);
  }
};

const onSubmit = async () => {
  try {
    isSubmitting.value = true;
    
    let result;
    if (editingTransaction.value) {
      result = await transactionStore.updateTransaction(editingTransaction.value.id, form);
    } else {
      result = await transactionStore.createTransaction(form);
    }
    
    if (result.success) {
      $q.notify({
        type: 'positive',
        message: editingTransaction.value ? 'Transaction updated successfully' : 'Transaction created successfully',
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
    console.error('Failed to save transaction:', error);
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
  editingTransaction.value = null;
  form.type = 'EXPENSE';
  form.amount = 0;
  form.currency = 'USD';
  form.fromAccountId = '';
  form.toAccountId = '';
  form.memberId = '';
  form.date = new Date().toISOString().split('T')[0] || '';
  form.description = '';
  form.category = '';
};

const loadData = async () => {
  try {
    isLoading.value = true;
    await Promise.all([
      transactionStore.fetchTransactions(),
      accountStore.fetchAccounts(),
      memberStore.fetchMembers()
    ]);
  } catch (error) {
    console.error('Failed to load data:', error);
    $q.notify({
      type: 'negative',
      message: 'Failed to load transactions data',
      position: 'top'
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await loadData();
});

// Watch for filter changes
watch(filters, () => {
  applyFilters();
}, { deep: true });
</script>

<style scoped>
.summary-card {
  transition: transform 0.2s ease;
}

.summary-card:hover {
  transform: translateY(-2px);
}

.transaction-item {
  transition: all 0.2s ease;
  border-radius: 8px;
}

.transaction-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
}
</style>
