<template>
	<component :is="components[currentLayout]"> </component>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/default.vue'
import { ref } from 'vue'

const components = {
	DefaultLayout
}

const currentLayout = ref('DefaultLayout')
</script>

<style scoped lang="scss"></style>
