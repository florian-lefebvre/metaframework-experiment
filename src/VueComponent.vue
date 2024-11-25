<script setup lang="ts">
defineProps<{
    name: string
}>()
</script>

<template>
    <div>{{ name }}</div>
</template>