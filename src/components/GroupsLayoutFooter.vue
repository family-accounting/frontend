<template>
    <nav class="flex gap-x-4 border-t border-t-neutral-200 dark:border-t-neutral-800">
        <RouterLink v-wave :class="[
            'py-2 flex-1 flex justify-center items-center',
            props.isGroupsActive ? 'bg-primary text-primary-foreground' : 'bg-transparent',
        ]" to="/">
            Groups
        </RouterLink>
        <RouterLink v-wave :class="[
            'py-2 flex-1 flex justify-center items-center',
            props.isWalletsActive ? 'bg-primary text-primary-foreground' : 'bg-transparent',
        ]" to="/wallets">
            Wallets
        </RouterLink>
        <RouterLink v-wave :class="[
            'py-2 flex-1 flex justify-center items-center',
            props.isAccountsActive ? 'bg-primary text-primary-foreground' : 'bg-transparent',
        ]" to="/accounts">
            Accounts
        </RouterLink>
    </nav>
</template>
<script setup lang="ts">

interface Props {
    isGroupsActive: boolean
    isWalletsActive: boolean
    isAccountsActive: boolean
}

const props = withDefaults(defineProps<Props>(), {} as Props)

</script>