<template>
	<div class="page home-page">
		<div class="page__container">
			<div class="home-page__h1">
				<h1 class="page__font page__font--h1">Stay on top of crypto. Task for front end.</h1>
			</div>

			<div class="home-page__block page__block page__block--between">
				<span class="page__font page__font--text"> Ethereum validator rating </span>

				<Switch
					class="page__switch"
					:collection="tableFilters"
					:activeIndex="selectedTableFilterIndex"
					iterationField="name"
					@selected="setTableFilter"
				/>
			</div>

			<Table
				class="home-page__table page__table"
				:table-heading="tableFields.headings"
				:table-fields="tableFields.fields"
				:table-data="formattedEthEntities"
			></Table>

			<button
				type="button"
				class="home-page__button"
				@click="ethRatingStore.loadMoreEntities(tableFilters[selectedTableFilterIndex].sortBy)"
			>
				Load More
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { tableFilters, tableFields } from '@/configs/tableParams'
import { useEthRatingStore } from '@/store/ethRating'
import Table from '@/components/ui/Table.vue'
import Switch from '@/components/ui/Switch.vue'

const ethRatingStore = useEthRatingStore()

const { formattedEthEntities, currentFilter } = storeToRefs(ethRatingStore)
const selectedTableFilterIndex = ref<number>(0)

watch(
	selectedTableFilterIndex,
	(newIndex) => {
		ethRatingStore.getEntities(tableFilters[newIndex].sortBy)
	},
	{ immediate: true }
)

function setTableFilter(index: number) {
	selectedTableFilterIndex.value = index
	currentFilter.value = tableFilters[index].sortBy
}
</script>

<style lang="scss" scoped>
.home-page {
	&__h1 {
		max-width: em(500);
	}

	&__block {
		margin-top: em(41);
	}

	&__table {
		margin-top: em(10);
	}

	&__button {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: em(40) auto 0;
		background: $dark-gray;
		width: em(145);
		height: em(36);
		border-radius: em(5);
		color: $light-gray;
	}
}
</style>
