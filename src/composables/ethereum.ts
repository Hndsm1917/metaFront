import { MetaMaskSDK, SDKProvider } from '@metamask/sdk'
import { ref, watchEffect } from 'vue'

export function useEthereum() {
	const sdk = ref<SDKProvider | null>(null)
	const ethereum = ref<SDKProvider | null>(null)
	const isInitialized = ref<boolean>(false)

	function init() {
		sdk.value = new MetaMaskSDK({
			dappMetadata: {
				name: 'metaFront',
				url: window.location.href
			},
			infuraAPIKey: ''
		})

		sdk.value.init().then(() => {
			ethereum.value = sdk.value.getProvider()

			isInitialized.value = true
		})
	}
	//
	// watchEffect(() => {
	// 	init()
	// 	console.log(ethereum.value)
	// })

	return {
		ethereum,
		isInitialized,
		init
	}
}
