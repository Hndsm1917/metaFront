import { defineStore } from 'pinia'
import { fetchEntities } from '@/services/ethRewardsService'
import type { Entity } from '@/types/apiTypes'
import type { FiltersLiterals } from '@/types/types'

interface State {
	ethEntities: null | Entity[]
	currentPage: number
	currentFilter: FiltersLiterals
}

interface FormattedEntities {
	name: string
}

export const useEthRatingStore = defineStore('ethRating', {
	state: (): State => ({
		ethEntities: null,
		currentPage: 0,
		currentFilter: 'apr'
	}),

	getters: {
		formattedEthEntities: ({ ethEntities, currentFilter }): void[] | FormattedEntities[] => {
			if (ethEntities) {
				return ethEntities.map((item: any): any => {
					return {
						name: item.name,
						staked: item.staked,
						apr: item[currentFilter] * 100,
						executedRewards: item.executed_rewards,
						consensusRewards: item.consensus_rewards,
						producedBlocks: item.produced_blocks
					}
				})
			}

			return []
		}
	},

	actions: {
		async getEntities(sorting: string) {
			const { items } = await fetchEntities({
				page: this.currentPage,
				limit: 10,
				sort_by: sorting
			})

			this.ethEntities = items
		}
	}
})
