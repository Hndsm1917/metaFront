<template>
	<table border="1" frame="void" rules="rows" class="ui-table">
		<thead>
			<tr class="ui-table__row">
				<th class="ui-table__block" v-for="(heading, index) in tableHeading" :key="index">
					<span class="ui-table__font ui-table__font--head">
						{{ heading }}
					</span>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(data, i) in tableData" :key="i" class="ui-table__row">
				<td
					v-for="(field, j) in tableFields"
					:key="j"
					class="ui-table__block"
					:class="`ui-table__block--${field.theme}`"
				>
					<span class="ui-table__font ui-table__font--field">{{ data[field.fieldSelector] }}</span>
					<span v-if="field.subSelector" class="ui-table__font ui-table__font--sub-field">
						{{ data[field.subSelector] }}
					</span>
				</td>
			</tr>
		</tbody>
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

	&__row {
		border-bottom: em(1) solid $table-gray;
		padding: em(7);
	}

	&__block {
		position: relative;
		padding: em(7);
		text-align: start;
		width: em(60);

		&--id {
			&:before {
				content: '';
				position: absolute;
				z-index: -1;
				top: 50%;
				left: em(0);
				transform: translate(0%, -50%);
				width: em(22);
				height: em(20);
				background: $dark-gray;
				border-radius: em(50);
			}
		}

		&--accent {
			#{$self}__font {
				color: $accent;
			}
		}
	}

	&__font {
		display: block;

		&--head {
			@include dm-12-400();
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
