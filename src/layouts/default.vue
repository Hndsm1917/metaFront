<template>
	<div class="layout">
		<resize class="layout__resize">
			<Header class="layout__header" />

			<main class="layout__main">
				<router-view v-slot="{ Component }">
					<transition>
						<component :is="Component" />
					</transition>
				</router-view>
			</main>
		</resize>
	</div>
</template>

<script setup lang="ts">
import Resize from '@/components/layout/Resize.vue'
import Header from '@/components/layout/Header.vue'
import { useWalletStore } from '@/store/wallet'
import { onBeforeMount } from 'vue'

const walletStore = useWalletStore()

onBeforeMount(() => {
	walletStore.init().then(() => {
		if (window.localStorage.getItem('isWalletConnected') === 'true') {
			walletStore.fetchEthRequestAccounts()
		}
	})
})
</script>

<style scoped lang="scss">
.layout {
	&__header {
		width: 100%;
		height: em(81);
	}

	&__main {
		margin-top: em(4);
	}
}
</style>
