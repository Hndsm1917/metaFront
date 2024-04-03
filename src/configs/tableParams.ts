import type { FiltersLiterals } from '@/types/types'

interface FilterOption {
	name: string
	sortBy: FiltersLiterals
}

export const tableFilters: FilterOption[] = [
	{
		name: 'monthly',
		sortBy: 'apr_30days'
	},
	{
		name: 'annual',
		sortBy: 'apr_365days'
	},
	{
		name: 'all ',
		sortBy: 'apr'
	}
]

export const tableFields = {
	headings: [
		'↑#',
		'NAME',
		'STAKED',
		'APR',
		'EXECUTION REWARDS',
		'CONSENSUS REWARDS',
		'PRODUCED BLOCKS'
	],
	fields: [
		{
			fieldSelector: 'id',
			theme: 'id'
		},
		{
			fieldSelector: 'name'
		},
		{
			fieldSelector: 'staked',
			subSelector: 'stakedUsdt',
			theme: 'sub-item'
		},
		{
			fieldSelector: 'apr',
			theme: 'accent'
		},
		{
			fieldSelector: 'executedRewards'
		},
		{
			fieldSelector: 'consensusRewards'
		},
		{
			fieldSelector: 'producedBlocks'
		}
	]
}
