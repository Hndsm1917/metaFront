import { MetaMaskSDK, SDKProvider } from '@metamask/sdk'

class EthereumService {
	private sdk: MetaMaskSDK
	private provider: SDKProvider | undefined

	constructor() {
		this.sdk = new MetaMaskSDK({
			dappMetadata: {
				name: 'metaFront',
				url: window.location.href
			},
			infuraAPIKey: ''
		})
	}

	async init() {
		await this.sdk.init()
		this.provider = this.sdk.getProvider()
	}

	async requestAccounts(): Promise<string[]> {
		if (!this.provider) {
			throw new Error('Provider is not initialized.')
		}
		const response = await this.provider.request({ method: 'eth_requestAccounts', params: [] })

		if (!Array.isArray(response)) {
			throw new Error('Expected an array of strings from eth_requestAccounts')
		}

		window.localStorage.setItem('isWalletConnected', 'true')

		return response
	}

	async personalSign(challenge: string, address: string): Promise<string> {
		if (!this.provider) {
			throw new Error('Provider is not initialized.')
		}
		const result = await this.provider.request({
			method: 'personal_sign',
			params: [challenge, address]
		})

		if (result && typeof result.toString === 'function') {
			return result.toString()
		} else {
			throw new Error('Expected a result with a toString method')
		}
	}
}

export const ethereumService = new EthereumService()
