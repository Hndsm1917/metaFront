<template>
	<div class="page">
		<div class="page__container">
			<div class="page__h1">
				<h1 class="page__font page__font--h1">Stay on top of crypto. Task for front end.</h1>
			</div>

			<div class="page__block page__block--between">
				<span class="page__font page__font--text"> Ethereum validator rating </span>

				<Switch
					class="page__switch"
					:collection="tableFilters"
					:activeIndex="selectedTableFilterIndex"
					iterationField="name"
					@selected="setTableFilter"
				/>
			</div>
			<div class="page__table">
				{{ formattedEthEntities }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Switch from '@/components/ui/Switch.vue'
import tableFilters from '@/configs/tableFilters'
import { useEthRatingStore } from '@/store/ethRating'
import { storeToRefs } from 'pinia'

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
.page {
	&__container {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		max-width: em($container-max-width);
	}

	&__h1 {
		max-width: em(500);
	}

	&__block {
		display: flex;
		width: 100%;
		background: $dark-gray;
		border-radius: em(8);
		padding: em(14) em(16);
		margin-top: em(41);

		&--between {
			justify-content: space-between;
		}
	}

	&__switch {
		background: $main;
		border-radius: em(50);
		overflow: hidden;
		height: em(23);
		padding: 0 em(5);
	}

	&__font {
		&--h1 {
			@include dm-36-500();
			color: $white;
		}

		&--text {
			@include dm-14-400();
			color: $light-gray;
		}
	}
}
</style>
