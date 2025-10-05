<script setup lang="ts">
import { version } from '../../package.json'
</script>

<template>
    <div class="flex flex-col h-svh">
        <div class="flex justify-between items-center gap-x-4 p-4 border-b border-b-neutral-200 dark:border-b-neutral-800">
            <div class="flex items-center gap-x-2">
                <img src="/logo.svg" alt="logo" class="w-10 h-10" />
                Family Accounting
            </div>
            <div>
                <UColorModeButton class="cursor-pointer" />
               App version: {{ version }}
            </div>
        </div>
        <div class="flex-1">
            <RouterView />
        </div>
        <div class="flex gap-x-4 p-4 border-t border-t-neutral-200 dark:border-t-neutral-800">
            <ULink active-class="bg-primary text-primary-foreground" inactive-class="bg-transparent"
                class="py-2 flex-1 flex justify-center items-center rounded" to="/">
                Groups
            </ULink>
            <ULink active-class="bg-primary text-primary-foreground" inactive-class="bg-transparent"
                class="py-2 flex-1 flex justify-center items-center rounded" to="/wallets">
                Wallets
            </ULink>
        </div>
    </div>
</template>
