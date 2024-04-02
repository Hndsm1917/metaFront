import type { FetchOptions } from '@/types/serviceTypes'

const DEFAULT_BASE_URL = 'https://api.ethrewards.io'

async function fetchClient({
	baseURL = DEFAULT_BASE_URL,
	endpoint,
	method = 'GET',
	headers = {},
	body = null
}: FetchOptions) {
	const defaultHeaders = {
		'Content-Type': 'application/json'
	}

	try {
		const response = await fetch(`${baseURL}${endpoint}`, {
			method,
			headers: { ...defaultHeaders, ...headers },
			body
		})

		if (!response.ok) {
			const errorResponse = await response.json()
			throw new Error(errorResponse.message || 'Network response was not ok.')
		}

		return await response.json()
	} catch (error) {
		console.error('Fetch error:', error)
		throw error
	}
}

export default fetchClient
