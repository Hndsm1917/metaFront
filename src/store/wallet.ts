import { defineStore } from 'pinia'
import { ethereumService } from '@/services/ethereum'

interface State {
	ethWallet: null | string
	ethPersonalSign: null | string
}

export const useWalletStore = defineStore('wallet', {
	state: (): State => ({
		ethWallet: null,
		ethPersonalSign: null
	}),

	actions: {
		async init() {
			await ethereumService.init()
		},

		async fetchEthRequestAccounts() {
			const res = await ethereumService.requestAccounts()
			this.ethWallet = res[0]
		},

		async fetchPersonalSign(challenge: string, address: string) {
			this.ethPersonalSign = await ethereumService.personalSign(challenge, address)
		}
	}
})
