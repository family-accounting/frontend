<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Page Header -->
      <div class="col-12">
        <div class="row items-center justify-between">
          <div>
            <div class="text-h4 text-weight-bold q-mb-sm">Loans</div>
            <div class="text-subtitle1 text-grey-6">Track family loans and repayments</div>
          </div>
          <q-btn
            color="primary"
            icon="add"
            label="Add Loan"
            @click="showAddDialog = true"
            v-if="authStore.hasPermission('MEMBER')"
          />
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="col-12 col-md-3">
        <q-card class="summary-card bg-positive text-white">
          <q-card-section>
            <div class="row items-center">
              <div class="col">
                <div class="text-h6">{{ formatCurrency(totalGivenLoans) }}</div>
                <div class="text-subtitle2">Total Given</div>
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
                <div class="text-h6">{{ formatCurrency(totalReceivedLoans) }}</div>
                <div class="text-subtitle2">Total Received</div>
              </div>
              <div class="col-auto">
                <q-icon name="trending_down" size="48px" />
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
                <div class="text-h6">{{ formatCurrency(totalPendingGiven) }}</div>
                <div class="text-subtitle2">Pending Given</div>
              </div>
              <div class="col-auto">
                <q-icon name="schedule" size="48px" />
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
                <div class="text-h6">{{ formatCurrency(netLoanPosition) }}</div>
                <div class="text-subtitle2">Net Position</div>
              </div>
              <div class="col-auto">
                <q-icon name="account_balance" size="48px" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Tabs for different loan types -->
      <div class="col-12">
        <q-tabs
          v-model="activeTab"
          class="text-primary"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="all" label="All Loans" />
          <q-tab name="given" label="Given Loans" />
          <q-tab name="received" label="Received Loans" />
          <q-tab name="pending" label="Pending" />
          <q-tab name="repaid" label="Repaid" />
        </q-tabs>
      </div>

      <!-- Loans List -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="row items-center justify-between">
              <div>
                <div class="text-h6">{{ getTabTitle() }}</div>
                <div class="text-subtitle2 text-grey-6">
                  {{ getFilteredLoans().length }} loans found
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div
                v-for="loan in getFilteredLoans()"
                :key="loan.id"
                class="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <q-card class="loan-card" flat bordered>
                  <q-card-section>
                    <div class="row items-center justify-between q-mb-sm">
                      <q-chip
                        :color="loan.type === 'GIVEN' ? 'positive' : 'negative'"
                        text-color="white"
                        size="sm"
                      >
                        {{ loan.type }}
                      </q-chip>
                      <q-chip
                        :color="loan.isRepaid ? 'positive' : 'warning'"
                        text-color="white"
                        size="sm"
                      >
                        {{ loan.isRepaid ? 'Repaid' : 'Pending' }}
                      </q-chip>
                    </div>
                    
                    <div class="text-h6 q-mb-sm">{{ loan.description }}</div>
                    <div class="text-subtitle2 text-grey-6 q-mb-sm">
                      {{ formatDate(loan.date) }}
                    </div>
                    
                    <div class="text-h5 q-mb-sm">
                      {{ formatCurrency(loan.amount) }}
                      <span class="text-caption text-grey-6">{{ loan.currency }}</span>
                    </div>
                    
                    <div class="text-caption text-grey-6 q-mb-sm">
                      <div>From: {{ getMemberName(loan.fromMemberId) }}</div>
                      <div>To: {{ getMemberName(loan.toMemberId) }}</div>
                    </div>
                    
                    <div v-if="!loan.isRepaid" class="text-caption text-grey-6">
                      Pending: {{ formatCurrency(loan.amount - loan.repaidAmount) }}
                    </div>
                    
                    <div v-if="loan.isRepaid" class="text-caption text-grey-6">
                      Repaid: {{ formatCurrency(loan.repaidAmount) }}
                    </div>
                    
                    <!-- Action buttons -->
                    <div class="row q-mt-md q-gutter-sm" v-if="authStore.hasPermission('MEMBER')">
                      <q-btn
                        flat
                        round
                        size="sm"
                        icon="edit"
                        color="primary"
                        @click="editLoan(loan)"
                      />
                      <q-btn
                        flat
                        round
                        size="sm"
                        icon="delete"
                        color="negative"
                        @click="deleteLoan(loan)"
                      />
                      <q-btn
                        v-if="!loan.isRepaid"
                        flat
                        round
                        size="sm"
                        icon="check_circle"
                        color="positive"
                        @click="markRepaid(loan)"
                      />
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>

            <!-- Empty state -->
            <div v-if="getFilteredLoans().length === 0 && !isLoading" class="text-center q-pa-xl">
              <q-icon name="credit_card" size="64px" color="grey-4" />
              <div class="text-h6 text-grey-6 q-mt-md">No loans found</div>
              <div class="text-subtitle2 text-grey-5">
                {{ activeTab === 'all' ? 'Create your first loan to get started' : 'No loans in this category' }}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Add/Edit Loan Dialog -->
    <q-dialog v-model="showAddDialog" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">{{ editingLoan ? 'Edit Loan' : 'Add New Loan' }}</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-select
                  v-model="form.type"
                  :options="loanTypes"
                  label="Loan Type"
                  outlined
                  :rules="[val => !!val || 'Loan type is required']"
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

            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-select
                  v-model="form.fromMemberId"
                  :options="memberOptions"
                  label="From Member"
                  outlined
                  :rules="[val => !!val || 'From member is required']"
                  :disable="isSubmitting"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-select
                  v-model="form.toMemberId"
                  :options="memberOptions"
                  label="To Member"
                  outlined
                  :rules="[val => !!val || 'To member is required']"
                  :disable="isSubmitting"
                />
              </div>
            </div>
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
            :label="editingLoan ? 'Update' : 'Create'"
            @click="onSubmit"
            :loading="isSubmitting"
            :disable="isSubmitting"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Mark Repaid Dialog -->
    <q-dialog v-model="showRepaidDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Mark Loan as Repaid</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="repaidAmount"
            type="number"
            label="Repaid Amount"
            outlined
            :rules="[val => !!val || 'Amount is required', val => val > 0 || 'Amount must be positive']"
          >
            <template v-slot:prepend>
              <q-icon name="attach_money" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            @click="showRepaidDialog = false"
          />
          <q-btn
            color="positive"
            label="Mark Repaid"
            @click="confirmMarkRepaid"
            :loading="isMarkingRepaid"
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
import { useAuthStore } from 'src/stores/auth.store';
import { useLoanStore } from 'src/stores/loan.store';
import { useMemberStore } from 'stores/member-store';
import type { Loan, CreateLoanData } from 'src/types/response.mode;';

const $q = useQuasar();
const authStore = useAuthStore();
const loanStore = useLoanStore();
const memberStore = useMemberStore();

const isLoading = ref(false);
const isSubmitting = ref(false);
const isMarkingRepaid = ref(false);
const showAddDialog = ref(false);
const showRepaidDialog = ref(false);
const editingLoan = ref<Loan | null>(null);
const selectedLoanForRepaid = ref<Loan | null>(null);
const activeTab = ref('all');

const form = reactive<CreateLoanData>({
  type: 'GIVEN',
  amount: 0,
  currency: 'USD',
  fromMemberId: '',
  toMemberId: '',
  description: '',
  date: new Date().toISOString().split('T')[0] || ''
});

const repaidAmount = ref(0);

const loans = computed(() => loanStore.loans);
const totalGivenLoans = computed(() => loanStore.totalGivenLoans);
const totalReceivedLoans = computed(() => loanStore.totalReceivedLoans);
const totalPendingGiven = computed(() => loanStore.totalPendingGiven);
const netLoanPosition = computed(() => loanStore.netLoanPosition);
const members = computed(() => memberStore.members);

const loanTypes = [
  { label: 'Given Loan', value: 'GIVEN' },
  { label: 'Received Loan', value: 'RECEIVED' }
];

const memberOptions = computed(() => 
  members.value.map(member => ({
    label: member.name,
    value: member.id
  }))
);

const getTabTitle = (): string => {
  switch (activeTab.value) {
    case 'given': return 'Given Loans';
    case 'received': return 'Received Loans';
    case 'pending': return 'Pending Loans';
    case 'repaid': return 'Repaid Loans';
    default: return 'All Loans';
  }
};

const getFilteredLoans = (): Loan[] => {
  switch (activeTab.value) {
    case 'given': return loanStore.givenLoans;
    case 'received': return loanStore.receivedLoans;
    case 'pending': return loanStore.pendingLoans;
    case 'repaid': return loanStore.repaidLoans;
    default: return loans.value;
  }
};

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

const getMemberName = (memberId: string): string => {
  const member = members.value.find(m => m.id === memberId);
  return member?.name || 'Unknown Member';
};

const editLoan = (loan: Loan) => {
  editingLoan.value = loan;
  form.type = loan.type;
  form.amount = loan.amount;
  form.currency = loan.currency;
  form.fromMemberId = loan.fromMemberId;
  form.toMemberId = loan.toMemberId;
  form.description = loan.description;
  form.date = loan.date.split('T')[0] || '';
  showAddDialog.value = true;
};

const deleteLoan = async (loan: Loan) => {
  try {
    const confirmed = $q.dialog({
      title: 'Confirm Delete',
      message: `Are you sure you want to delete this loan? This action cannot be undone.`,
      cancel: true,
      persistent: true
    });

    if (confirmed) {
      const result = await loanStore.deleteLoan(loan.id);
      if (result.success) {
        $q.notify({
          type: 'positive',
          message: 'Loan deleted successfully',
          position: 'top'
        });
      } else {
        $q.notify({
          type: 'negative',
          message: result.message || 'Failed to delete loan',
          position: 'top'
        });
      }
    }
  } catch (error) {
    console.error('Failed to delete loan:', error);
  }
};

const markRepaid = (loan: Loan) => {
  selectedLoanForRepaid.value = loan;
  repaidAmount.value = loan.amount - loan.repaidAmount;
  showRepaidDialog.value = true;
};

const confirmMarkRepaid = async () => {
  if (!selectedLoanForRepaid.value) return;
  
  try {
    isMarkingRepaid.value = true;
    const result = await loanStore.markLoanRepaid(selectedLoanForRepaid.value.id, repaidAmount.value);
    
    if (result.success) {
      $q.notify({
        type: 'positive',
        message: 'Loan marked as repaid successfully',
        position: 'top'
      });
      showRepaidDialog.value = false;
      selectedLoanForRepaid.value = null;
      repaidAmount.value = 0;
    } else {
      $q.notify({
        type: 'negative',
        message: result.message || 'Failed to mark loan as repaid',
        position: 'top'
      });
    }
  } catch (error) {
    console.error('Failed to mark loan as repaid:', error);
    $q.notify({
      type: 'negative',
      message: 'An unexpected error occurred',
      position: 'top'
    });
  } finally {
    isMarkingRepaid.value = false;
  }
};

const onSubmit = async () => {
  try {
    isSubmitting.value = true;
    
    let result;
    if (editingLoan.value) {
      result = await loanStore.updateLoan(editingLoan.value.id, form);
    } else {
      result = await loanStore.createLoan(form);
    }
    
    if (result.success) {
      $q.notify({
        type: 'positive',
        message: editingLoan.value ? 'Loan updated successfully' : 'Loan created successfully',
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
    console.error('Failed to save loan:', error);
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
  editingLoan.value = null;
  form.type = 'GIVEN';
  form.amount = 0;
  form.currency = 'USD';
  form.fromMemberId = '';
  form.toMemberId = '';
  form.description = '';
  form.date = new Date().toISOString().split('T')[0] || '';
};

const loadData = async () => {
  try {
    isLoading.value = true;
    await Promise.all([
      loanStore.fetchLoans(),
      memberStore.fetchMembers()
    ]);
  } catch (error) {
    console.error('Failed to load data:', error);
    $q.notify({
      type: 'negative',
      message: 'Failed to load loans data',
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

.loan-card {
  transition: all 0.2s ease;
  cursor: pointer;
}

.loan-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
