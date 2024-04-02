export interface Entity {
	name: string
	staked: string
	active_validators: number
	validators: number
	produced_blocks: number
	missed_blocks: number
	consensus_rewards: string
	executed_rewards: string
	apr: string
	apr_30days: string
	apr_365days: string
}

export interface FetchEntitiesRequest {
	page: number
	limit: number
	sort_by: string
}

export interface FetchEntitiesResponse {
	count: number
	items: Entity[]
}

export interface HistoricalItem {
	current: string
	previous: string
}

export interface FetchHistoricalResponse {
	[key: string]: HistoricalItem
}
