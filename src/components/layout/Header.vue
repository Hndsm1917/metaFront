<template>
	<header class="header">
		<div class="header__container">
			<div class="header__content">
				<button
					v-for="{ id, method, text } in controllers"
					:key="id"
					class="header__button"
					@click="method"
					type="button"
				>
					<span class="header__font header__font--btn"> {{ text }} </span>
				</button>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { useWalletStore } from '@/store/wallet'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

const walletStore = useWalletStore()
const { ethWallet, ethPersonalSign } = storeToRefs(walletStore)

const isCheckSign = ref(false)
const isCheckWalletAddress = ref(false)

const controllers = computed(() => {
	return [
		{
			id: 1,
			isCheck: isCheckSign.value,
			ethValue: ethPersonalSign.value,
			textDefault: 'Sign Message',
			textChecked: ethPersonalSign.value || '0x1a3F',
			action: 'sign',
			canShow: Boolean(ethWallet.value)
		},
		{
			id: 2,
			isCheck: isCheckWalletAddress.value,
			ethValue: ethWallet.value,
			textDefault: 'Connect Wallet',
			textChecked: ethWallet.value,
			action: 'walletAddress',
			canShow: true
		}
	]
		.filter((controller) => controller.canShow)
		.map((controller) => {
			let text
			if (controller.isCheck) {
				text = controller.textChecked
			} else {
				if (controller.ethValue) {
					text = controller.textChecked
				} else {
					text = controller.textDefault
				}
			}

			return {
				id: controller.id,
				text,
				method: () => toggleState(controller.action)
			}
		})
})

function toggleState(action) {
	if (action === 'walletAddress') {
		if (!ethWallet.value) {
			walletStore.fetchEthRequestAccounts()
			return
		}
		isCheckWalletAddress.value = !isCheckWalletAddress.value
	}
	if (action === 'sign') {
		if (!ethPersonalSign.value) {
			walletStore.fetchPersonalSign()
			return
		}
		isCheckSign.value = !isCheckSign.value
	}
}
</script>

<style lang="scss" scoped>
.header {
	&__container {
		display: flex;
		justify-content: flex-end;
		max-width: em($container-max-width);
		padding: em(24) em(26);
	}

	&__button {
		background: $dark-gray;
		width: em(145);
		height: em(36);
		border-radius: em(5);
		color: $light-gray;
	}

	&__content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: em(25);
	}

	&__font {
		&--btn {
			@include dm-14-400();

			color: $light-gray;
		}
	}
}
</style>
