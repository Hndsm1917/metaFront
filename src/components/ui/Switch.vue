<template>
	<div class="switch">
		<button
			v-for="(item, index) in props.collection"
			:key="index"
			type="button"
			class="switch__selector"
			:class="{ 'switch__selector--current': activeIndex === index }"
			@click="emits('selected', index)"
		>
			<slot>
				<span class="switch__font switch__font--default">{{ formatItem(item) }}</span>
			</slot>
		</button>
	</div>
</template>

<script setup lang="ts">
type CollectionItem = number | string | Record<string, any>

const props = defineProps<{
	collection: Array<CollectionItem>
	iterationField?: string
	activeIndex: number
}>()

const emits = defineEmits<{
	selected: [index: number]
}>()

function formatItem(item: CollectionItem): string {
	if (
		typeof item === 'object' &&
		item !== null &&
		props.iterationField &&
		props.iterationField in item
	) {
		return item[props.iterationField]
	} else if (typeof item === 'number' || typeof item === 'string') {
		return item.toString()
	}
	return ''
}
</script>

<style scoped lang="scss">
.switch {
	$self: &;

	display: flex;
	align-items: center;
	gap: em(10);

	&__selector {
		display: flex;
		align-items: center;
		justify-content: center;
		height: em(16);
		padding: 0 em(8);

		&--current {
			background: $dark-gray;
			border-radius: em(40);

			#{$self}__font {
				color: $white;
			}
		}
	}

	&__font {
		@include dm-8-400();

		color: $text-sub-text;
	}
}
</style>
