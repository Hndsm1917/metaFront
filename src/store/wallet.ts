import { defineStore } from 'pinia'
import { MetaMaskSDK, SDKProvider } from '@metamask/sdk'

interface State {
	ethWallet: null | string
	ethPersonalSign: null | string
	ethereum: any
}

export const useWalletStore = defineStore('wallet', {
	state: (): State => ({
		ethWallet: null,
		ethPersonalSign: null,
		ethereum: null
	}),

	getters: {},

	actions: {
		async init() {
			const sdk = new MetaMaskSDK({
				dappMetadata: {
					name: 'metaFront',
					url: window.location.href
				},
				infuraAPIKey: ''
			})

			sdk.init().then(() => {
				this.ethereum = sdk.getProvider()
				this.fetchEthRequestAccounts()
			})
		},

		async fetchEthRequestAccounts() {
			const res = await this.ethereum.request({ method: 'eth_requestAccounts', params: [] })

			this.ethWallet = res[0]
		},

		async fetchPersonalSign() {
			const res = await this.ethereum.request({
				method: 'personal_sign',
				params: ['0x1a3F', `${this.ethWallet}`]
			})

			this.ethPersonalSign = res[0]
		}
	}
})
