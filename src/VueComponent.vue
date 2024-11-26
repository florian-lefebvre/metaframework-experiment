<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
    name: string
}>()

const test = computed(() => props.name.toUpperCase())
</script>

<template>
    <div>{{ test }}</div>
    <div><slot /></div>
</template>