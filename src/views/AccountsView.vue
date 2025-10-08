<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useAccountStore } from '@/stores/account.store'

useHead({
  title: 'Groups - Family Accounting',
})

const accountStore = useAccountStore()
</script>

  <template>
    <UPageList divide>
      <template v-for="account in accountStore.accounts" :key="account.id">
        <UPageCard variant="ghost" :to="`/accounts/${account.id}`">
          <template #body>
            <UUser :name="account.name" :description="account.description" :avatar="account.avatar" :color="account.color"
              :icon="account.icon" size="xl" />
          </template>
        </UPageCard>
      </template>
    </UPageList>
  </template>
