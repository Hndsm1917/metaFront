import type { FiltersLiterals } from '@/types/types'

interface FilterOption {
	name: string
	sortBy: FiltersLiterals
}

export default [
	{
		name: 'monthly',
		sortBy: 'apr_30days'
	},
	{
		name: 'annual ',
		sortBy: 'apr_365days'
	},
	{
		name: 'all ',
		sortBy: 'apr'
	}
] as FilterOption[]
