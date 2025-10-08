<template>
    <nav class="flex gap-x-4 border-t border-t-neutral-200 dark:border-t-neutral-800">
        <RouterLink v-wave :class="[
            'py-2 flex-1 flex justify-center items-center',
            isTransactionsActive ? 'bg-primary text-primary-foreground' : 'bg-transparent',
        ]" :to="{
            name: 'TransactionsView',
            params: {
                groupId: props.groupId,
            },
        }">
            Transactions
        </RouterLink>
        <RouterLink v-wave :class="[
            'py-2 flex-1 flex justify-center items-center',
            isSettingsActive ? 'bg-primary text-primary-foreground' : 'bg-transparent',
        ]" :to="{
            name: 'SettingsView',
            params: {
                groupId: props.groupId,
            },
        }">
            Settings
        </RouterLink>
    </nav>
</template>
<script setup lang="ts">

interface Props {
    isTransactionsActive: boolean
    isSettingsActive: boolean
    groupId: string
}

const props = withDefaults(defineProps<Props>(), {} as Props)

</script>