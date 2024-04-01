<template>
	<div class="layout">
		<resize class="layout__resize">
			<Header class="layout__header" />

			<main class="layout__main">
				<transition>
					<router-view class="layout__page"></router-view>
				</transition>
			</main>
		</resize>
	</div>
</template>

<script setup lang="ts">
import Resize from '@/components/layout/Resize.vue'
import Header from '@/components/layout/Header.vue'
</script>

<style scoped lang="scss">
.layout {
	&__header {
		width: 100%;
		height: em(81);
	}
}
</style>
