<template>
	<table border="1" frame="void" rules="rows" class="ui-table">
		<thead>
			<tr class="ui-table__row">
				<th
					v-for="(heading, index) in tableHeading"
					:key="index"
					class="ui-table__block"
					:class="`ui-table__block--${heading}`"
				>
					<span class="ui-table__font ui-table__font--head">
						{{ heading }}
					</span>
				</th>
			</tr>
		</thead>
		<transition-group name="row" tag="tbody">
			<tr v-for="(data, i) in tableData" :key="`data-${i}`" :data-index="i" class="ui-table__row">
				<td
					v-for="(field, j) in tableFields"
					:key="`field-${j}`"
					class="ui-table__block"
					:class="`ui-table__block--${field.theme}`"
				>
					<span class="ui-table__font ui-table__font--field">{{ data[field.fieldSelector] }}</span>
					<span v-if="field.subSelector" class="ui-table__font ui-table__font--sub-field">
						{{ data[field.subSelector] }}
					</span>
				</td>
			</tr>
		</transition-group>
	</table>
</template>

<script setup lang="ts">
import type { Heading, TableField, TableRow } from '@/types/types'

const props = defineProps<{
	tableHeading: Heading[]
	tableFields: TableField[]
	tableData: TableRow[]
}>()
</script>

<style scoped lang="scss">
.ui-table {
	$self: &;
	table-layout: fixed;
	border-collapse: collapse;

	&__row {
		border-bottom: em(1) solid $table-gray;
		padding: em(7);
	}

	&__block {
		position: relative;
		padding: em(7);
		text-align: start;
		width: em(60);

		&:nth-of-type(1) {
			padding-left: em(58);
			width: 6%;
			padding-right: em(14);
			text-align: center;
		}

		&--default {
			width: 18%;
		}

		&--sub-item {
			width: 20%;
		}

		&--id {
			#{$self}__font {
				position: relative;
				&:before {
					content: '';
					position: absolute;
					z-index: -1;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: calc(100% + #{em(10)});
					height: em(22);
					background: $dark-gray;
					border-radius: em(50);
				}
			}
		}

		&--accent {
			width: 10%;
			#{$self}__font {
				color: $accent;
			}
		}
	}

	&__font {
		display: block;
		width: fit-content;

		&--head {
			@include dm-12-400();

			text-transform: uppercase;
			color: $light-gray;
		}

		&--field {
			@include dm-12-400();
			color: $white;
		}

		&--sub-field {
			@include dm-10-400();
			color: $dark-gray2;
		}
	}
}
</style>
