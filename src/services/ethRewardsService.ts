import fetchClient from '@/services/fetchClient'
import type {
	FetchEntitiesRequest,
	FetchEntitiesResponse,
	FetchHistoricalResponse
} from '@/types/apiTypes'

const ETH_REWARDS_BASE_URL = 'https://api.ethrewards.io'

export const fetchEntities = async ({
	page,
	limit,
	sort_by
}: FetchEntitiesRequest): Promise<FetchEntitiesResponse> => {
	return fetchClient({
		baseURL: ETH_REWARDS_BASE_URL,
		endpoint: `/entities/stats?page=${page}&limit=${limit}&sort_by=${sort_by}`
	})
}

export const fetchHistory = async (): Promise<FetchHistoricalResponse> => {
	return fetchClient({ baseURL: ETH_REWARDS_BASE_URL, endpoint: '/historical/info' })
}
