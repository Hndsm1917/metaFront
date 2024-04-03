import type { FiltersLiterals, Heading, TableField } from '@/types/types'

interface FilterOption {
	name: string
	sortBy: FiltersLiterals
}

interface TableFields {
	headings: Heading[]
	fields: TableField[]
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

export const tableFields: TableFields = {
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
			fieldSelector: 'name',
			theme: 'default'
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
			fieldSelector: 'executedRewards',
			theme: 'default'
		},
		{
			fieldSelector: 'consensusRewards',
			theme: 'default'
		},
		{
			fieldSelector: 'producedBlocks',
			theme: 'default'
		}
	]
}
