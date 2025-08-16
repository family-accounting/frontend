<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Page Header -->
      <div class="col-12">
        <div class="text-h4 text-weight-bold q-mb-sm">Dashboard</div>
        <div class="text-subtitle1 text-grey-6">Welcome back, {{ user?.name }}!</div>
      </div>

      <!-- Summary Cards -->
      <div class="col-12 col-md-3">
        <q-card class="summary-card bg-positive text-white">
          <q-card-section>
            <div class="row items-center">
              <div class="col">
                <div class="text-h6">{{ formatCurrency(totalAssets) }}</div>
                <div class="text-subtitle2">Total Assets</div>
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
                <div class="text-h6">{{ formatCurrency(totalLiabilities) }}</div>
                <div class="text-subtitle2">Total Liabilities</div>
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
                <div class="text-h6">{{ formatCurrency(netWorth) }}</div>
                <div class="text-subtitle2">Net Worth</div>
              </div>
              <div class="col-auto">
                <q-icon name="account_balance" size="48px" />
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
                <div class="text-h6">{{ formatCurrency(monthlyIncome) }}</div>
                <div class="text-subtitle2">Monthly Income</div>
              </div>
              <div class="col-auto">
                <q-icon name="payments" size="48px" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Charts Row -->
      <div class="col-12 col-lg-8">
        <q-card>
          <q-card-section>
            <div class="text-h6">Monthly Overview</div>
            <div class="text-subtitle2 text-grey-6">Income vs Expenses</div>
          </q-card-section>
          <q-card-section>
            <div class="chart-container" style="height: 300px;">
              <canvas ref="monthlyChart"></canvas>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-lg-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">Expense Breakdown</div>
            <div class="text-subtitle2 text-grey-6">This month</div>
          </q-card-section>
          <q-card-section>
            <div class="chart-container" style="height: 300px;">
              <canvas ref="expenseChart"></canvas>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Member Balances -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Member Balances</div>
            <div class="text-subtitle2 text-grey-6">Current account balances by member</div>
          </q-card-section>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div
                v-for="member in members"
                :key="member.id"
                class="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <q-card class="member-balance-card" flat bordered>
                  <q-card-section class="text-center">
                    <q-avatar size="56px" color="primary" text-color="white">
                      {{ member.name.charAt(0).toUpperCase() }}
                    </q-avatar>
                    <div class="text-h6 q-mt-sm">{{ member.name }}</div>
                    <div class="text-subtitle2 text-grey-6">{{ member.role }}</div>
                    <div class="text-h6 q-mt-sm" :class="member.totalBalance >= 0 ? 'text-positive' : 'text-negative'">
                      {{ formatCurrency(member.totalBalance) }}
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Recent Transactions -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="row items-center justify-between">
              <div>
                <div class="text-h6">Recent Transactions</div>
                <div class="text-subtitle2 text-grey-6">Latest financial activities</div>
              </div>
              <q-btn
                color="primary"
                :to="{ name: 'transactions' }"
                label="View All"
                flat
              />
            </div>
          </q-card-section>
          <q-card-section>
            <q-list>
              <q-item
                v-for="transaction in recentTransactions"
                :key="transaction.id"
                class="q-pa-md"
              >
                <q-item-section avatar>
                  <q-avatar :color="getTransactionColor(transaction.type)" text-color="white">
                    <q-icon :name="getTransactionIcon(transaction.type)" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ transaction.description }}</q-item-label>
                  <q-item-label caption>
                    {{ formatDate(transaction.date) }} • {{ transaction.type }}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label :class="getAmountColor(transaction.type, transaction.amount)">
                    {{ formatCurrency(transaction.amount) }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Loading overlay -->
    <q-inner-loading :showing="isLoading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from 'stores/auth-store';
import { useAccountStore } from 'stores/account-store';
import { useTransactionStore } from 'stores/transaction-store';
import { useMemberStore } from 'stores/member-store';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const authStore = useAuthStore();
const accountStore = useAccountStore();
const transactionStore = useTransactionStore();
const memberStore = useMemberStore();

const user = computed(() => authStore.user);
const isLoading = ref(false);

// Chart refs
const monthlyChart = ref<HTMLCanvasElement>();
const expenseChart = ref<HTMLCanvasElement>();

// Mock data for now (replace with real API calls)
const totalAssets = ref(125000);
const totalLiabilities = ref(25000);
const netWorth = computed(() => totalAssets.value - totalLiabilities.value);
const monthlyIncome = ref(8500);

const members = computed(() => memberStore.members);
const recentTransactions = computed(() => 
  transactionStore.transactions.slice(0, 5)
);

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
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

const loadDashboardData = async () => {
  try {
    isLoading.value = true;
    
    // Load all necessary data
    await Promise.all([
      accountStore.fetchAccounts(),
      transactionStore.fetchTransactions(),
      memberStore.fetchMembers()
    ]);
    
    // TODO: Load dashboard stats from API
    // const stats = await apiService.getDashboardStats();
    
  } catch (error) {
    console.error('Failed to load dashboard data:', error);
    $q.notify({
      type: 'negative',
      message: 'Failed to load dashboard data',
      position: 'top'
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await loadDashboardData();
});

onUnmounted(() => {
  // Clean up charts if needed
});
</script>

<style scoped>
.summary-card {
  transition: transform 0.2s ease;
}

.summary-card:hover {
  transform: translateY(-2px);
}

.member-balance-card {
  transition: all 0.2s ease;
}

.member-balance-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.chart-container {
  position: relative;
  width: 100%;
}
</style>
