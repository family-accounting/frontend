<template>
    <header class="flex justify-between items-center gap-x-4 p-4 border-b border-b-neutral-200 dark:border-b-neutral-800">
        <RouterLink to="/" class="flex items-center gap-x-2">
            <img src="/logo.svg" alt="logo" class="w-10 h-10" />
            <span class="text-xs">{{ props.title }}</span>
        </RouterLink>
        <div class="flex items-center gap-x-2">
            <UColorModeButton class="cursor-pointer" />
            <span class="text-xs">Version: {{ props.version }}</span>
        </div>
    </header>
</template>
<script setup lang="ts">

interface Props {
    title: string
    version: string
}

const props = withDefaults(defineProps<Props>(), {})

</script>