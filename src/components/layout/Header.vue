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
					<transition name="slide-fade" mode="out-in">
						<div :key="text" class="header__font header__font--btn">
							{{ text }}
						</div>
					</transition>
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
			ethValue: ethPersonalSign.value ?? '',
			textDefault: 'Sign Message',
			textChecked: '0x1a3F',
			action: 'sign',
			canShow: Boolean(ethWallet.value)
		},
		{
			id: 2,
			isCheck: isCheckWalletAddress.value,
			ethValue: ethWallet.value ?? '',
			textDefault: 'Connect Wallet',
			textChecked: 'wallet address',
			action: 'walletAddress',
			canShow: true
		}
	]
		.filter((controller) => controller.canShow)
		.map((controller) => {
			let text
			if (controller.isCheck) {
				text = formatWalletString(controller.ethValue)
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
				method: () => toggleState(controller)
			}
		})
})

function toggleState(controller) {
	if (controller.action === 'walletAddress') {
		if (!ethWallet.value) {
			walletStore.fetchEthRequestAccounts()
			return
		}
		isCheckWalletAddress.value = !isCheckWalletAddress.value
	}

	if (controller.action === 'sign') {
		if (!ethPersonalSign.value) {
			walletStore.fetchPersonalSign(controller.textChecked, ethWallet.value)
		}
		isCheckSign.value = !isCheckSign.value
	}
}

function formatWalletString(hexString: string, startLength = 4, endLength = 4) {
	if (hexString.length > startLength + endLength + 2) {
		const start = hexString.substring(0, startLength + 2)
		const end = hexString.substring(hexString.length - endLength)

		return `${start}...${end}`
	}
	return hexString
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
		display: flex;
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
