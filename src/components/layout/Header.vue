<template>
	<header class="header">
		<div class="header__container">
			<div class="header__content">
				<button
					v-for="{ id, method, text } in controllers"
					:key="id"
					class="header__button"
					@click="buttonsController(method)"
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
import { computed, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { storeToRefs } from 'pinia'

interface HeaderButtonController {
	id: number
	isCheck: Ref<boolean>
	ethValue: Ref<string | null>
	textDefault: string
	textBeforeChecked: string
	action: 'sign' | 'walletAddress'
	canShow: boolean
}

const walletStore = useWalletStore()
const { ethWallet, ethPersonalSign } = storeToRefs(walletStore)

const isCheckSign = ref(false)
const isCheckWalletAddress = ref(false)

const controllers = computed(() => {
	const baseControllers: HeaderButtonController[] = [
		{
			id: 1,
			isCheck: isCheckSign,
			ethValue: ethPersonalSign,
			textDefault: 'Sign Message',
			textBeforeChecked: 'signature data',
			action: 'sign',
			canShow: Boolean(ethWallet.value)
		},
		{
			id: 2,
			isCheck: isCheckWalletAddress,
			ethValue: ethWallet,
			textDefault: 'Connect Wallet',
			textBeforeChecked: 'wallet address',
			action: 'walletAddress',
			canShow: true
		}
	]

	return baseControllers
		.filter((controller) => controller.canShow)
		.map((controller) => {
			let text = ''

			switch (true) {
				case !controller.ethValue.value:
					text = controller.textDefault
					break

				case controller.ethValue.value && !controller.isCheck.value:
					text = controller.textBeforeChecked
					break

				case controller.ethValue.value && controller.isCheck.value:
					text = formatWalletString(controller.ethValue.value)
					break
			}

			return {
				id: controller.id,
				text: text,
				method: controller.action
			}
		})
})

function buttonsController(action: string) {
	if (action === 'walletAddress') {
		ethWallet.value
			? (isCheckWalletAddress.value = !isCheckWalletAddress.value)
			: walletStore.fetchEthRequestAccounts()

		return
	}

	if (action === 'sign' && ethWallet.value) {
		ethPersonalSign.value
			? (isCheckSign.value = !isCheckSign.value)
			: walletStore.fetchPersonalSign('test message', ethWallet.value)
	}
}

function formatWalletString(hexString: string, startLength = 4, endLength = 4) {
	return hexString.length > startLength + endLength + 2
		? `${hexString.substring(0, startLength + 2)}...${hexString.substring(hexString.length - endLength)}`
		: hexString
}
</script>

<style lang="scss" scoped>
.header {
	&__container {
		display: flex;
		justify-content: flex-end;
		max-width: em($container-max-width);
		padding: em(24) em(0);
		margin: 0 auto;
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
