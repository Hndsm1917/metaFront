import { defineStore } from 'pinia'
import { fetchEntities, fetchHistory } from '@/services/ethRewardsService'
import type { Entity } from '@/types/apiTypes'
import type { FiltersLiterals } from '@/types/types'

interface State {
	ethEntities: null | Entity[]
	currentPage: number
	currentEthPrice: number
	currentFilter: FiltersLiterals
}

interface FormattedEntities {
	name: string
}

export const useEthRatingStore = defineStore('ethRating', {
	state: (): State => ({
		ethEntities: null,
		currentPage: 0,
		currentFilter: 'apr',
		currentEthPrice: 0
	}),

	getters: {
		formattedEthEntities: ({
			ethEntities,
			currentFilter,
			currentEthPrice
		}): void[] | FormattedEntities[] => {
			if (ethEntities) {
				return ethEntities.map((item: any, index): any => {
					return {
						id: index + 1,
						name: item.name,
						staked: `${item.staked} ETH`,
						stakedUsdt: `$${item.staked * currentEthPrice}`,
						apr: `${item[currentFilter] * 100}%`,
						executedRewards: `${item.executed_rewards} ETH`,
						consensusRewards: `${item.consensus_rewards} ETH`,
						producedBlocks: `${item.produced_blocks}%`
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
			await this.getHistory()

			this.ethEntities = items
		},

		async getHistory() {
			const { eth_price } = await fetchHistory()

			this.currentEthPrice = +eth_price.current
		}
	}
})
