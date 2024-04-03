import { defineStore } from 'pinia'
import { ethereumService } from '@/services/ethereum'
import { useStorage } from '@vueuse/core'
import type { RemovableRef } from '@vueuse/core'

interface State {
	ethWallet: RemovableRef<string>
	ethPersonalSign: RemovableRef<string>
}

export const useWalletStore = defineStore('wallet', {
	state: (): State => ({
		ethWallet: useStorage('ethWallet', ''),
		ethPersonalSign: useStorage('ethPersonalSign', '')
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
