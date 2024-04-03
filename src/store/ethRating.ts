import { defineStore } from 'pinia'
import { fetchEntities, fetchHistory } from '@/services/ethRewards'
import type { Entity } from '@/types/apiTypes'
import type { FiltersLiterals } from '@/types/types'

interface State {
	ethEntities: Entity[] | null
	currentPage: number
	currentEthPrice: number
	currentFilter: FiltersLiterals
}

interface FormattedEntity {
	id: number
	name: string
	staked: string
	stakedUsdt: string
	apr: string
	executedRewards: string
	consensusRewards: string
	producedBlocks: string
}

export const useEthRatingStore = defineStore('ethRating', {
	state: (): State => ({
		ethEntities: null,
		currentPage: 1,
		currentFilter: 'apr',
		currentEthPrice: 0
	}),

	getters: {
		formattedEthEntities: (state): FormattedEntity[] => {
			const { ethEntities, currentFilter, currentEthPrice } = state
			if (!ethEntities) return []

			return ethEntities.map(
				(item: Entity, index): FormattedEntity => ({
					id: index + 1,
					name: item.name,
					staked: `${item.staked} ETH`,
					stakedUsdt: `$${(+item.staked * currentEthPrice).toFixed(2)}`,
					apr: `${(+item[currentFilter] * 100).toFixed(2)}%`,
					executedRewards: `${item.executed_rewards} ETH`,
					consensusRewards: `${item.consensus_rewards} ETH`,
					producedBlocks: `${item.produced_blocks}%`
				})
			)
		}
	},

	actions: {
		async getEntities(sorting: string) {
			this.currentPage = 1

			const { items } = await fetchEntities({
				page: this.currentPage,
				limit: 20,
				sort_by: sorting
			})
			await this.getHistory()

			this.ethEntities = items
		},

		async loadMoreEntities(sorting: string) {
			this.currentPage = this.currentPage + 1

			const { items } = await fetchEntities({
				page: this.currentPage,
				limit: 20,
				sort_by: sorting
			})
			await this.getHistory()

			this.ethEntities = this.ethEntities ? this.ethEntities.concat(items) : items
		},

		async getHistory() {
			const { eth_price } = await fetchHistory()

			this.currentEthPrice = +eth_price.current
		}
	}
})
