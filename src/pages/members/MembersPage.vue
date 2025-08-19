<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Page Header -->
      <div class="col-12">
        <div class="row items-center justify-between">
          <div>
            <div class="text-h4 text-weight-bold q-mb-sm">Members</div>
            <div class="text-subtitle1 text-grey-6">Manage family members and roles</div>
          </div>
          <q-btn
            color="primary"
            icon="add"
            label="Add Member"
            @click="showAddDialog = true"
            v-if="authStore.isAdmin"
          />
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="col-12 col-md-3">
        <q-card class="summary-card bg-primary text-white">
          <q-card-section>
            <div class="row items-center">
              <div class="col">
                <div class="text-h6">{{ totalMembers }}</div>
                <div class="text-subtitle2">Total Members</div>
              </div>
              <div class="col-auto">
                <q-icon name="people" size="48px" />
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
                <div class="text-h6">{{ adminMembers.length }}</div>
                <div class="text-subtitle2">Admins</div>
              </div>
              <div class="col-auto">
                <q-icon name="admin_panel_settings" size="48px" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-3">
        <q-card class="summary-card bg-blue text-white">
          <q-card-section>
            <div class="row items-center">
              <div class="col">
                <div class="text-h6">{{ regularMembers.length }}</div>
                <div class="text-subtitle2">Members</div>
              </div>
              <div class="col-auto">
                <q-icon name="person" size="48px" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-3">
        <q-card class="summary-card bg-green text-white">
          <q-card-section>
            <div class="row items-center">
              <div class="col">
                <div class="text-h6">{{ viewerMembers.length }}</div>
                <div class="text-subtitle2">Viewers</div>
              </div>
              <div class="col-auto">
                <q-icon name="visibility" size="48px" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Members List -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="row items-center justify-between">
              <div>
                <div class="text-h6">All Members</div>
                <div class="text-subtitle2 text-grey-6">Manage family member accounts</div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div
                v-for="member in members"
                :key="member.id"
                class="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <q-card class="member-card" flat bordered>
                  <q-card-section>
                    <div class="row items-center justify-between q-mb-sm">
                      <q-chip
                        :color="getRoleColor(member.role)"
                        text-color="white"
                        size="sm"
                      >
                        {{ member.role }}
                      </q-chip>
                      <q-btn
                        flat
                        round
                        size="sm"
                        icon="more_vert"
                        v-if="authStore.isAdmin && member.id !== authStore.user?.id"
                      >
                        <q-menu>
                          <q-list style="min-width: 150px">
                            <q-item clickable v-close-popup @click="editMember(member)">
                              <q-item-section avatar>
                                <q-icon name="edit" />
                              </q-item-section>
                              <q-item-section>Edit</q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="deleteMember(member)">
                              <q-item-section avatar>
                                <q-icon name="delete" color="negative" />
                              </q-item-section>
                              <q-item-section class="text-negative">Delete</q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </q-btn>
                    </div>
                    
                    <div class="text-center q-mb-md">
                      <q-avatar size="80px" color="primary" text-color="white">
                        {{ member.name.charAt(0).toUpperCase() }}
                      </q-avatar>
                    </div>
                    
                    <div class="text-h6 q-mb-sm text-center">{{ member.name }}</div>
                    <div class="text-subtitle2 text-grey-6 q-mb-sm text-center">
                      {{ member.email }}
                    </div>
                    
                    <div class="text-h6 q-mb-sm text-center" :class="member.totalBalance >= 0 ? 'text-positive' : 'text-negative'">
                      {{ formatCurrency(member.totalBalance) }}
                    </div>
                    
                    <div class="text-caption text-grey-6 text-center">
                      Total Balance
                    </div>
                    
                    <div class="text-caption text-grey-6 text-center q-mt-sm">
                      Joined: {{ formatDate(member.createdAt) }}
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>

            <!-- Empty state -->
            <div v-if="members.length === 0 && !isLoading" class="text-center q-pa-xl">
              <q-icon name="people" size="64px" color="grey-4" />
              <div class="text-h6 text-grey-6 q-mt-md">No members yet</div>
              <div class="text-subtitle2 text-grey-5">Add your first family member to get started</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Add/Edit Member Dialog -->
    <q-dialog v-model="showAddDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">{{ editingMember ? 'Edit Member' : 'Add New Member' }}</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              v-model="form.name"
              label="Full Name"
              outlined
              :rules="[val => !!val || 'Name is required']"
              :disable="isSubmitting"
            />

            <q-input
              v-model="form.email"
              type="email"
              label="Email"
              outlined
              :rules="[
                val => !!val || 'Email is required',
                val => isValidEmail(val) || 'Invalid email format'
              ]"
              :disable="isSubmitting"
            />

            <q-select
              v-model="form.role"
              :options="roleOptions"
              label="Role"
              outlined
              :rules="[val => !!val || 'Role is required']"
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
            :label="editingMember ? 'Update' : 'Create'"
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
import { useAuthStore } from 'src/stores/auth.store';
import { useMemberStore } from 'stores/member-store';
import type { Member, CreateMemberData } from 'src/types/response.mode;';

const $q = useQuasar();
const authStore = useAuthStore();
const memberStore = useMemberStore();

const isLoading = ref(false);
const isSubmitting = ref(false);
const showAddDialog = ref(false);
const editingMember = ref<Member | null>(null);

const form = reactive<CreateMemberData>({
  name: '',
  email: '',
  role: 'MEMBER'
});

const members = computed(() => memberStore.members);
const totalMembers = computed(() => memberStore.totalMembers);
const adminMembers = computed(() => memberStore.adminMembers);
const regularMembers = computed(() => memberStore.regularMembers);
const viewerMembers = computed(() => memberStore.viewerMembers);

const roleOptions = [
  { label: 'Admin - Full access', value: 'ADMIN' },
  { label: 'Member - Can manage transactions', value: 'MEMBER' },
  { label: 'Viewer - Read-only access', value: 'VIEWER' }
];

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

const getRoleColor = (role: string): string => {
  switch (role) {
    case 'ADMIN': return 'negative';
    case 'MEMBER': return 'blue';
    case 'VIEWER': return 'green';
    default: return 'grey';
  }
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const editMember = (member: Member) => {
  editingMember.value = member;
  form.name = member.name;
  form.email = member.email;
  form.role = member.role;
  showAddDialog.value = true;
};

const deleteMember = async (member: Member) => {
  try {
    const confirmed =  $q.dialog({
      title: 'Confirm Delete',
      message: `Are you sure you want to delete "${member.name}"? This action cannot be undone and will remove all their data.`,
      cancel: true,
      persistent: true
    });

    if (confirmed) {
      const result = await memberStore.deleteMember(member.id);
      if (result.success) {
        $q.notify({
          type: 'positive',
          message: 'Member deleted successfully',
          position: 'top'
        });
      } else {
        $q.notify({
          type: 'negative',
          message: result.message || 'Failed to delete member',
          position: 'top'
        });
      }
    }
  } catch (error) {
    console.error('Failed to delete member:', error);
  }
};

const onSubmit = async () => {
  try {
    isSubmitting.value = true;
    
    let result;
    if (editingMember.value) {
      result = await memberStore.updateMember(editingMember.value.id, form);
    } else {
      result = await memberStore.createMember(form);
    }
    
    if (result.success) {
      $q.notify({
        type: 'positive',
        message: editingMember.value ? 'Member updated successfully' : 'Member created successfully',
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
    console.error('Failed to save member:', error);
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
  editingMember.value = null;
  form.name = '';
  form.email = '';
  form.role = 'MEMBER';
};

const loadData = async () => {
  try {
    isLoading.value = true;
    await memberStore.fetchMembers();
  } catch (error) {
    console.error('Failed to load data:', error);
    $q.notify({
      type: 'negative',
      message: 'Failed to load members data',
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

.member-card {
  transition: all 0.2s ease;
  cursor: pointer;
}

.member-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
